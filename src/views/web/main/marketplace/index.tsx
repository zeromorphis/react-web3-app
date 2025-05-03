/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-22 10:41:53
 * @LastEditors: 言棠
 * @LastEditTime: 2022-09-28 16:00:10
 */
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
// images
import icon_nft from "@/assets/images/market/icon_nft@2x.png";
import icon_nft2 from "@/assets/images/market/icon_nft2@2x.png";
import icon_gems from "@/assets/images/market/icon_gems@2x.png";
import icon_gems2 from "@/assets/images/market/icon_gems2@2x.png";

import "./index.less";

const Marketplace = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<number>(0);
  const marketList = [
    {
      icon1: icon_nft,
      icon2: icon_nft2,
      show: activeTab,
      name: 'HEROES',
      url: '/main/marketplace/heroes'
    },
    {
      icon1: icon_gems,
      icon2: icon_gems2,
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

  return (
    <div className="marketplace_container">
      <div className="market_menu">
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
        <div className="bottom_line" />
      </div>
      <div className="market_content">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Marketplace;
