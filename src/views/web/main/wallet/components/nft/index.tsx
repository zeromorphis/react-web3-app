/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-22 10:41:53
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-20 10:05:02
 */
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Slider, Button, Modal, message } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import { SearchOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import Stars from "@/components/web/Stars";
import { interceptStr, interceptDecimal, percentMoney, moneyFormat, onlyPositiveInteger, getAssetsFile, interceptAfter5 } from "@/utils/common";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import sdk from '@/sdk/chanjssdktd.js';
import { accountHeroInfoApi, accountGemInfoApi, accountBlindBoxInfoApi } from "@/api/modules/wallet";
import { openHeroBlindBoxApi } from "@/api/modules/box";

// images
import icon_hero from "@/assets/images/wallet/icon_hero@2x.png";
import icon_hero2 from "@/assets/images/wallet/icon_hero2@2x.png";
import icon_gem from "@/assets/images/wallet/icon_gem@2x.png";
import icon_gem2 from "@/assets/images/wallet/icon_gem2@2x.png";
import icon_box from "@/assets/images/wallet/icon_box@2x.png";
import icon_box2 from "@/assets/images/wallet/icon_box2@2x.png";
import "./index.less";

const Nft = (props: any) => {
  const { user, global } = props;
  const { address } = user;
  const { exchangeRate } = global;
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabsList = [
    {
      icon1: icon_hero,
      icon2: icon_hero2,
      show: activeTab,
      name: 'HEROES',
    },
    {
      icon1: icon_gem,
      icon2: icon_gem2,
      show: activeTab,
      name: 'GEMS',
    },
    {
      icon1: icon_box,
      icon2: icon_box2,
      show: activeTab,
      name: 'BOXS',
    }
  ];
  const heroOrderTypeList = [
    {
      value: 0,
      key: 0,
      label: "Mint Time",
    },
    {
      value: 1,
      key: 1,
      label: "Star",
    },
    {
      value: 2,
      key: 2,
      label: "Rarity",
    },
  ];

  const gemsOrderTypeList = [
    {
      value: 0,
      key: 0,
      label: "Mint Time",
    },
    {
      value: 1,
      key: 1,
      label: "Grade",
    },
    {
      value: 2,
      key: 2,
      label: "Rarity",
    },
  ];

  interface pageData {
    angleCount: number;//当前数量
    list: object[];//页面List列表
  }
  const [heroData, setHeroData] = useState<pageData>({
    angleCount: 0, // 数据总数
    list: [], // 数据列表
  });
  const [gemsData, setGemsData] = useState<pageData>({
    angleCount: 0, // 数据总数
    list: [], // 数据列表
  });
  const [boxData, setBoxData] = useState<pageData>({
    angleCount: 0, // 数据总数
    list: [], // 数据列表
  });

  const [requestTokenID, setRequestTokenID] = useState<any>(null);
  const [openHeroBoxBtnLoading, setOpenHeroBoxBtnLoading] = useState<boolean>(false);//Hero开启中Loading
  const [openHeroSuccessModel, setOpenHeroSuccessModel] = useState<boolean>(false);//Hero开启成功弹框
  const [openHeroInfo, setOpenHeroInfo] = useState({
    job: null,//职业（1坦克、2战士、3射手）
    rarity: null,//品质（1N，2R，3SR，4SSR, 5UR, 6EXR）
    image: null,
    number: null,
    stars: null,//星级（0~5）
  });//开出的Hero英雄信息

  // 切换
  const chooseNFTCLASS = (index: number) => {
    console.log('chooseNFTCLASS:', index);
    setActiveTab(index)
    switch (index) {
      case 0:
        getHeroList();
        setShowGemsOrderType(false)
        break;
      case 1:
        getGemsList();
        setShowHeroOrderType(false)
        break;
      case 2:
        getBoxList();
        setShowHeroOrderType(false)
        setShowGemsOrderType(false)
        break;
    }
  };

  // <--- showOrderType筛选--开始 --->
  const [heroOrderType, setHeroOrderType] = useState(0);
  const [showHeroOrderType, setShowHeroOrderType] = useState<boolean>(false);
  const [heroOrderTypeLabel, setHeroOrderTypeLabel] = useState<string>(heroOrderTypeList[0].label);
  const changeHeroOrderTypeFun = (e: any) => {
    setShowHeroOrderType(false)
    setHeroOrderTypeLabel(e.label)
    setHeroOrderType(e.value);
  };
  // <--- showOrderType筛选--结束 --->

  // 列表参数变化更新
  useEffect(() => {
    getHeroList()
  }, [heroOrderType])

  // 获取列表信息
  const getHeroList = () => {
    let httpData = {
      orderType: heroOrderType,
      address: address,
    };
    accountHeroInfoApi(httpData).then((res: any) => {
      setHeroData(previousState => {
        return {
          ...previousState,
          angleCount: res.total ? res.total : 0,
          list: res.rows
        }
      });
    });
  };

  // <--- showOrderType筛选--开始 --->
  const [gemsOrderType, setGemsOrderType] = useState(0);
  const [showGemsOrderType, setShowGemsOrderType] = useState<boolean>(false);
  const [gemsOrderTypeLabel, setGemsOrderTypeLabel] = useState<string>(gemsOrderTypeList[0].label);
  const changeGemsOrderTypeFun = (e: any) => {
    setShowGemsOrderType(false)
    setGemsOrderTypeLabel(e.label)
    setGemsOrderType(e.value);
  };
  // <--- showOrderType筛选--结束 --->

  useEffect(() => {
    const state: any = location.state;
    if (state?.type) {
      switch (state.type) {
        case 'hero':
          chooseNFTCLASS(0);
          break;
        case 'gem':
          chooseNFTCLASS(1);
          break;
      }
    }
  }, [location.state])

  // 列表参数变化更新
  useEffect(() => {
    getGemsList()
  }, [gemsOrderType])

  // 获取列表信息
  const getGemsList = () => {
    let httpData = {
      orderType: gemsOrderType,
      address: address,
    };
    accountGemInfoApi(httpData).then((res: any) => {
      setGemsData(previousState => {
        return {
          ...previousState,
          angleCount: res.total ? res.total : 0,
          list: res.rows
        }
      });
    });
  };

  // 获取列表信息
  const getBoxList = () => {
    let httpData = {
      holder: address,
    };
    accountBlindBoxInfoApi(httpData).then((res: any) => {
      setBoxData(previousState => {
        return {
          ...previousState,
          angleCount: res.total ? res.total : 0,
          list: res.rows
        }
      });
    });
  };

  // 英雄详情
  const gotoHeroDetails = (e: any, ind: number) => {
    console.log('详情：', e)
    navigate("/main/wallet/heroDetails", {
      state: {
        number: e.number,
      }
    });
  };

  // 英雄详情
  const gotoGemDetails = (e: any, ind: number) => {
    console.log('详情：', e)
    navigate("/main/wallet/gemDetails", {
      state: {
        number: e.number,
      }
    });
  };

  // 点击开启盲盒按钮（hero英雄）
  async function openNowHeroBoxFun(item: any, index: number) {
    setRequestTokenID(item.heroId);
    showFullScreenLoading('Proceeding');
    setOpenHeroBoxBtnLoading(true);//将开盲盒状态更改为正在开启中...
    try {
      //开盲盒方法，参数为购买盲盒时的tokenid
      let openhero = await sdk.HeroLogic.openHero(item.heroId);
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
        getBoxList();
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
      tryHideFullScreenLoading();
      setOpenHeroBoxBtnLoading(false);//改回待开启，以免下次使用时异常
    }
  }

  // 关闭盲盒开启成功弹窗
  const closeModelTab = () => {
    setOpenHeroSuccessModel(false);
    chooseNFTCLASS(0);
  };

  return (
    <>
      <div className="nft_container">
        <div className="main_wrap">
          <div className="content_tit_sel">
            {activeTab === 0 ? (<span className="count">{heroData.angleCount} Heroes</span>) : null}
            {activeTab === 1 ? (<span className="count">{gemsData.angleCount} Gems</span>) : null}
            {activeTab === 2 ? (<span className="count">{boxData.angleCount} Boxs</span>) : null}
            <div className="select_tabs_wrap">
              {activeTab === 0 ? (
                <div className="select_box">
                  <div className="select_txt" onClick={() => setShowHeroOrderType(!showHeroOrderType)}>
                    <span>{heroOrderTypeLabel}</span>
                    {showHeroOrderType ? (<img src={getAssetsFile('images/market/icon_more_use@2x.png')} className="down_icon1" />) : (<img src={getAssetsFile('images/market/icon_more_use@2x.png')} className="down_icon2" />)}
                  </div>
                  {
                    showHeroOrderType ? (
                      <ul className="select_list" onMouseLeave={() => setShowHeroOrderType(false)}>
                        {
                          heroOrderTypeList.map((item: any, index: number) => {
                            return (<li key={item.key} onClick={() => changeHeroOrderTypeFun(item)} className={[heroOrderType == item.value ? "active" : null].join(' ')}>{item.label}</li>)
                          })
                        }
                      </ul>
                    ) : null
                  }
                </div>) : null
              }
              {activeTab === 1 ? (
                <div className="select_box">
                  <div className="select_txt" onClick={() => setShowGemsOrderType(!showGemsOrderType)}>
                    <span>{gemsOrderTypeLabel}</span>
                    {showGemsOrderType ? (<img src={getAssetsFile('images/market/icon_more_use@2x.png')} className="down_icon1" />) : (<img src={getAssetsFile('images/market/icon_more_use@2x.png')} className="down_icon2" />)}
                  </div>
                  {
                    showGemsOrderType ? (
                      <ul className="select_list" onMouseLeave={() => setShowGemsOrderType(false)}>
                        {
                          gemsOrderTypeList.map((item: any, index: number) => {
                            return (<li key={item.key} onClick={() => changeGemsOrderTypeFun(item)} className={[gemsOrderType == item.value ? "active" : null].join(' ')}>{item.label}</li>)
                          })
                        }
                      </ul>
                    ) : null
                  }
                </div>) : null
              }
              <div className="tablist">
                {
                  tabsList.map((item: any, index: number) => {
                    return <div key={index} onClick={() => chooseNFTCLASS(index)} className={[activeTab == index ? "active" : null, 'tab_item'].join(' ')}>
                      <img src={activeTab == index ? item.icon2 : item.icon1} />
                      <p>{item.name}</p>
                    </div>
                  })
                }
              </div>
            </div>
          </div>
          <div className="content_list_wrap">
            {
              activeTab === 0 ? (
                <>
                  {
                    heroData.list.length !== 0 ? (
                      <div className="hero_box">
                        {
                          heroData.list.map((item: any, index: number) => {
                            return (
                              <div key={index} onClick={() => gotoHeroDetails(item, index)} className="card_item_wrap">
                                <div className="top_box">
                                  <div className="image_info">
                                    {item.job == 1 ? (<img src={getAssetsFile('images/dashboard/zhiye_1@2x.png')} className='zhiye' />) : null}
                                    {item.job == 2 ? (<img src={getAssetsFile('images/dashboard/zhiye_2@2x.png')} className='zhiye' />) : null}
                                    {item.job == 3 ? (<img src={getAssetsFile('images/dashboard/zhiye_3@2x.png')} className='zhiye' />) : null}
                                    <div className="hero_img_wrap">
                                      <img src={getAssetsFile(`images/heroes/${item.image}.png`)} />
                                    </div>
                                  </div>
                                  <div className={["arc_info", item.rarity == 1 ? "bgcN" : item.rarity == 2 ? "bgcR" : item.rarity == 3 ? "bgcSR" : item.rarity == 4 ? "bgcSSR" : item.rarity == 5 ? "bgcUR" : item.rarity == 6 ? "bgcEXR" : ''].join(' ')}>
                                    <div className="left_info">
                                      <p className="name">{item.name} #{item.number}</p>
                                      <Stars stars={item.stars} />
                                    </div>
                                    <div className="right_info">
                                      {item.rarity == 1 ? (<img src={getAssetsFile('images/dashboard/pinzhi_n@2x.png')} className='zhiye' />) : null}
                                      {item.rarity == 2 ? (<img src={getAssetsFile('images/dashboard/pinzhi_r@2x.png')} className='zhiye' />) : null}
                                      {item.rarity == 3 ? (<img src={getAssetsFile('images/dashboard/pinzhi_sr@2x.png')} className='zhiye' />) : null}
                                      {item.rarity == 4 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ssr@2x.png')} className='zhiye' />) : null}
                                      {item.rarity == 5 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ur@2x.png')} className='zhiye' />) : null}
                                      {item.rarity == 6 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='zhiye' />) : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="bot_box">
                                  <p className="tit">Current price</p>
                                  {
                                    item.tradingStatus && item.tradingStatus == '0' ? (<div className="price">
                                      <div className="bnb_price">
                                        <img src={getAssetsFile('images/public/logo_bnb@2x.png')} />
                                        <p className="num">{item.price}</p>
                                      </div>
                                      <p className="meiyuan">≈ ${percentMoney((Number(exchangeRate) * Number(item.price)), 4)}</p>
                                    </div>) : (<div className="noprice">Not listed</div>)
                                  }
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>) : (<div className="noData">
                        <img src={getAssetsFile("images/public/nodata@2x.png")} />
                        <p>No Data</p>
                      </div>)
                  }
                </>
              ) : null
            }
            {
              activeTab === 1 ? (
                <>
                  {
                    gemsData.list.length !== 0 ? (
                      <div className="gem_box">
                        {
                          gemsData.list.map((item: any, index: number) => {
                            return (
                              <div key={index} onClick={() => gotoGemDetails(item, index)} className="card_item_wrap">
                                <div className="top_box">
                                  <div className="image_info">
                                    <div className="first-row">
                                      {item.type == 1 ? (<p className="colortype bgc1">Red</p>) : null}
                                      {item.type == 2 ? (<p className="colortype bgc2">Yellow</p>) : null}
                                      {item.type == 3 ? (<p className="colortype bgc3">Blue</p>) : null}
                                      {item.type == 4 ? (<p className="colortype bgc4">Green</p>) : null}
                                      {item.type == 5 ? (<p className="colortype bgc5">Purple</p>) : null}
                                      <p className="grade">LV.{item.grade}</p>
                                    </div>
                                    <div className="hero_img_wrap">
                                      <img src={getAssetsFile(`images/gems/${item.image}.png`)} />
                                    </div>
                                  </div>
                                  <div className={["arc_info", item.rarity == 1 ? "bgcN" : item.rarity == 2 ? "bgcR" : item.rarity == 3 ? "bgcSR" : item.rarity == 4 ? "bgcSSR" : item.rarity == 5 ? "bgcUR" : item.rarity == 6 ? "bgcEXR" : item.rarity == 7 ? "bgcEXR" : item.rarity == 8 ? "bgcEXR" : item.rarity == 9 ? "bgcEXR" : ''].join(' ')}>
                                    <div className="left_info">
                                      <p className="name">{interceptAfter5(item.name)} #{item.number}</p>
                                    </div>
                                    <div className="right_info">
                                      {item.rarity == 1 ? (<img src={getAssetsFile('images/dashboard/pinzhi_n@2x.png')} className='zhiye' />) : null}
                                      {item.rarity == 2 ? (<img src={getAssetsFile('images/dashboard/pinzhi_r@2x.png')} className='zhiye' />) : null}
                                      {item.rarity == 3 ? (<img src={getAssetsFile('images/dashboard/pinzhi_sr@2x.png')} className='zhiye' />) : null}
                                      {item.rarity == 4 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ssr@2x.png')} className='zhiye' />) : null}
                                      {item.rarity == 5 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ur@2x.png')} className='zhiye' />) : null}
                                      {item.rarity == 6 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='zhiye' />) : null}
                                      {item.rarity == 7 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='zhiye' />) : null}
                                      {item.rarity == 8 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='zhiye' />) : null}
                                      {item.rarity == 9 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='zhiye' />) : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="bot_box">
                                  <p className="tit">Current price</p>
                                  {
                                    item.tradingStatus && item.tradingStatus == '0' ? (<div className="price">
                                      <div className="bnb_price">
                                        <img src={getAssetsFile('images/public/logo_bnb@2x.png')} />
                                        <p className="num">{item.price}</p>
                                      </div>
                                      <p className="meiyuan">≈ ${percentMoney((Number(exchangeRate) * Number(item.price)), 4)}</p>
                                    </div>) : (<div className="noprice">Not listed</div>)
                                  }
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>) : (<div className="noData">
                        <img src={getAssetsFile("images/public/nodata@2x.png")} />
                        <p>No Data</p>
                      </div>)
                  }
                </>
              ) : null
            }
            {
              activeTab === 2 ? (
                <>
                  {
                    boxData.list.length !== 0 ? (
                      <div className="bindbox_box">
                        {
                          boxData.list.map((item: any, index: number) => {
                            return (
                              <div key={index} className={["card_item_wrap", item.qualityType == 0 ? "card_item_bgi1" : item.qualityType == 1 ? "card_item_bgi2" : item.qualityType == 2 ? "card_item_bgi3" : ''].join(' ')}>
                                <div className="title_wrap">
                                  {item.qualityType == 0 ? (<img src={getAssetsFile('images/presale/td-01@2x.png')} className='tit' />) : null}
                                  {item.qualityType == 1 ? (<img src={getAssetsFile('images/presale/td-02@2x.png')} className='tit' />) : null}
                                  {item.qualityType == 2 ? (<img src={getAssetsFile('images/presale/td-03@2x.png')} className='tit' />) : null}
                                  <div className="boxid">#{item.heroId}</div>
                                </div>
                                <div className='boximg'>
                                  {item.qualityType == 0 ? (<img src={getAssetsFile('images/presale/blindbox1@2x.png')} />) : null}
                                  {item.qualityType == 1 ? (<img src={getAssetsFile('images/presale/blindbox2@2x.png')} />) : null}
                                  {item.qualityType == 2 ? (<img src={getAssetsFile('images/presale/blindbox3@2x.png')} />) : null}
                                </div>
                                <div className="btn_wrap">
                                  <Button onClick={() => openNowHeroBoxFun(item, index)} loading={requestTokenID == item.heroId ? openHeroBoxBtnLoading : false} disabled={requestTokenID != item.boxId ? openHeroBoxBtnLoading : false} className={["btn", item.qualityType == 0 ? "btn1" : item.qualityType == 1 ? "btn2" : item.qualityType == 2 ? "btn3" : ''].join(' ')} type="primary">Open Now</Button>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>) : (<div className="noData">
                        <img src={getAssetsFile("images/public/nodata@2x.png")} />
                        <p>No Data</p>
                      </div>)
                  }
                </>
              ) : null
            }
          </div>
        </div >
      </div >
      {/* hero开启成功 */}
      <Modal centered open={openHeroSuccessModel} onCancel={() => setOpenHeroSuccessModel(false)} closable={false} footer={null} className="model-model-nft-heroes">
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
            <Button onClick={() => closeModelTab()} className="btn">Click to Reveal</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Nft);
