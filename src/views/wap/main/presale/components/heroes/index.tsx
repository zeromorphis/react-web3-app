/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-22 10:41:53
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-20 09:52:38
 */
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Button, message } from 'antd';
import { CenterPopup } from 'antd-mobile';
import { interceptStr, interceptDecimal, percentMoney, moneyFormat, getAssetsFile } from "@/utils/common";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import Stars from "@/components/web/Stars";
import sdk from '@/sdk/chanjssdktd.js';
import { buyBlindBoxApi, openHeroBlindBoxApi } from "@/api/modules/box";

import "./index.less";

const PresaleHeroes = (props: any) => {
  const { user, global } = props;
  const { address, isLogin, bnbBalance } = user;
  const { exchangeRate } = global;
  const navigate = useNavigate();
  const location = useLocation();
  // <-----------------------英雄Heroes segmentation--------------------------->
  const [heroBoxInfo, setHeroBoxInfo] = useState<any>({
    price: ['0.01', '0.02', '0.03'],//盲盒价格
    limit: ['0', '0', '0'],//盲盒数量
    requestTokenID: null,//当前购买盲盒编号
  });
  const [checkedBindbox, setCheckedBindbox] = useState<{ type: number; quality: number }>({ type: 0, quality: 0 });//选择的是哪种品质的盲盒 type编号(0,1,2) => quality品质(1,2,3)
  const [buyNowHeroModel, setBuyNowHeroModel] = useState<boolean>(false);//Hero购买弹框
  const [buyNowHeroBtnLoading, setBuyNowHeroBtnLoading] = useState<boolean>(false);//Hero购买按钮Loading
  const [buyNowHeroSuccessModel, setBuyNowHeroSuccessModel] = useState<boolean>(false);//Hero购买成功弹框
  const [openHeroBoxBtnLoading, setOpenHeroBoxBtnLoading] = useState<boolean>(false);//Hero开启中Loading
  const [openHeroSuccessModel, setOpenHeroSuccessModel] = useState<boolean>(false);//Hero开启成功弹框
  const [openHeroInfo, setOpenHeroInfo] = useState({
    job: null,//职业（1坦克、2战士、3射手）
    rarity: null,//品质（1N，2R，3SR，4SSR, 5UR, 6EXR）
    image: null,
    number: null,
    stars: null,//星级（0~5）
  });//开出的Hero英雄信息

  useEffect(() => {
    getBindBoxInfo(); // 初始化盲盒相关信息
  }, [])

  // 获取盲盒相关信息
  async function getBindBoxInfo() {
    await sdk.chainWeb3.connectMetamask();
    //获取盒子的价值
    let boxprice = await sdk.HeroLogic.getHeroBoxPrice();
    console.log(boxprice)
    //获取盒子数量
    let boxlimit = await sdk.HeroLogic.getHeroBoxLimit();
    console.log(boxlimit)
    setHeroBoxInfo((previousState: any) => {
      return {
        ...previousState,
        price: boxprice,
        limit: boxlimit
      }
    });
  };

  // 检查登录与否（hero英雄）
  const checkingHeroLoginFun = (type: number, quality: number) => {
    if (isLogin) {
      setCheckedBindbox({ type, quality })
      setBuyNowHeroModel(true);
    } else {
      message.warning({
        content: 'Please connect your wallet',
        duration: 3
      })
    }
  };
  // 点击购买按钮（hero英雄）- type编号(0,1,2) => quality品质(1,2,3)
  const buyBlindHeroBoxFun = async (type: number, quality: number) => {
    showFullScreenLoading('Proceeding');//全屏Loading-open
    setBuyNowHeroBtnLoading(true);//按钮Loading-open
    await sdk.chainWeb3.connectMetamask();
    let nowInStock = heroBoxInfo.limit[type]; //库存
    console.log('品质:', quality, '库存:', nowInStock, '价格:', heroBoxInfo.price[type])
    if (nowInStock > 0) {
      try {
        //购买盲盒成功后返回
        let buybox = await sdk.HeroLogic.buyHeroBox(quality);
        console.log("hero购买1", buybox)
        //可以获取当前购买盲盒的tokenid
        let result = await sdk.HeroLogic.decodeEventBuyHero(buybox);
        console.log("hero购买2", result)
        setHeroBoxInfo((previousState: any) => {
          return {
            ...previousState,
            requestTokenID: result.tokenid
          }
        });
        let httpData = {
          boxType: '0',/** 盲盒类型（0 英雄 1 宝石） */
          qualityType: type,/** 品质类型（0 普通 1 稀有 2 史诗） */
          price: heroBoxInfo.price[type],/** 售价 */
          heroId: result.tokenid,/** 英雄编号 */
          holder: result.buyer,/** 持有人 */
        };
        buyBlindBoxApi(httpData).then(async (res: any) => {
          console.log(res, "购买成功！");
        }).catch((err: any) => {
          console.error(err, "购买失败！");
        });
        setBuyNowHeroModel(false);//关闭购买弹框
        setBuyNowHeroSuccessModel(true);//打开购买成功弹框
      } catch (error: any) {
        console.error('error', error)
        message.error({
          content: error.message,
          duration: 3
        })
      } finally {
        tryHideFullScreenLoading();//全屏Loading-close
        setBuyNowHeroBtnLoading(false);//按钮Loading-close
      }
    } else {
      message.warning({
        content: "Inventory Shortage",//库存量不足
        duration: 3,
      });
      tryHideFullScreenLoading();//全屏Loading-close
      setBuyNowHeroBtnLoading(false);//按钮Loading-close
    }
  };
  // 点击开启盲盒按钮（hero英雄）
  async function openNowHeroBoxFun() {
    setOpenHeroBoxBtnLoading(true);//将开盲盒状态更改为正在开启中...
    try {
      //开盲盒方法，参数为购买盲盒时的tokenid
      let openhero = await sdk.HeroLogic.openHero(heroBoxInfo.requestTokenID);
      console.log("hero打开1", openhero)
      //返回开完盲盒后的数据
      let result = await sdk.HeroLogic.decodeEventOpenHero(openhero);
      console.log("hero打开2", result)
      let httpData = {
        address: result.owner,/** 所有者 */
        number: result.tokenid,/** 英雄编号 */
        rarity: result.meta.quality_hero,/** 品质（1N，2R，3SR，4SSR, 5UR, 6EXR） */
        job: result.meta.job,/** 职业（1坦克、2战士、3射手） */
        fiveElements: `${result.meta.five1},${result.meta.five2},${result.meta.five3},${result.meta.five4},${result.meta.five5}`,/** 五行属性（金木水火土） */
        stars: result.meta.stars,/** 星级（0~5） */
        image: result.meta.appearance,/** 图片地址 */
        grade: '1',/** 等级（1~70） */
        // bool opened;        //是否开启过盲盒 result.meta.opened
        // uint8 quality_box;  //盲盒品质 result.meta.quality_box
        // uint8 quality_hero; //+英雄品质 result.meta.quality_hero
        // uint8 stars;        //+星级 result.meta.stars
        // uint8 job;          //+职业 result.meta.job
        // uint8 appearance;   //+外观 result.meta.appearance
        // uint8 five1;        //+五行1 result.meta.five1
        // uint8 five2;        //+五行2 result.meta.five2
        // uint8 five3;        //+五行3 result.meta.five3
        // uint8 five4;        //+五行4 result.meta.five4
        // uint8 five5;        //+五行5 result.meta.five5
        // uint256 tokenid     //+tokenid result.tokenid
        // address owner       //+所有者 result.owner
      };
      openHeroBlindBoxApi(httpData).then((res: any) => {
        console.log(res, "开启成功！");
        // 开启成功后的内容，做页面显示时使用
        setOpenHeroInfo((previousState: any) => {
          return {
            ...previousState,
            job: result.meta.job,
            rarity: result.meta.quality_hero,
            image: res.data.image,
            number: res.data.number,
            stars: result.meta.stars
          }
        });
        setOpenHeroSuccessModel(true);//打开开启成功信息弹框
      }).catch((err: any) => {
        console.error(err, "开启失败！");
      });
    } catch (error: any) {
      console.error('error', error)
      message.error({
        content: error.message,
        duration: 3
      })
    } finally {
      setBuyNowHeroSuccessModel(false);//直接关闭开启弹框
      setOpenHeroBoxBtnLoading(false);//改回待开启，以免下次使用时异常
    }
  }
  // 跳转英雄列表
  const gotoWalletHero = () => {
    setOpenHeroSuccessModel(false);
    navigate("/main/wallet/nft", {
      state: {
        type: 'hero',
      }
    });
  };

  return (
    <>
      <div className="presale_heroes_container">
        <div className="main_wrap">
          <div className='title'>
            <img src={getAssetsFile('images/presale/name@2x.png')} />
            <p>Get ready for the genesis NFT offerings! You will find exclusive benefits to presale items & your chance to get a head start before game launch. So, are you ready to become the Golden Bros?</p>
          </div>
          <div className="blindbox">
            <div className="info_btn">
              <div className="tabs_list">
                <div onClick={() => navigate('/main/presale/heroes')} className='tab_item active'>
                  <img src={getAssetsFile('images/wallet/icon_hero2@2x.png')} />
                  <p>HEROES</p>
                </div>
                <div onClick={() => navigate('/main/presale/gems')} className='tab_item'>
                  <img src={getAssetsFile('images/wallet/icon_gem@2x.png')} />
                  <p>GEMS</p>
                </div>
              </div>
              <div className="probability">
                <img src={getAssetsFile('images/presale/icon_probability@2x.png')} />
              </div>
            </div>
            <div className="boxlist">
              <div className="box_wrap box_wrap1">
                <div className="price_wrap">
                  <img src={getAssetsFile('images/presale/td-01@2x.png')} className='tit' />
                  <div className="price">
                    <span>Price: </span>
                    <img src={getAssetsFile('images/public/logo_bnb@2x.png')} className='bnb-icon' />
                    <span>{heroBoxInfo.price[0]}</span>
                  </div>
                </div>
                <div className='boximg'>
                  <img src={getAssetsFile('images/presale/blindbox1@2x.png')} />
                </div>
                <div className="btn_wrap">
                  <Button onClick={() => checkingHeroLoginFun(0, 1)} className="btn btn1" type="primary">
                    <span className="txt">Buy Now</span>
                    <span className="total">({heroBoxInfo.limit[0]})</span>
                  </Button>
                </div>
              </div>
              <div className="box_wrap box_wrap2">
                <div className="price_wrap">
                  <img src={getAssetsFile('images/presale/td-02@2x.png')} className='tit' />
                  <div className="price">
                    <span>Price: </span>
                    <img src={getAssetsFile('images/public/logo_bnb@2x.png')} className='bnb-icon' />
                    <span>{heroBoxInfo.price[1]}</span>
                  </div>
                </div>
                <div className='boximg'>
                  <img src={getAssetsFile('images/presale/blindbox2@2x.png')} />
                </div>
                <div className="btn_wrap">
                  <Button onClick={() => checkingHeroLoginFun(1, 2)} className="btn btn2" type="primary">
                    <span className="txt">Buy Now</span>
                    <span className="total">({heroBoxInfo.limit[1]})</span>
                  </Button>
                </div>
              </div>
              <div className="box_wrap box_wrap3">
                <div className="price_wrap">
                  <img src={getAssetsFile('images/presale/td-03@2x.png')} className='tit' />
                  <div className="price">
                    <span>Price: </span>
                    <img src={getAssetsFile('images/public/logo_bnb@2x.png')} className='bnb-icon' />
                    <span>{heroBoxInfo.price[2]}</span>
                  </div>
                </div>
                <div className='boximg'>
                  <img src={getAssetsFile('images/presale/blindbox3@2x.png')} />
                </div>
                <div className="btn_wrap">
                  <Button onClick={() => checkingHeroLoginFun(2, 3)} className="btn btn3" type="primary">
                    <span className="txt">Buy Now</span>
                    <span className="total">({heroBoxInfo.limit[2]})</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* hero价格弹框 */}
      <CenterPopup visible={buyNowHeroModel} onMaskClick={() => setBuyNowHeroModel(false)} className="model-model-presale-heroes">
        <div className="model_box">
          <div className="price">
            <img src={getAssetsFile('images/public/logo_bnb@2x.png')} />
            <p className="bnbprice">{heroBoxInfo.price[checkedBindbox.type]}</p>
            <p className="dollor">≈ ${percentMoney(Number(heroBoxInfo.price[checkedBindbox.type]) * Number(exchangeRate), 4)}</p>
          </div>
          <div className="btn_wrap">
            <Button onClick={() => buyBlindHeroBoxFun(checkedBindbox.type, checkedBindbox.quality)} loading={buyNowHeroBtnLoading} className={["btn", checkedBindbox.type === 0 ? "btn1" : checkedBindbox.type === 1 ? "btn2" : checkedBindbox.type === 2 ? "btn3" : null].join(' ')} >Buy Now</Button>
          </div>
          <p className="balance_wrap">
            <span>Buy BNB</span>
            <span>Balance: {interceptDecimal(bnbBalance, 4)}</span>
          </p>
        </div>
      </CenterPopup>
      {/* hero购买成功 */}
      <CenterPopup visible={buyNowHeroSuccessModel} onMaskClick={() => setBuyNowHeroSuccessModel(false)} className="model-model-presale-heroes">
        <div className="model_success">
          <p className="title">
            {openHeroBoxBtnLoading ? 'NFT Blind Box Opening…' : 'Success'}
          </p>
          <div className={["boximg", openHeroBoxBtnLoading ? "shake" : null].join(' ')}>
            {checkedBindbox.type == 0 ? (<img src={getAssetsFile('images/presale/blindbox1@2x.png')} />) : null}
            {checkedBindbox.type == 1 ? (<img src={getAssetsFile('images/presale/blindbox2@2x.png')} />) : null}
            {checkedBindbox.type == 2 ? (<img src={getAssetsFile('images/presale/blindbox3@2x.png')} />) : null}
          </div>
          {
            !openHeroBoxBtnLoading ? (
              <div className="btn_wrap">
                <Button onClick={() => openNowHeroBoxFun()} className="btn">Open Now</Button>
              </div>
            ) : null
          }
        </div>
      </CenterPopup>
      {/* hero开启成功 */}
      <CenterPopup visible={openHeroSuccessModel} onMaskClick={() => setOpenHeroSuccessModel(false)} className="model-model-presale-heroes">
        <div className="model_openbox">
          <div className="first_row">
            <div className="zhiye_wrap">
              {openHeroInfo.job == 1 ? (<img src={getAssetsFile('images/dashboard/zhiye_1@2x.png')} />) : null}
              {openHeroInfo.job == 2 ? (<img src={getAssetsFile('images/dashboard/zhiye_2@2x.png')} />) : null}
              {openHeroInfo.job == 3 ? (<img src={getAssetsFile('images/dashboard/zhiye_3@2x.png')} />) : null}
            </div>
            <div className="rarity_wrap">
              {openHeroInfo.rarity == 1 ? (<img src={getAssetsFile('images/dashboard/pinzhi_n@2x.png')} className='zhiye' />) : null}
              {openHeroInfo.rarity == 2 ? (<img src={getAssetsFile('images/dashboard/pinzhi_r@2x.png')} className='zhiye' />) : null}
              {openHeroInfo.rarity == 3 ? (<img src={getAssetsFile('images/dashboard/pinzhi_sr@2x.png')} className='zhiye' />) : null}
              {openHeroInfo.rarity == 4 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ssr@2x.png')} className='zhiye' />) : null}
              {openHeroInfo.rarity == 5 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ur@2x.png')} className='zhiye' />) : null}
              {openHeroInfo.rarity == 6 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='zhiye' />) : null}
            </div>
          </div>
          <div className="hero_img_wrap">
            <img src={getAssetsFile(`images/heroes/${openHeroInfo.image}.png`)} />
          </div>
          <div className="hero_info">
            <p className="name">Hero #{openHeroInfo.number}</p>
            <Stars stars={openHeroInfo.stars} />
          </div>
          <div className="btn_wrap">
            <Button onClick={() => gotoWalletHero()} className="btn">Click to Reveal</Button>
          </div>
        </div>
      </CenterPopup>
    </>
  );
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(PresaleHeroes);
