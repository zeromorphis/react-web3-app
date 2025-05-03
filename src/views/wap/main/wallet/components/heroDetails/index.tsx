/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-22 10:41:53
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-28 18:24:57
 */
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Button, message } from 'antd';
import { CenterPopup } from 'antd-mobile';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Stars from "@/components/wap/Stars";
import { interceptStr, percentMoney, moneyFormat, onlyNumOnePoint, getAssetsFile } from "@/utils/common";
import sdk from '@/sdk/chanjssdktd.js';
import { isMetaMask } from "@/utils/web3/connectWeb3";
import { getHeroInfoApi } from "@/api/modules/hero";
import { heroShelfApi, heroTakeDownApi } from "@/api/modules/market";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import "./index.less";

const WalletHeroDetails: React.FC = (props: any) => {
  const { user, global } = props;
  const { address } = user;
  const { exchangeRate } = global;
  const navigate = useNavigate();
  const location = useLocation();

  const [heroInfoDetails, setHeroInfoDetails] = useState<any>({
    five1: 0,
    five2: 0,
    five3: 0,
    five4: 0,
    five5: 0,
  });
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
        type: 'hero',
      }
    });
  };

  // 列表参数变化更新
  useEffect(() => {
    getHeroDetails()
  }, [location.state])

  // 打开英雄详细信息
  const getHeroDetails = () => {
    const state: any = location.state;
    let httpData = {
      address: address,
      number: state.number,
    };
    getHeroInfoApi(httpData).then(async (res: any) => {
      console.log(res, "英雄详细信息res");
      setHeroInfoDetails(res.data);
      setHeroInfoDetails((previousState: object) => {
        return {
          ...previousState,
          five1: res.data.fiveElements.slice(0, 1),
          five2: res.data.fiveElements.slice(2, 3),
          five3: res.data.fiveElements.slice(4, 5),
          five4: res.data.fiveElements.slice(6, 7),
          five5: res.data.fiveElements.slice(8, 9),
        }
      });
    });
  };

  // 上架
  async function toSaleNowFun() {
    setIsToSaleLoading(true);
    await sdk.chainWeb3.connectMetamask();//连接钱包
    const isApproved = await sdk.Hero721.isApprovedForAll(sdk.HeroMarket.address);//是否授权
    if (!isApproved) {
      showFullScreenLoading('Approve');//全屏Loading
      try {
        await sdk.Hero721.setApprovalForAll(sdk.HeroMarket.address, true);//授权
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
        const sale = await sdk.HeroMarket.put(heroInfoDetails.number, form.salePrice);
        console.log('Hero上架', sale)
        let httpData = {
          heroId: heroInfoDetails.number, /** 英雄编号 */
          holder: address, /** 持有人 */
          price: form.salePrice, /** 售价(BNB) */
        };
        heroShelfApi(httpData).then((res: any) => {
          message.success({
            content: 'Listed',
            duration: 3
          });
          setSaleNowModel(false);
          getHeroDetails();
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
    const isApproved = await sdk.Hero721.isApprovedForAll(sdk.HeroMarket.address);//是否授权
    if (!isApproved) {
      showFullScreenLoading('Approved');//全屏Loading
      try {
        await sdk.Hero721.setApprovalForAll(sdk.HeroMarket.address, true);//授权
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
        const del = await sdk.HeroMarket.del(heroInfoDetails.number);
        console.log('Hero下架', del)
        let httpData = {
          heroId: heroInfoDetails.number /** 英雄编号 */,
          holder: address /** 持有人 */,
        };
        heroTakeDownApi(httpData).then((res: any) => {
          message.success({
            content: "Unlisted",
            duration: 3
          });
          getHeroDetails();
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

  return (
    <>
      <div className="walletHeroDetails_container">
        <div className="main_wrap">
          <div className="back_prev">
            <div onClick={() => backFun()} className="back">
              <ArrowLeftOutlined className="arrowleft" />
              <span>Back</span>
            </div>
          </div>
          <div className="center_box">
            <div className="top_wrap">
              <div className="hero_info">
                <div className="info">
                  <div className="topinfo">
                    <p className="rarity">
                      {heroInfoDetails.rarity == 1 ? (<img src={getAssetsFile('images/dashboard/pinzhi_n@2x.png')} className='zhiye' />) : null}
                      {heroInfoDetails.rarity == 2 ? (<img src={getAssetsFile('images/dashboard/pinzhi_r@2x.png')} className='zhiye' />) : null}
                      {heroInfoDetails.rarity == 3 ? (<img src={getAssetsFile('images/dashboard/pinzhi_sr@2x.png')} className='zhiye' />) : null}
                      {heroInfoDetails.rarity == 4 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ssr@2x.png')} className='zhiye' />) : null}
                      {heroInfoDetails.rarity == 5 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ur@2x.png')} className='zhiye' />) : null}
                      {heroInfoDetails.rarity == 6 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='zhiye' />) : null}
                    </p>
                    <p className="name">{heroInfoDetails.name}</p>
                  </div>
                  <div className="botinfo">
                    <span className="tit">Owner</span>
                    <span className="txt">{interceptStr(heroInfoDetails.address, 6)}</span>
                  </div>
                </div>
                <p className="tokenid">
                  <span>Token ID</span>
                  <span>{heroInfoDetails.number}</span>
                </p>
              </div>
              <div className="hero_shuxing">
                <div className="left">
                  {heroInfoDetails.job == 1 ? (<img src={getAssetsFile('images/dashboard/zhiye_1@2x.png')} className='zhiye' />) : null}
                  {heroInfoDetails.job == 2 ? (<img src={getAssetsFile('images/dashboard/zhiye_2@2x.png')} className='zhiye' />) : null}
                  {heroInfoDetails.job == 3 ? (<img src={getAssetsFile('images/dashboard/zhiye_3@2x.png')} className='zhiye' />) : null}
                  {
                    heroInfoDetails.grade ? (<p className="grade">LV.{heroInfoDetails.grade}</p>) : null
                  }
                </div>
                <ul className="right">
                  {heroInfoDetails.five1 != 0 ? (
                    <li>
                      {heroInfoDetails.five1 == 1 ? (<img src={getAssetsFile('images/market/icon_jin.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five1 == 2 ? (<img src={getAssetsFile('images/market/icon_mu.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five1 == 3 ? (<img src={getAssetsFile('images/market/icon_shui.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five1 == 4 ? (<img src={getAssetsFile('images/market/icon_huo.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five1 == 5 ? (<img src={getAssetsFile('images/market/icon_tu.png')} className='wuxing' />) : null}
                    </li>
                  ) : null}
                  {heroInfoDetails.five2 != 0 ? (
                    <li>
                      {heroInfoDetails.five2 == 1 ? (<img src={getAssetsFile('images/market/icon_jin.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five2 == 2 ? (<img src={getAssetsFile('images/market/icon_mu.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five2 == 3 ? (<img src={getAssetsFile('images/market/icon_shui.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five2 == 4 ? (<img src={getAssetsFile('images/market/icon_huo.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five2 == 5 ? (<img src={getAssetsFile('images/market/icon_tu.png')} className='wuxing' />) : null}
                    </li>
                  ) : null}
                  {heroInfoDetails.five3 != 0 ? (
                    <li>
                      {heroInfoDetails.five3 == 1 ? (<img src={getAssetsFile('images/market/icon_jin.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five3 == 2 ? (<img src={getAssetsFile('images/market/icon_mu.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five3 == 3 ? (<img src={getAssetsFile('images/market/icon_shui.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five3 == 4 ? (<img src={getAssetsFile('images/market/icon_huo.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five3 == 5 ? (<img src={getAssetsFile('images/market/icon_tu.png')} className='wuxing' />) : null}
                    </li>
                  ) : null}
                  {heroInfoDetails.five4 != 0 ? (
                    <li>
                      {heroInfoDetails.five4 == 1 ? (<img src={getAssetsFile('images/market/icon_jin.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five4 == 2 ? (<img src={getAssetsFile('images/market/icon_mu.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five4 == 3 ? (<img src={getAssetsFile('images/market/icon_shui.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five4 == 4 ? (<img src={getAssetsFile('images/market/icon_huo.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five4 == 5 ? (<img src={getAssetsFile('images/market/icon_tu.png')} className='wuxing' />) : null}
                    </li>
                  ) : null}
                  {heroInfoDetails.five5 != 0 ? (
                    <li>
                      {heroInfoDetails.five5 == 1 ? (<img src={getAssetsFile('images/market/icon_jin.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five5 == 2 ? (<img src={getAssetsFile('images/market/icon_mu.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five5 == 3 ? (<img src={getAssetsFile('images/market/icon_shui.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five5 == 4 ? (<img src={getAssetsFile('images/market/icon_huo.png')} className='wuxing' />) : null}
                      {heroInfoDetails.five5 == 5 ? (<img src={getAssetsFile('images/market/icon_tu.png')} className='wuxing' />) : null}
                    </li>
                  ) : null}
                </ul>
              </div>
              <div className="hero_img_wrap">
                <img src={getAssetsFile(`images/heroes/${heroInfoDetails.image}.png`)} />
              </div>
              <div className="hero_buy_wrap">
                {
                  heroInfoDetails.tradingStatus && heroInfoDetails.tradingStatus == '0' ? (
                    <div className="current_price">
                      <p className="tit">Current price</p>
                      <div className="price">
                        <div className="bnb_price">
                          <img src={getAssetsFile('images/public/logo_bnb@2x.png')} />
                          <p className="num">{heroInfoDetails.price}</p>
                        </div>
                        <p className="meiyuan">≈ ${percentMoney((Number(exchangeRate) * Number(heroInfoDetails.price)), 4)}</p>
                      </div>
                    </div>) : (
                    <div className="current_price" />)
                }
                {
                  heroInfoDetails.tradingStatus && heroInfoDetails.tradingStatus == '0' ? (
                    <div className="btn_wrap justify-content-center">
                      <Button onClick={() => cancleSaleFun()} loading={isCancleSaleLoading} className="btn btn2">Cancel Sale</Button>
                    </div>
                  ) : (
                    <div className="btn_wrap justify-content-center">
                      <Button onClick={() => setSaleNowModel(true)} className="btn btn1" type="primary">Sale Now</Button>
                    </div>
                  )
                }
              </div>
            </div>
            <div className="bot_wrap">
              <div className="base_box">
                <p className="title">
                  <img src={getAssetsFile('images/market/icon_base@2x.png')} />
                  <span>Base</span>
                </p>
                <ul className="base_list">
                  {
                    heroInfoDetails.attack ? (
                      <li>
                        {/* 攻击 */}
                        <p>Attack</p>
                        <p>
                          <img src={getAssetsFile('images/market/icon_attack@2x.png')} />
                          <span>{heroInfoDetails.attack}</span>
                        </p>
                      </li>
                    ) : null
                  }
                  {
                    heroInfoDetails.defense ? (
                      <li>
                        {/* 防御 */}
                        <p>Defence</p>
                        <p>
                          <img src={getAssetsFile('images/market/icon_defense@2x.png')} />
                          <span>{heroInfoDetails.defense}</span>
                        </p>
                      </li>
                    ) : null
                  }
                  {
                    heroInfoDetails.hp ? (
                      <li>
                        {/* 生命 */}
                        <p>HP</p>
                        <p>
                          <img src={getAssetsFile('images/market/icon_life@2x.png')} />
                          <span>{heroInfoDetails.hp}</span>
                        </p>
                      </li>
                    ) : null
                  }
                  {
                    heroInfoDetails.atkSpeed ? (
                      <li>
                        {/* 攻击速度 */}
                        <p>Speed</p>
                        <p>
                          <img src={getAssetsFile('images/market/icon_speed@2x.png')} />
                          <span>{heroInfoDetails.atkSpeed}</span>
                        </p>
                      </li>
                    ) : null
                  }
                  {
                    heroInfoDetails.crit ? (
                      <li>
                        {/* 暴击 */}
                        <p>Crit</p>
                        <p>
                          <img src={getAssetsFile('images/market/icon_crit@2x.png')} />
                          <span>{heroInfoDetails.crit}</span>
                        </p>
                      </li>
                    ) : null
                  }
                  {
                    heroInfoDetails.critResist ? (
                      <li>
                        {/* 抗暴（抵抗） */}
                        <p>Resist</p>
                        <p>
                          <img src={getAssetsFile('images/market/icon_resist@2x.png')} />
                          <span>{heroInfoDetails.critResist}</span>
                        </p>
                      </li>
                    ) : null
                  }
                </ul>
              </div>
              <div className="history_box">
                <p className="title">
                  <img src={getAssetsFile('images/market/icon_history@2x.png')} />
                  <span>Trade history</span>
                </p>
                {
                  heroInfoDetails.transactionHistory && heroInfoDetails.transactionHistory.length !== 0 ? (<ul className="history_list">
                    {
                      heroInfoDetails.transactionHistory.map((item: any, index: number) => {
                        return <li key={index}>
                          <p className="w33 item">
                            <span className="tit">Owner</span>
                            <span className="txt">{interceptStr(item.fromAddress, 4)}</span>
                          </p>
                          <p className="w33 item">
                            <span className="tit">Buyer</span>
                            <span className="txt">{interceptStr(item.toAddress, 4)}</span>
                          </p>
                          <div className="w33 item">
                            <p className="price">
                              <img src={getAssetsFile('images/public/logo_bnb@2x.png')} />
                              <span>{moneyFormat(item.price)}</span>
                            </p>
                            <p className="time">{item.tradingTime}</p>
                          </div>
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
      <CenterPopup visible={saleNowModel} onMaskClick={() => setSaleNowModel(false)} className="model-model-walletHeroDetails">
        <div className="model_box">
          <div className="hero_img">
            <img src={getAssetsFile(`images/heroes/${heroInfoDetails.image}.png`)} />
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
      </CenterPopup>
    </>
  );
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(WalletHeroDetails);
