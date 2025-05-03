/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-22 10:41:53
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-28 18:24:12
 */
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { interceptStr, percentMoney, moneyFormat, getAssetsFile, interceptAfter5 } from "@/utils/common";
import sdk from '@/sdk/chanjssdktd.js';
import { isMetaMask } from "@/utils/web3/connectWeb3";
import { buyGemApi } from "@/api/modules/market";
import { getGemInfoApi } from "@/api/modules/gem";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import "./index.less";

const MarketGemDetails: React.FC = (props: any) => {
  const { user, global } = props;
  const { address, isLogin } = user;
  const { exchangeRate } = global;
  const navigate = useNavigate();
  const location = useLocation();

  const [isBuyNowLoading, setIsBuyNowLoading] = useState<boolean>(false);//是否购买Loading
  const [gemInfoDetails, setGemInfoDetails] = useState<any>({
    isMyPost: false,
  });

  // 后退
  const backFun = () => {
    navigate(-1)
  };

  // 列表参数变化更新
  useEffect(() => {
    getGemDetails()
  }, [location.state, isLogin])

  // 打开英雄详细信息
  const getGemDetails = () => {
    const state: any = location.state;
    let httpData = {
      address: state.address,
      number: state.number,
    };
    getGemInfoApi(httpData).then(async (res: any) => {
      console.log(res, "宝石详细信息res");
      setGemInfoDetails(res.data);
      if (isLogin) {
        let buyer = address.toLocaleLowerCase();
        let seller = res.data.address.toLocaleLowerCase();
        console.log(buyer, seller)
        setGemInfoDetails((previousState: object) => {
          return {
            ...previousState,
            isMyPost: seller == buyer ? true : false,
          }
        });
      } else {
        setGemInfoDetails((previousState: object) => {
          return {
            ...previousState,
            isMyPost: false,
          }
        });
      }
    });
  };

  // 检查登录与否（Gem英雄）
  const checkingGemLoginFun = () => {
    if (isLogin) {
      buyNowGemFun();
    } else {
      message.warning({
        content: 'Please connect your wallet',
        duration: 3
      })
    }
  };

  // 购买
  async function buyNowGemFun() {
    setIsBuyNowLoading(true);
    await sdk.chainWeb3.connectMetamask();//连接钱包
    const isApproved = await sdk.Equip721.isApprovedForAll(sdk.EquipMarket.address);//是否授权
    if (!isApproved) {
      showFullScreenLoading('Approved');//全屏Loading
      try {
        await sdk.Equip721.setApprovalForAll(sdk.EquipMarket.address, true);//授权
        tryHideFullScreenLoading();
        buyNowGemFun();
      } catch (error: any) {
        console.error('error', error)
        message.error({
          content: error.message,
          duration: 3
        })
        tryHideFullScreenLoading();
        setIsBuyNowLoading(false);
      }
    } else {
      showFullScreenLoading('Proceeding');//全屏Loading
      try {
        let buy = await sdk.EquipMarket.buy(gemInfoDetails.number);
        console.log('Gem购买', buy)
        let httpData = {
          gemId: gemInfoDetails.number, /** 英雄编号 */
          price: gemInfoDetails.price, /** 交易价格 */
          hash: buy.transactionHash,/** 交易hash */
          toAddress: address, /** 转入地址(买家) */
          fromAddress: gemInfoDetails.address, /** 转出地址(卖家)*/
        };
        buyGemApi(httpData).then((res: any) => {
          message.success({
            content: "Purchased",
            duration: 3,
          });
          gotoWalletGem(); // 跳转至钱包NFT
        }).catch((err: any) => {
          message.warning({
            content: "Purchase failed",
            duration: 3,
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
        setIsBuyNowLoading(false);//Loading消失
        tryHideFullScreenLoading();//Loading消失
      }
    }
  }

  // 跳转英雄列表
  const gotoWalletGem = () => {
    navigate("/main/wallet/nft", {
      state: {
        type: 'gem',
      }
    });
  };

  return (
    <>
      <div className="marketGemDetails_container">
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
                <div className="current_price">
                  <p className="tit">Current price</p>
                  <div className="price">
                    <div className="bnb_price">
                      <img src={getAssetsFile('images/public/logo_bnb@2x.png')} />
                      <p className="num">{gemInfoDetails.price}</p>
                    </div>
                    <p className="meiyuan">≈ ${percentMoney((Number(exchangeRate) * Number(gemInfoDetails.price)), 4)}</p>
                  </div>
                </div>
                <div className="btn_wrap">
                  {
                    gemInfoDetails.isMyPost ? (
                      <Button disabled={true} className="btn btn1" >Buy Now</Button>
                    ) : (
                      <Button onClick={() => checkingGemLoginFun()} loading={isBuyNowLoading} className="btn btn2" type="primary">Buy Now</Button>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="bot_wrap">
              <div className="history_box">
                <p className="title">
                  <img src={getAssetsFile('images/market/icon_history@2x.png')} />
                  <span>Trade history</span>
                </p>
                {
                  gemInfoDetails.transactionHistory && gemInfoDetails.transactionHistory.length !== 0 ? (<ul className="history_list">
                    {
                      gemInfoDetails.transactionHistory.map((item: any, index: number) => {
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
    </>
  );
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(MarketGemDetails);
