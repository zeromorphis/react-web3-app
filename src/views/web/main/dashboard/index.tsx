/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-22 10:41:53
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-26 10:43:55
 */
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { interceptStr, interceptDecimal, percentMoney, moneyFormat, getAssetsFile } from "@/utils/common";
import { getHeroSalesApi, getHeroListApi } from "@/api/modules/market";
import Stars from "@/components/web/Stars";
// images
import icon_sale from "@/assets/images/dashboard/icon_sale@2x.png";
import icon_volume from "@/assets/images/dashboard/icon_volume@2x.png";
import icon_price from "@/assets/images/dashboard/icon_price@2x.png";
import zhiye_1 from "@/assets/images/dashboard/zhiye_1@2x.png";
import zhiye_2 from "@/assets/images/dashboard/zhiye_2@2x.png";
import zhiye_3 from "@/assets/images/dashboard/zhiye_3@2x.png";

import "./index.less";

const Dashboard = (props: any) => {
  const { user, global } = props;
  const { exchangeRate } = global;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [heroSales, setHeroSales] = useState({
    sales: 0,
    volume: 0,
    topPrice: 0,
  });
  const [heroList, setHeroList] = useState([
    {
      rarity: '1',
      image: 'images/dashboard/12002@2x.png',
      stars: 4,
      job: 1,
      name: "Hero #0084",
      price: '0.128'
    },
    {
      rarity: '5',
      image: 'images/dashboard/13015@2x.png',
      stars: 2,
      job: 2,
      name: "Hero #0084",
      price: '0.128'
    },
    {
      rarity: '2',
      image: 'images/dashboard/23003@2x.png',
      stars: 1,
      job: 2,
      name: "Hero #0084",
      price: '0.128'
    },
    {
      rarity: '3',
      image: 'images/dashboard/13012@2x.png',
      stars: 5,
      job: 2,
      name: "Hero #0084",
      price: '0.128'
    }
  ]);
  const [endList, setEndList] = useState([]);

  // 列表参数变化更新
  useEffect(() => {
    console.log('activeTab更新了', activeTab)
    getHeroSales(); // 初始化仪表盘信息
  }, [activeTab])
  // 仪表盘信息
  const getHeroSales = () => {
    getHeroSalesApi({ type: activeTab }).then((res: any) => {
      console.log(res, "仪表盘信息res");
      setHeroSales(res.data);
      setEndList(res.data.list);
    });
  };

  useEffect(() => {
    console.log('只需加载一次')
    getHeroList(); // 初始化英雄列表
  }, [])
  // 获取列表信息
  const getHeroList = async () => {
    let params = {
      pageNum: 1,
      pageSize: 4,
      orderType: "0",
    };
    getHeroListApi(params).then((res: any) => {
      console.log(res, "getHeroList");
      setHeroList(res.rows)
    });
  };

  // 跳转至市场
  const gotoMoreMarket = () => {
    navigate("/main/marketplace/heroes")
  };

  return (
    <div className="dashboard_container">
      <div className="main_wrap">
        <div className="num_list">
          <ul className="title_box">
            <li className={[activeTab === 0 ? "active" : null].join(' ')} onClick={() => setActiveTab(0)}>Total</li>
            <li className={[activeTab === 1 ? "active" : null].join(' ')} onClick={() => setActiveTab(1)}>Last 24h</li>
            <li className={[activeTab === 2 ? "active" : null].join(' ')} onClick={() => setActiveTab(2)}>7 days</li>
            <li className={[activeTab === 3 ? "active" : null].join(' ')} onClick={() => setActiveTab(3)}>30 days</li>
          </ul>
          <ul className="content_box">
            <li>
              <div className="img_wrap">
                <img src={icon_sale} />
              </div>
              <div className="right_txt">
                <p>Total Sale</p>
                <p>{heroSales ? heroSales.sales : 0}</p>
              </div>
            </li>
            <li>
              <div className="img_wrap">
                <img src={icon_volume} className="hero_icon" />
              </div>
              <div className="right_txt">
                <p>Total Volume (BNB)</p>
                <p>
                  {heroSales ? heroSales.volume : 0}
                  <span>≈ $ {heroSales ? percentMoney((Number(exchangeRate) * Number(heroSales.volume)), 4) : 0} </span>
                </p>
              </div>
            </li>
            <li>
              <div className="img_wrap">
                <img src={icon_price} />
              </div>
              <div className="right_txt">
                <p>Hightest Price (BNB)</p>
                <p>
                  {heroSales ? heroSales.topPrice : 0}
                  <span>≈ ${heroSales ? percentMoney((Number(exchangeRate) * Number(heroSales.topPrice)), 4) : 0}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="total_list">
          <div className="title">
            <p>Total</p>
            <div onClick={() => gotoMoreMarket()}>Show More</div>
          </div>
          {
            heroList.length != 0 ? (
              <div className="hero_box">
                {
                  heroList.map((item: any, index: number) => {
                    return (
                      <div key={index} className="card_item_wrap">
                        <div className="top_box">
                          <div className="image_info">
                            {item.job == 1 ? (<img src={zhiye_1} className='zhiye' />) : null}
                            {item.job == 2 ? (<img src={zhiye_2} className='zhiye' />) : null}
                            {item.job == 3 ? (<img src={zhiye_3} className='zhiye' />) : null}
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
              </div>
            ) : (<div className="noData">No Data</div>)
          }
        </div>
        <div className="recently_list">
          <div className="title">Recently Sold</div>
          {
            endList.length != 0 ? (
              <div className="info_box">
                {
                  endList.map((item: any, index: number) => {
                    return (
                      <div key={index} className="info_item">
                        <div className="img_wrap">
                          <img src={getAssetsFile(`images/heroes/${item.image}.png`)} className="hero_img" />
                        </div>
                        <div className="right">
                          <div className="first_row">
                            <span>{item.name}</span>
                            <div className="price">
                              <div className="bnb_price">
                                <img src={getAssetsFile('images/public/logo_bnb@2x.png')} />
                                <p className="num">{item.price}</p>
                              </div>
                              <p className="meiyuan">≈ ${percentMoney((Number(exchangeRate) * Number(item.price)), 3)}</p>
                            </div>
                          </div>
                          <div className="last_row">
                            <div className="address_list">
                              <div className="buyer">
                                <span className="tit1">Buyer</span>
                                <span className="txt">{item.toAddress ? interceptStr(item.toAddress, 3) : "--"}</span>
                              </div>
                              <div className="seller">
                                <span className="tit2">Seller</span>
                                <span className="txt">{item.fromAddress ? interceptStr(item.fromAddress, 3) : "--"}</span>
                              </div>
                            </div>
                            <p className="time">{item.tradingTime}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>) : (<div className="noData">No Data</div>)
          }
        </div>
      </div>
    </div >
  );
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
