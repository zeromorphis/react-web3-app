/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-22 10:41:53
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-20 18:29:30
 */
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Button, Modal, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { interceptStr, percentMoney, moneyFormat, onlyNumOnePoint, getAssetsFile, interceptAfter5 } from "@/utils/common";
import sdk from '@/sdk/chanjssdktd.js';
import { isMetaMask } from "@/utils/web3/connectWeb3";
import { getGemInfoApi } from "@/api/modules/gem";
import { gemShelfApi, gemTakeDownApi } from "@/api/modules/market";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import "./index.less";

const WalletGemDetails: React.FC = (props: any) => {
  const { user, global } = props;
  const { address } = user;
  const { exchangeRate } = global;
  const navigate = useNavigate();
  const location = useLocation();

  const [gemInfoDetails, setGemInfoDetails] = useState<any>({});
  const [form, setForm] = useState({
    salePrice: "",
  });
  const [saleNowModel, setSaleNowModel] = useState<boolean>(false);//售卖弹框
  const [isToSaleLoading, setIsToSaleLoading] = useState<boolean>(false);//是否上架Loading
  const [isCancleSaleLoading, setIsCancleSaleLoading] = useState<boolean>(false);//是否下架Loading

  // 后退
  const backFun = () => {
    navigate("/main/wallet/nft", {
      state: {
        type: 'gem',
      }
    });
  };

  // 列表参数变化更新
  useEffect(() => {
    getGemDetails()
  }, [location.state])

  // 打开英雄详细信息
  const getGemDetails = () => {
    const state: any = location.state;
    let httpData = {
      address: address,
      number: state.number,
    };
    getGemInfoApi(httpData).then(async (res: any) => {
      console.log(res, "宝石详细信息res");
      setGemInfoDetails(res.data);
    });
  };

  // 上架
  async function toSaleNowFun() {
    setIsToSaleLoading(true);
    await sdk.chainWeb3.connectMetamask();//连接钱包
    const isApproved = await sdk.Equip721.isApprovedForAll(sdk.EquipMarket.address);//是否授权
    if (!isApproved) {
      showFullScreenLoading('Approved');//全屏Loading
      try {
        await sdk.Equip721.setApprovalForAll(sdk.EquipMarket.address, true);//授权
        tryHideFullScreenLoading();
        toSaleNowFun();
      } catch (error: any) {
        console.error('error', error)
        message.error({
          content: error.message,
          duration: 3
        })
        tryHideFullScreenLoading();
        setIsToSaleLoading(false);
        setSaleNowModel(false);
      }
    } else {
      showFullScreenLoading('Proceeding');//全屏Loading
      try {
        const sale = await sdk.EquipMarket.put(gemInfoDetails.number, form.salePrice);
        console.log('Gem上架', sale)
        let httpData = {
          gemId: gemInfoDetails.number, /** 英雄编号 */
          holder: address, /** 持有人 */
          price: form.salePrice, /** 售价(BNB) */
        };
        gemShelfApi(httpData).then((res: any) => {
          message.success({
            content: 'Listed',
            duration: 3
          });
          setSaleNowModel(false);
          getGemDetails();
        }).catch((err: any) => {
          message.warning({
            content: 'List failed',
            duration: 3
          });
        });
      } catch (error: any) {
        console.error('error', error)
        message.error({
          content: error.message,
          duration: 3
        });
      } finally {
        console.warn('已完成')
        setIsToSaleLoading(false);//Loading消失
        tryHideFullScreenLoading();//Loading消失
      }
    }
  }


  // 下架
  async function cancleSaleFun() {
    setIsCancleSaleLoading(true);
    await sdk.chainWeb3.connectMetamask();//连接钱包
    const isApproved = await sdk.Equip721.isApprovedForAll(sdk.EquipMarket.address);//是否授权
    if (!isApproved) {
      showFullScreenLoading('Approved');//全屏Loading
      try {
        await sdk.Equip721.setApprovalForAll(sdk.EquipMarket.address, true);//授权
        tryHideFullScreenLoading();
        cancleSaleFun();
      } catch (error: any) {
        console.error('error', error)
        message.error({
          content: error.message,
          duration: 3
        })
        tryHideFullScreenLoading();
        setIsCancleSaleLoading(false);
      }
    } else {
      showFullScreenLoading('Proceeding');//全屏Loading
      try {
        const del = await sdk.EquipMarket.del(gemInfoDetails.number);
        console.log('Gem下架', del)
        let httpData = {
          gemId: gemInfoDetails.number /** 英雄编号 */,
          holder: address /** 持有人 */,
        };
        gemTakeDownApi(httpData).then((res: any) => {
          message.success({
            content: "Unlisted",
            duration: 3
          });
          getGemDetails();
        }).catch((err: any) => {
          message.warning({
            content: "Unlist failed",
            duration: 3
          });
        });
      } catch (error: any) {
        console.error('error', error)
        message.error({
          content: error.message,
          duration: 3
        });
      } finally {
        console.warn('已完成')
        setIsCancleSaleLoading(false);//无论成功与否，Loading消失
        tryHideFullScreenLoading();//无论成功与否，Loading消失
      }
    }
  }

  // 监听输入框是否为数字，不能为非法字符
  useEffect(() => {
    setForm(previousState => {
      return {
        ...previousState,
        salePrice: onlyNumOnePoint(String(form.salePrice)),
      }
    });
  }, [form.salePrice])

  // 跳转至Bscscan查询交易高度
  const gotoBscscan = async (e: any) => {
    if (!e.hash) return;
    if (isMetaMask()) {
      await sdk.chainWeb3.connectMetamask();//连接钱包
      let url = await sdk.chainWeb3.getEtherscanTx(e.hash);
      window.open(url, "_blank")
    } else {
      let url = `https://bscscan.com/tx/${e.hash}`;
      window.open(url, "_blank")
    }
  };

  return (
    <>
      <div className="walletGemDetails_container">
        <div className="main_wrap">
          <div className="back_prev">
            <div onClick={() => backFun()} className="back">
              <ArrowLeftOutlined className="arrowleft" />
              <span>Back</span>
            </div>
          </div>
          <div className="center_box">
            <div className="left_wrap">
              <div className="hero_info">
                <div className="info">
                  <div className="topinfo">
                    <p className="rarity">
                      {gemInfoDetails.rarity == 1 ? (<img src={getAssetsFile('images/dashboard/pinzhi_n@2x.png')} className='zhiye' />) : null}
                      {gemInfoDetails.rarity == 2 ? (<img src={getAssetsFile('images/dashboard/pinzhi_r@2x.png')} className='zhiye' />) : null}
                      {gemInfoDetails.rarity == 3 ? (<img src={getAssetsFile('images/dashboard/pinzhi_sr@2x.png')} className='zhiye' />) : null}
                      {gemInfoDetails.rarity == 4 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ssr@2x.png')} className='zhiye' />) : null}
                      {gemInfoDetails.rarity == 5 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ur@2x.png')} className='zhiye' />) : null}
                      {gemInfoDetails.rarity == 6 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='zhiye' />) : null}
                      {gemInfoDetails.rarity == 7 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='zhiye' />) : null}
                      {gemInfoDetails.rarity == 8 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='zhiye' />) : null}
                      {gemInfoDetails.rarity == 9 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='zhiye' />) : null}
                    </p>
                    <p className="name">{interceptAfter5(gemInfoDetails.name)}</p>
                  </div>
                  <div className="botinfo">
                    <span className="tit">Owner</span>
                    <span className="txt">{interceptStr(gemInfoDetails.address, 6)}</span>
                  </div>
                </div>
                <p className="tokenid">
                  <span>Token ID</span>
                  <span>{gemInfoDetails.number}</span>
                </p>
              </div>
              <div className="hero_shuxing">
                <div className="left">
                  {gemInfoDetails.type == 1 ? (<p className="colortype bgc1">Red</p>) : null}
                  {gemInfoDetails.type == 2 ? (<p className="colortype bgc2">Yellow</p>) : null}
                  {gemInfoDetails.type == 3 ? (<p className="colortype bgc3">Blue</p>) : null}
                  {gemInfoDetails.type == 4 ? (<p className="colortype bgc4">Green</p>) : null}
                  {gemInfoDetails.type == 5 ? (<p className="colortype bgc5">Purple</p>) : null}
                  {
                    gemInfoDetails.grade ? (<p className="grade">LV.{gemInfoDetails.grade}</p>) : null
                  }
                </div>
              </div>
              <div className="hero_img_wrap">
                <img src={getAssetsFile(`images/gems/${gemInfoDetails.image}.png`)} />
              </div>
              <div className="hero_buy_wrap">
                {
                  gemInfoDetails.tradingStatus && gemInfoDetails.tradingStatus == '0' ? (
                    <div className="current_price">
                      <p className="tit">Current price</p>
                      <div className="price">
                        <div className="bnb_price">
                          <img src={getAssetsFile('images/public/logo_bnb@2x.png')} />
                          <p className="num">{gemInfoDetails.price}</p>
                        </div>
                        <p className="meiyuan">≈ ${percentMoney((Number(exchangeRate) * Number(gemInfoDetails.price)), 4)}</p>
                      </div>
                    </div>) : (
                    <div className="current_price" />)
                }
                {
                  gemInfoDetails.tradingStatus && gemInfoDetails.tradingStatus == '0' ? (
                    <div className="btn_wrap justify-content-center">
                      <Button onClick={() => cancleSaleFun()} loading={isCancleSaleLoading} className="btn btn3">Cancel Sale</Button>
                    </div>
                  ) : (
                    <div className="btn_wrap justify-content-center">
                      <Button onClick={() => setSaleNowModel(true)} className="btn btn1" type="primary">Sale Now</Button>
                    </div>
                  )
                }
              </div>
            </div>
            <div className="right_wrap">
              <div className="history_box">
                <p className="title">
                  <img src={getAssetsFile('images/market/icon_history@2x.png')} />
                  <span>Trade history</span>
                </p>
                <ul className="title">
                  <li className="w28">Date</li>
                  <li className="w26 textr">Owner</li>
                  <li className="w26 textr">Buyer</li>
                  <li className="w20 textr">Price</li>
                </ul>
                {
                  gemInfoDetails.transactionHistory && gemInfoDetails.transactionHistory.length !== 0 ? (<ul className="history_list">
                    {
                      gemInfoDetails.transactionHistory.map((item: any, index: number) => {
                        return <li key={index} onClick={() => gotoBscscan(item)}>
                          <p className="w28">{item.tradingTime}</p>
                          <p className="w25 textr">{interceptStr(item.fromAddress, 6)}</p>
                          <p className="w25 textr">{interceptStr(item.toAddress, 6)}</p>
                          <p className="w22 textr price">
                            <img src={getAssetsFile('images/public/logo_bnb@2x.png')} />
                            <span>{moneyFormat(item.price)}</span>
                          </p>
                        </li>
                      })
                    }
                  </ul>) : (<div className="noData">
                    <img src={getAssetsFile("images/public/nodata@2x.png")} />
                    <p>No Data</p>
                  </div>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal centered open={saleNowModel} onCancel={() => setSaleNowModel(false)} footer={null} className="model-model-walletGemDetails">
        <div className="model_box">
          <div className="hero_img">
            <img src={getAssetsFile(`images/gems/${gemInfoDetails.image}.png`)} />
          </div>
          <div className="input_wrap">
            <Input defaultValue={form.salePrice} value={form.salePrice} onChange={(e) => {
              setForm(previousState => {
                return {
                  ...previousState,
                  salePrice: e.target.value,
                }
              });
            }} placeholder="Price（BNB）" className="idty" />
          </div>
          <div className="btn_wrap">
            {
              (form.salePrice == '0' || form.salePrice == '') ? (
                <Button disabled={true} className="btn btn2">Agree to Sale</Button>
              ) : (
                <Button onClick={() => toSaleNowFun()} loading={isToSaleLoading} className="btn btn1">Agree to Sale</Button>
              )
            }
          </div>
          <p className="des">4.5% handling fee will be deducted after successful transaction</p>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(WalletGemDetails);
