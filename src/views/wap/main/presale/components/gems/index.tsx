/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-22 10:41:53
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-18 16:26:53
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
import { buyBlindBoxApi, openGemBlindBoxApi } from "@/api/modules/box";

import "./index.less";

const PresaleGems = (props: any) => {
  const { user, global } = props;
  const { address, isLogin, bnbBalance } = user;
  const { exchangeRate } = global;
  const navigate = useNavigate();
  const location = useLocation();

  // <-----------------------宝石Gems(Equip) segmentation--------------------------->
  const [equipBoxInfo, setEquipBoxInfo] = useState<any>({
    price: ['0.001', '0.002', '0.003'],//盲盒价格
    requestTokenID: null,//当前购买盲盒的tokenid
  });
  const [checkedBindbox, setCheckedBindbox] = useState<{ type: number; quality: number }>({ type: 0, quality: 0 });//选择的是哪种品质的盲盒 type编号(0,1,2) => quality品质(1,2,3)
  const [buyNowEquipModel, setBuyNowEquipModel] = useState<boolean>(false);//equip购买弹框
  const [buyNowEquipBtnLoading, setBuyNowEquipBtnLoading] = useState<boolean>(false);//equip购买按钮Loading
  const [openEquipSuccessModel, setOpenEquipSuccessModel] = useState<boolean>(false);//equip开启成功弹框
  const [openEquipInfo, setOpenEquipInfo] = useState({
    grade: null,//等级（1~9）
    rarity: null,//品质（1N，2R，3SR，4SSR, 5UR, 6EXR）
    type: null,//宝石类型（1红，2黄，3蓝，4绿，5紫）
    image: null,
    number: null,
  });//开出的Equip宝石信息（由于内容目前未知，样式先保持一致）

  useEffect(() => {
    getBindBoxInfo(); // 初始化盲盒相关信息
  }, [])

  // 获取盲盒相关信息
  async function getBindBoxInfo() {
    await sdk.chainWeb3.connectMetamask();
    //获取盒子的价值
    let boxprice = await sdk.EquipLogic.getEquipBoxPrice();
    console.log(boxprice)
    setEquipBoxInfo((previousState: any) => {
      return {
        ...previousState,
        price: boxprice,
      }
    });
  };

  // 检查登录与否（gems/equip宝石）
  const checkingEquipLoginFun = (type: number, quality: number) => {
    if (isLogin) {
      setCheckedBindbox({ type, quality })
      setBuyNowEquipModel(true);
    } else {
      message.warning({
        content: 'Please connect your wallet',
        duration: 3
      })
    }
  };
  // 点击购买按钮（gems/equip宝石）- type编号(0,1,2) => quality品质(1,2,3)
  const buyBlindEquipBoxFun = async (type: number, quality: number) => {
    showFullScreenLoading('Proceeding');//全屏Loading-open
    setBuyNowEquipBtnLoading(true);//按钮Loading-open
    await sdk.chainWeb3.connectMetamask();
    console.log('品质:', quality, '价格:', equipBoxInfo.price[type])
    try {
      //购买盲盒成功后返回
      let buybox = await sdk.EquipLogic.buyEquipBox(quality);
      console.log("gems购买1", buybox)
      //可以获取当前购买盲盒的tokenid
      let result = await sdk.EquipLogic.decodeEventBuyEquip(buybox);
      console.log("gems购买2", result)

      // 购买时调用后端接口存入盲盒购买信息
      let buyData = {
        boxType: '1',/** 盲盒类型（0 英雄 1 宝石） */
        qualityType: type,/** 品质类型（0 普通 1 稀有 2 史诗） */
        price: equipBoxInfo.price[type],/** 售价 */
        gemId: result.tokenid,/** 宝石编号 */
        holder: result.buyer,/** 持有人 */
      };
      buyBlindBoxApi(buyData).then(async (res: any) => {
        console.log(res, "购买成功！");
      }).catch((err: any) => {
        console.error(err, "购买失败！");
      });

      // 购买时调用后端接口存入装备信息
      let openData = {
        address: result.buyer,/** 所有者 */
        number: result.tokenid,/** 宝石编号 */
        type: result.meta.quality_equip,/** 宝石类型（1红，2黄，3蓝，4绿，5紫） */
        grade: result.meta.level,/** 等级（1~9） */
        rarity: result.meta.level,/** 品质（1N对应等级1，2R对应等级2，3SR对应等级3，4SSR对应等级4, 5UR对应等级5, 6EXR对应等级6~9） */
      };
      openGemBlindBoxApi(openData).then(async (res: any) => {
        console.log(res, "打开成功！");
        // 开启成功后的内容，做页面显示时使用
        setOpenEquipInfo((previousState: any) => {
          return {
            ...previousState,
            grade: res.data.grade,//等级（1~9）
            rarity: res.data.rarity,//品质（1N，2R，3SR，4SSR, 5UR, 6EXR）
            type: res.data.type,//宝石类型（1红，2黄，3蓝，4绿，5紫）
            image: res.data.image,
            number: res.data.number,
          }
        });
        setOpenEquipSuccessModel(true);//打开开启成功信息弹框
      }).catch((err: any) => {
        console.error(err, "打开失败！");
      });
      setBuyNowEquipModel(false);//关闭购买弹框
    } catch (error: any) {
      console.error('error', error)
      message.error({
        content: error.message,
        duration: 3
      })
    } finally {
      tryHideFullScreenLoading();//全屏Loading-close
      setBuyNowEquipBtnLoading(false);//按钮Loading-close
    }
  };

  // 跳转装备列表
  const gotoWalletEquip = () => {
    setOpenEquipSuccessModel(false);
    navigate("/main/wallet/nft", {
      state: {
        type: 'gem',
      }
    });
  };
  return (
    <>
      <div className="presale_gems_container">
        <div className="main_wrap">
          <div className='title'>
            <img src={getAssetsFile('images/presale/name@2x.png')} />
            <p>Get ready for the genesis NFT offerings! You will find exclusive benefits to presale items & your chance to get a head start before game launch. So, are you ready to become the Golden Bros?</p>
          </div>
          <div className="blindbox">
            <div className="info_btn">
              <div className="tabs_list">
                <div onClick={() => navigate('/main/presale/heroes')} className='tab_item'>
                  <img src={getAssetsFile('images/wallet/icon_hero@2x.png')} />
                  <p>HEROES</p>
                </div>
                <div onClick={() => navigate('/main/presale/gems')} className='tab_item active'>
                  <img src={getAssetsFile('images/wallet/icon_gem2@2x.png')} />
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
                    <span>{equipBoxInfo.price[0]}</span>
                  </div>
                </div>
                <div className='boximg'>
                  <img src={getAssetsFile('images/presale/blindbox1@2x.png')} />
                </div>
                <div className="btn_wrap">
                  <Button onClick={() => checkingEquipLoginFun(0, 1)} className="btn btn1" type="primary">Buy Now</Button>
                </div>
              </div>
              <div className="box_wrap box_wrap2">
                <div className="price_wrap">
                  <img src={getAssetsFile('images/presale/td-02@2x.png')} className='tit' />
                  <div className="price">
                    <span>Price: </span>
                    <img src={getAssetsFile('images/public/logo_bnb@2x.png')} className='bnb-icon' />
                    <span>{equipBoxInfo.price[1]}</span>
                  </div>
                </div>
                <div className='boximg'>
                  <img src={getAssetsFile('images/presale/blindbox2@2x.png')} />
                </div>
                <div className="btn_wrap">
                  <Button onClick={() => checkingEquipLoginFun(1, 2)} className="btn btn2" type="primary">Buy Now</Button>
                </div>
              </div>
              <div className="box_wrap box_wrap3">
                <div className="price_wrap">
                  <img src={getAssetsFile('images/presale/td-03@2x.png')} className='tit' />
                  <div className="price">
                    <span>Price: </span>
                    <img src={getAssetsFile('images/public/logo_bnb@2x.png')} className='bnb-icon' />
                    <span>{equipBoxInfo.price[2]}</span>
                  </div>
                </div>
                <div className='boximg'>
                  <img src={getAssetsFile('images/presale/blindbox3@2x.png')} />
                </div>
                <div className="btn_wrap">
                  <Button onClick={() => checkingEquipLoginFun(2, 3)} className="btn btn3" type="primary">Buy Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* gems(equip)价格弹框 */}
      <CenterPopup visible={buyNowEquipModel} onMaskClick={() => setBuyNowEquipModel(false)} className="model-model-presale-gems">
        <div className="model_box">
          <div className="price">
            <img src={getAssetsFile('images/public/logo_bnb@2x.png')} />
            <p className="bnbprice">{equipBoxInfo.price[checkedBindbox.type]}</p>
            <p className="dollor">≈ ${percentMoney(Number(equipBoxInfo.price[checkedBindbox.type]) * Number(exchangeRate), 4)}</p>
          </div>
          <div className="btn_wrap">
            <Button onClick={() => buyBlindEquipBoxFun(checkedBindbox.type, checkedBindbox.quality)} loading={buyNowEquipBtnLoading} className={["btn", checkedBindbox.type === 0 ? "btn1" : checkedBindbox.type === 1 ? "btn2" : checkedBindbox.type === 2 ? "btn3" : null].join(' ')}>Buy Now</Button>
          </div>
          <p className="balance_wrap">
            <span>Buy BNB</span>
            <span>Balance: {interceptDecimal(bnbBalance, 4)}</span>
          </p>
        </div>
      </CenterPopup>
      {/* gems(equip)开启成功 */}
      <CenterPopup visible={openEquipSuccessModel} onMaskClick={() => setOpenEquipSuccessModel(false)} className="model-model-presale-gems">
        <div className="model_openbox">
          <div className="first_row">
            <div className="zhiye_wrap">
              <p>LV.{openEquipInfo.grade}</p>
            </div>
            <div className="rarity_wrap">
              {openEquipInfo.rarity == 1 ? (<img src={getAssetsFile('images/dashboard/pinzhi_n@2x.png')} className='zhiye' />) : null}
              {openEquipInfo.rarity == 2 ? (<img src={getAssetsFile('images/dashboard/pinzhi_r@2x.png')} className='zhiye' />) : null}
              {openEquipInfo.rarity == 3 ? (<img src={getAssetsFile('images/dashboard/pinzhi_sr@2x.png')} className='zhiye' />) : null}
              {openEquipInfo.rarity == 4 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ssr@2x.png')} className='zhiye' />) : null}
              {openEquipInfo.rarity == 5 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ur@2x.png')} className='zhiye' />) : null}
              {openEquipInfo.rarity == 6 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='zhiye' />) : null}
              {openEquipInfo.rarity == 7 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='zhiye' />) : null}
              {openEquipInfo.rarity == 8 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='zhiye' />) : null}
              {openEquipInfo.rarity == 9 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='zhiye' />) : null}
            </div>
          </div>
          <div className="hero_img_wrap">
            <img src={getAssetsFile(`images/gems/${openEquipInfo.image}.png`)} />
          </div>
          <div className="hero_info">
            <p className="name">Gem #{openEquipInfo.number}</p>
          </div>
          <div className="btn_wrap">
            <Button onClick={() => gotoWalletEquip()} className="btn">Click to Reveal</Button>
          </div>
        </div>
      </CenterPopup>
    </>
  );
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(PresaleGems);
