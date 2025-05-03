/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-22 10:41:53
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-18 15:17:04
 */
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Slider } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import { SearchOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import Stars from "@/components/web/Stars";
import { interceptStr, interceptDecimal, percentMoney, moneyFormat, onlyPositiveInteger, getAssetsFile } from "@/utils/common";
import { getHeroListApi } from "@/api/modules/market";
import "./index.less";

const Marketheroes = (props: any) => {
  const { user, global } = props;
  const { exchangeRate } = global;
  const navigate = useNavigate();
  const [classList, setClassList] = useState([
    {
      check: false,
      name: "Mage",
      icon: getAssetsFile('images/dashboard/zhiye_1@2x.png'),
      value: '1',
    },
    {
      check: false,
      name: "Ranger",
      icon: getAssetsFile('images/dashboard/zhiye_2@2x.png'),
      value: '2',
    },
    {
      check: false,
      name: "Warrior",
      icon: getAssetsFile('images/dashboard/zhiye_3@2x.png'),
      value: '3',
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
  const starMarks: SliderMarks = {
    0: {
      style: {
        color: "#FFFFFF",
      },
      label: <strong>0</strong>,
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
      label: <strong>All</strong>,
    },
  };
  const [statusList, setStatusList] = useState([
    {
      check: true,
      name: "For Sale",
      value: 0
    },
    {
      check: false,
      name: "Not For Sale",
      value: 1
    },
  ]);
  // 表单数据(请求列表时参数)
  const [httpData, setHttpData] = useState({
    number: '',/** 英雄编号 */
    rarity: 0,/** 品质（1N，2R，3SR，4SSR, 5UR, 6EXR） */
    job: null,/** 职业（1坦克、2战士、3射手） */
    stars: 6,/** 星级（0~5）6表示All */
    addedType: 0,
    orderType: 0,/** 排序规则（0 上架时间 1 价格有底到高 2 价格有高到底 ） */
    pageNum: 1,
    pageSize: 10,
  });
  interface pageData {
    angleCount: number;//当前数量
    pages: number;//共几页
    heroList: object[];//页面List列表
  }
  const [pageData, setPageData] = useState<pageData>({
    angleCount: 0, // 数据总数
    pages: 0, // 数据总页数(查询接口可得total)
    heroList: [], // 数据列表
  })
  // 获取列表信息
  const getListFun = () => {
    let data = {
      number: httpData.number == '' ? null : httpData.number,
      job: httpData.job,
      rarity: httpData.rarity == 0 ? null : httpData.rarity,
      stars: httpData.stars == 6 ? null : httpData.stars,
      // addedType: httpData.addedType,
      orderType: httpData.orderType,
      pageNum: httpData.pageNum,
      pageSize: httpData.pageSize,
    };
    getHeroListApi(data).then((res: any) => {
      let heroList: object[] = new Array();
      res.rows.forEach((item: any, index: number) => {
        item.dollar = (Number(item.price) * Number(exchangeRate)).toFixed(20);
        heroList.push(item);
      });
      setPageData(previousState => {
        return {
          ...previousState,
          angleCount: res.total ? res.total : 0,
          pages: Math.ceil(parseInt(res.total, httpData.pageSize) / httpData.pageSize),
          heroList: heroList
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
        job: item.value
      }
    });
  };
  // <--- class筛选--结束 --->
  // <--- status筛选--开始 --->
  const selectStatus = async (item: any, index: number) => {
    statusList.forEach((d: any) => {
      d.check = false;
    });
    if (statusList[index].check == false) {
      statusList[index].check = true;
    } else {
      // 用户无权切换选中与否
      statusList[index].check = true;
    }
    setHttpData(previousState => {
      return {
        ...previousState,
        addedType: item.value
      }
    });
  };
  // <--- status筛选--结束 --->

  // 清除所有筛选条件
  const clearAllConditionFun = () => {
    setHttpData(previousState => {
      return {
        ...previousState,
        number: '',
        rarity: 0,
        job: null,
        stars: 6,
        // addedType: 0,
        orderType: 0,
        pageNum: 1,
        pageSize: 10,
      }
    });
    classList.forEach((d: any) => {
      d.check = false;
    });
    setOrderTypeLabel(orderTypeList[0].label)
    setClassList(classList)
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
    navigate("/main/marketplace/heroDetails", {
      state: {
        address: e.address,
        number: e.number,
      }
    });
  };

  return (
    <div className="marketHeroes_container">
      <div className="main_wrap">
        <div className="menu_box">
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
                            <img src={item.icon} className="icon" />
                            <span className="text">{item.name}</span>
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
                    <span className="tit">STAR</span>
                  </div>
                  <div className="filter_item_tiaojian">
                    <Slider defaultValue={httpData.stars} value={httpData.stars} onChange={(e) => {
                      setHttpData(previousState => {
                        return {
                          ...previousState,
                          stars: e,
                        }
                      });
                    }} marks={starMarks} max={6} />
                  </div>
                </div>
              </div>
              {/* <div className="status_item">
                <div className="status_wrap">
                  <div className="title">
                    <span className="tit">STATUS</span>
                  </div>
                  <div className="filter_item_tiaojian">
                    <ul>
                      {
                        statusList.map((item: any, index: number) => {
                          return <li key={index}>
                            <div className="check_wrap" onClick={() => selectStatus(item, index)}>
                              {item.check ? (<img src={getAssetsFile('images/market/icon_fliter_sele@2x.png')} className="checked_img" />) : (<div className="checked_box" />)}
                            </div>
                            <span className="text">{item.name}</span>
                          </li>
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div >
        <div className="content_box">
          <div className="content_tit_sel">
            <span className="count">{pageData.angleCount} Heroes</span>
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
              pageData.heroList.length !== 0 ? (
                <div className="hero_box">
                  {
                    pageData.heroList.map((item: any, index: number) => {
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
                </div>) : (<div className="noData">
                  <img src={getAssetsFile("images/public/nodata@2x.png")} />
                  <p>No Data</p>
                </div>)
            }
          </div>
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
        </div>
      </div >
    </div >
  );
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Marketheroes);
