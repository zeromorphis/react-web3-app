/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-22 10:41:53
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-21 09:55:34
 */
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Popup } from 'antd-mobile';
import { Input, Slider } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import { SearchOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { interceptStr, interceptDecimal, percentMoney, moneyFormat, onlyPositiveInteger, getAssetsFile, interceptAfter5 } from "@/utils/common";
import { getGemListApi } from "@/api/modules/market";
import "./index.less";

const MarketGems = (props: any) => {
  const { user, global } = props;
  const { exchangeRate } = global;
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<number>(1);
  const marketList = [
    {
      icon1: getAssetsFile('images/market/icon_nft@2x.png'),
      icon2: getAssetsFile('images/market/icon_nft2@2x.png'),
      show: activeTab,
      name: 'HEROES',
      url: '/main/marketplace/heroes'
    },
    {
      icon1: getAssetsFile('images/market/icon_gems@2x.png'),
      icon2: getAssetsFile('images/market/icon_gems2@2x.png'),
      show: activeTab,
      name: 'GEMS',
      url: '/main/marketplace/gems'
    }
  ];

  const chooseMenu = (item: any, index: number) => {
    console.log('chooseMenu:', item, index);
    setActiveTab(index)
    navigate(item.url)
  };

  useEffect(() => {
    switch (location.pathname) {
      case '/main/marketplace/heroes':
        setActiveTab(0)
        break;
      case '/main/marketplace/heroDetails':
        setActiveTab(0)
        break;
      case '/main/marketplace/gems':
        setActiveTab(1)
        break;
      case '/main/marketplace/gemDetails':
        setActiveTab(1)
        break;
    }
  }, [location.pathname]);

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [classList, setClassList] = useState([
    {
      check: false,
      name: "Red",
      value: '1',
      bgcolor: "linear-gradient(307deg, #F03434 0%, #FF6060 100%)"
    },
    {
      check: false,
      name: "Yellow",
      value: '2',
      bgcolor: "linear-gradient(307deg, #FFDE59 0%, #FFBC14 100%)"
    },
    {
      check: false,
      name: "Blue",
      value: '3',
      bgcolor: "linear-gradient(128deg, #2475C7 0%, #3A8FD8 100%)"
    },
    {
      check: false,
      name: "Green",
      value: '4',
      bgcolor: "linear-gradient(307deg, #79D83A 0%, #49C724 100%)"
    },
    {
      check: false,
      name: "Purple",
      value: '5',
      bgcolor: "linear-gradient(307deg, #E68DB9 0%, #CE74AF 100%)"
    },
  ]);
  const paritiesMarks: SliderMarks = {
    0: {
      style: {
        color: "#FFFFFF",
      },
      label: <strong>All</strong>,
    },
    1: {
      style: {
        color: "#CECECE",
      },
      label: <strong>N</strong>,
    },
    2: {
      style: {
        color: "#00FFCE",

      },
      label: <strong>R</strong>,
    },
    3: {
      style: {
        color: "#4671FF",
      },
      label: <strong>SR</strong>,
    },
    4: {
      style: {
        color: "#BB3BFF",
      },
      label: <strong>SSR</strong>,
    },
    5: {
      style: {
        color: "#FFB100",
      },
      label: <strong>UR</strong>,
    },
    6: {
      style: {
        color: "#FF0000",
      },
      label: <strong>EXR</strong>,
    },
  };
  const gradeMarks: SliderMarks = {
    0: {
      style: {
        color: "#FFFFFF",
      },
      label: <strong>All</strong>,
    },
    1: {
      style: {
        color: "#FFFFFF",
      },
      label: <strong>1</strong>,
    },
    2: {
      style: {
        color: "#FFFFFF",
      },
      label: <strong>2</strong>,
    },
    3: {
      style: {
        color: "#FFFFFF",
      },
      label: <strong>3</strong>,
    },
    4: {
      style: {
        color: "#FFFFFF",
      },
      label: <strong>4</strong>,
    },
    5: {
      style: {
        color: "#FFFFFF",
      },
      label: <strong>5</strong>,
    },
    6: {
      style: {
        color: "#FFFFFF",
      },
      label: <strong>6</strong>,
    },
    7: {
      style: {
        color: "#FFFFFF",
      },
      label: <strong>7</strong>,
    },
    8: {
      style: {
        color: "#FFFFFF",
      },
      label: <strong>8</strong>,
    },
    9: {
      style: {
        color: "#FFFFFF",
      },
      label: <strong>9</strong>,
    },
  };

  // 表单数据(请求列表时参数)
  const [httpData, setHttpData] = useState({
    number: '',/** 宝石编号 */
    type: null,/** 宝石类型（1红，2黄，3蓝，4绿，5紫） */
    rarity: 0,/** 品质（1N，2R，3SR，4SSR, 5UR, 6EXR） */
    grade: 0,/** 等级（1~9）*/
    orderType: 0,/** 排序规则（0 上架时间 1 价格有底到高 2 价格有高到底 ） */
    pageNum: 1,
    pageSize: 10,
  });
  interface pageData {
    angleCount: number;//当前数量
    pages: number;//共几页
    gemList: object[];//页面List列表
  }
  const [pageData, setPageData] = useState<pageData>({
    angleCount: 0, // 数据总数
    pages: 0, // 数据总页数(查询接口可得total)
    gemList: [], // 数据列表
  })
  // 获取列表信息
  const getListFun = () => {
    let data = {
      number: httpData.number == '' ? null : httpData.number,
      type: httpData.type,
      rarity: httpData.rarity == 0 ? null : httpData.rarity,
      grade: httpData.grade == 0 ? null : httpData.grade,
      orderType: httpData.orderType,
      pageNum: httpData.pageNum,
      pageSize: httpData.pageSize,
    };
    getGemListApi(data).then((res: any) => {
      let gemList: object[] = new Array();
      res.rows.forEach((item: any, index: number) => {
        item.dollar = (Number(item.price) * Number(exchangeRate)).toFixed(20);
        gemList.push(item);
      });
      setPageData(previousState => {
        return {
          ...previousState,
          angleCount: res.total ? res.total : 0,
          pages: Math.ceil(parseInt(res.total, httpData.pageSize) / httpData.pageSize),
          gemList: gemList
        }
      });
    });
  };
  // 列表参数变化更新
  useEffect(() => {
    getListFun()
  }, [httpData])

  // 监听输入框是否为数字，不能为非法字符
  useEffect(() => {
    setHttpData(previousState => {
      return {
        ...previousState,
        number: onlyPositiveInteger(String(httpData.number)),
      }
    });
  }, [httpData.number])

  // <--- class筛选--开始 --->
  const selectClassFun = async (item: any, index: number) => {
    classList.forEach((d: any) => {
      d.check = false;
    });
    if (classList[index].check == false) {
      classList[index].check = true;
    } else {
      // 用户无权切换选中与否
      classList[index].check = true;
    }
    setClassList(classList)
    setHttpData(previousState => {
      return {
        ...previousState,
        type: item.value
      }
    });
  };
  // <--- class筛选--结束 --->

  // 清除所有筛选条件
  const clearAllConditionFun = () => {
    setHttpData(previousState => {
      return {
        ...previousState,
        number: '',
        type: null,
        rarity: 0,
        grade: 0,
        orderType: 0,
        pageNum: 1,
        pageSize: 10,
      }
    });
    classList.forEach((d: any) => {
      d.check = false;
    });
    setShowOrderType(false);
    setOrderTypeLabel(orderTypeList[0].label);
    setClassList(classList);
  };

  const orderTypeList = [
    {
      value: 0,
      key: 0,
      label: "Latest Sale",
    },
    {
      value: 1,
      key: 1,
      label: "Lowest Price",
    },
    {
      value: 2,
      key: 2,
      label: "Highest Price",
    },
  ]
  // <--- showOrderType筛选--开始 --->
  const [showOrderType, setShowOrderType] = useState<boolean>(false);
  const [orderTypeLabel, setOrderTypeLabel] = useState<string>(orderTypeList[0].label);
  const changeOrderTypeFun = (e: any) => {
    setShowOrderType(false)
    setOrderTypeLabel(e.label)
    setHttpData(previousState => {
      return {
        ...previousState,
        orderType: e.value
      }
    });
  };
  // <--- showOrderType筛选--结束 --->

  //上一页筛选
  const lastpageFun = () => {
    if (Number(httpData.pageNum) > 1) {
      setHttpData(previousState => {
        return {
          ...previousState,
          pageNum: Number(httpData.pageNum) - 1
        }
      });
    }
  };
  // 监听数据变化
  useEffect(() => {
    setHttpData(previousState => {
      return {
        ...previousState,
        pageNum: onlyPositiveInteger(String(httpData.pageNum))
      }
    });
  }, [httpData.pageNum])
  // 输入框手动更改时筛选
  const changeNumFun = (e: any) => {
    console.log(e.target.value)
    let page = Math.ceil(pageData.angleCount / httpData.pageSize);
    if (Number(e.target.value) > Number(page)) {
      setHttpData(previousState => {
        return {
          ...previousState,
          pageNum: page
        }
      });
      return
    }
    if (e.target.value == '') {
      setHttpData(previousState => {
        return {
          ...previousState,
          pageNum: e.target.value
        }
      });
      return
    }
    if (Number(e.target.value) < 1) {
      setHttpData(previousState => {
        return {
          ...previousState,
          pageNum: 1
        }
      });
      return
    }
    setHttpData(previousState => {
      return {
        ...previousState,
        pageNum: e.target.value
      }
    });
  };
  // 下一页筛选
  const nextpageFun = () => {
    let page = Math.ceil(pageData.angleCount / httpData.pageSize);
    if (Number(httpData.pageNum) < Number(page)) {
      setHttpData(previousState => {
        return {
          ...previousState,
          pageNum: Number(httpData.pageNum) + 1
        }
      });
    }
  };

  // 英雄详情
  const gotoHeroDetails = (e: any, ind: number) => {
    navigate("/main/marketplace/gemDetails", {
      state: {
        address: e.address,
        number: e.number,
      }
    });
  };

  return (
    <div className="marketGems_container">
      <div className="main_wrap">
        <div className="market_menu">
          <div className="filter_menu">
            <ul className="market_menu_box">
              {
                marketList.map((item: any, index: number) => {
                  return <li key={index} onClick={() => chooseMenu(item, index)} className={[activeTab == index ? "active" : null].join(' ')}>
                    <img src={activeTab == index ? item.icon2 : item.icon1} />
                    <p>{item.name}</p>
                  </li>
                })
              }
            </ul>
            <img onClick={() => setShowFilter(true)} src={getAssetsFile('images/wap/icon_filter@2x.png')} className='filter' />
          </div>
          <div className="bottom_line" />
        </div>
        <div className="content_box">
          <div className="content_tit_sel">
            <span className="count">{pageData.angleCount} Gems</span>
            <div className="select_box">
              <div className="select_txt" onClick={() => setShowOrderType(!showOrderType)}>
                <span>{orderTypeLabel}</span>
                {showOrderType ? (<img src={getAssetsFile('images/market/icon_more_use@2x.png')} className="down_icon1" />) : (<img src={getAssetsFile('images/market/icon_more_use@2x.png')} className="down_icon2" />)}
              </div>
              {
                showOrderType ? (
                  <ul className="select_list" onMouseLeave={() => setShowOrderType(false)}>
                    {
                      orderTypeList.map((item: any, index: number) => {
                        return (<li key={item.key} onClick={() => changeOrderTypeFun(item)} className={[httpData.orderType == item.value ? "active" : null].join(' ')}>{item.label}</li>)
                      })
                    }
                  </ul>
                ) : null
              }
            </div>
          </div>
          <div className="content_list_wrap">
            {
              pageData.gemList.length !== 0 ? (
                <div className="hero_box">
                  {
                    pageData.gemList.map((item: any, index: number) => {
                      return (
                        <div key={index} onClick={() => gotoHeroDetails(item, index)} className="card_item_wrap">
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
                                {item.rarity == 1 ? (<img src={getAssetsFile('images/dashboard/pinzhi_n@2x.png')} className='pinzhi' />) : null}
                                {item.rarity == 2 ? (<img src={getAssetsFile('images/dashboard/pinzhi_r@2x.png')} className='pinzhi' />) : null}
                                {item.rarity == 3 ? (<img src={getAssetsFile('images/dashboard/pinzhi_sr@2x.png')} className='pinzhi' />) : null}
                                {item.rarity == 4 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ssr@2x.png')} className='pinzhi' />) : null}
                                {item.rarity == 5 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ur@2x.png')} className='pinzhi' />) : null}
                                {item.rarity == 6 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='pinzhi' />) : null}
                                {item.rarity == 7 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='pinzhi' />) : null}
                                {item.rarity == 8 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='pinzhi' />) : null}
                                {item.rarity == 9 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='pinzhi' />) : null}
                              </div>
                            </div>
                          </div>
                          <div className="bot_box">
                            <p className="tit">Current price</p>
                            <div className="price">
                              <div className="bnb_price">
                                <img src={getAssetsFile('images/public/logo_bnb@2x.png')} />
                                <p className="num">{item.price}</p>
                              </div>
                              <p className="meiyuan">≈ ${percentMoney((Number(exchangeRate) * Number(item.price)), 4)}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>) : (
                <div className="noData">
                  <img src={getAssetsFile("images/public/nodata@2x.png")} />
                  <p>No Data</p>
                </div>
              )
            }
          </div>
          {
            pageData.gemList.length !== 0 ? (
              <div className="pageation_wrap">
                <div className="pageation">
                  <div className="lastpage" onClick={() => lastpageFun()}>
                    <CaretLeftOutlined className="icon" />
                  </div>
                  <Input defaultValue={httpData.pageNum} value={httpData.pageNum} onChange={(e) => changeNumFun(e)} onBlur={(e) => {
                    setHttpData(previousState => {
                      return {
                        ...previousState,
                        pageNum: 1
                      }
                    });
                  }} className="page" />
                  <div className="allpages">of {pageData.pages}</div>
                  <div className="nextpage" onClick={() => nextpageFun()}>
                    <CaretRightOutlined className="icon" />
                  </div>
                </div>
              </div>
            ) : null
          }
        </div>
      </div >
      <Popup
        visible={showFilter}
        onMaskClick={() => {
          setShowFilter(false)
        }}
        className="filter_popup_gems"
        bodyClassName="filter_popup_body"
        position='right'
        bodyStyle={{ width: '70vw' }}
      >
        <div className="filter_popup_box">
          <div className="first_tit">
            <span>Filter</span>
            <span onClick={() => clearAllConditionFun()}>Clear</span>
          </div>
          <div className="filter_list_wrap">
            <div className="filter_list">
              <div className="search_input_item">
                <div className="input_wrap">
                  <Input defaultValue={httpData.number} value={httpData.number} onChange={(e) => {
                    setHttpData(previousState => {
                      return {
                        ...previousState,
                        number: e.target.value,
                      }
                    });
                  }} placeholder="Search by NFT ID" className="idty" />
                  <SearchOutlined className="search_icon" />
                </div>
                <div className="class_wrap">
                  <div className="title">
                    <span className="tit">CLASS</span>
                  </div>
                  <div className="filter_item_tiaojian">
                    <ul>
                      {
                        classList.map((item: any, index: number) => {
                          return <li key={index}>
                            <div className="check_wrap" onClick={() => selectClassFun(item, index)}>
                              {item.check ? (<img src={getAssetsFile('images/market/icon_fliter_sele@2x.png')} className="checked_img" />) : (<div className="checked_box" />)}
                            </div>
                            <span className="text" style={{ background: item.bgcolor }}>{item.name}</span>
                          </li>
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div>
              <div className="slider_item">
                <div className="slider_wrap">
                  <div className="title">
                    <span className="tit">PARITIES</span>
                  </div>
                  <div className="filter_item_tiaojian">
                    <Slider defaultValue={httpData.rarity} value={httpData.rarity} onChange={(e) => {
                      setHttpData(previousState => {
                        return {
                          ...previousState,
                          rarity: e,
                        }
                      });
                    }} marks={paritiesMarks} max={6} />
                  </div>
                </div>
              </div>
              <div className="slider_item">
                <div className="slider_wrap">
                  <div className="title">
                    <span className="tit">GRADE</span>
                  </div>
                  <div className="filter_item_tiaojian">
                    <Slider defaultValue={httpData.grade} value={httpData.grade} onChange={(e) => {
                      setHttpData(previousState => {
                        return {
                          ...previousState,
                          grade: e,
                        }
                      });
                    }} marks={gradeMarks} max={9} />
                  </div>
                </div>
              </div>
            </div>
            <div className="btn_wrap">
              <div className="btn btn1" onClick={() => setShowFilter(false)}>Cancle</div>
              <div className="btn btn2" onClick={() => setShowFilter(false)}>OK</div>
            </div>
          </div>
        </div >
      </Popup >
    </div >
  );
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(MarketGems);
