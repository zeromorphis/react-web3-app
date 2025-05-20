/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-22 10:41:53
 * @LastEditors: YT
 * @LastEditTime: 2025-05-20 11:19:50
 */
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
// images
import icon_asset from "@/assets/images/market/icon_asset@2x.png";
import icon_asset2 from "@/assets/images/market/icon_asset2@2x.png";
import icon_nft from "@/assets/images/market/icon_nft@2x.png";
import icon_nft2 from "@/assets/images/market/icon_nft2@2x.png";
import icon_claim from "@/assets/images/market/icon_claim@2x.png";
import icon_claim2 from "@/assets/images/market/icon_claim2@2x.png";
import icon_binding from "@/assets/images/market/icon_binding@2x.png";
import icon_binding2 from "@/assets/images/market/icon_binding2@2x.png";

import "./index.less";

const Wallet = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<number>(1);
  const walletList = [
    {
      icon1: icon_asset,
      icon2: icon_asset2,
      show: activeTab,
      name: 'ASSET',
      url: '/main/wallet/asset'
    },
    {
      icon1: icon_nft,
      icon2: icon_nft2,
      show: activeTab,
      name: 'NFT',
      url: '/main/wallet/nft'
    },
    {
      icon1: icon_claim,
      icon2: icon_claim2,
      show: activeTab,
      name: 'CLAIM',
      url: '/main/wallet/claim'
    },
    {
      icon1: icon_binding,
      icon2: icon_binding2,
      show: activeTab,
      name: 'BINDING',
      url: '/main/wallet/binding'
    },
  ];
  const chooseMenu = (item: any, index: number) => {
    console.log('chooseMenu:', item, index);
    setActiveTab(index)
    navigate(item.url)
  };

  useEffect(() => {
    switch (location.pathname) {
      case '/main/wallet/nft':
        setActiveTab(1)
        break;
    }
  }, [location.pathname]);

  return (
    <div className="wallet_container">
      <div className="wallet_menu">
        <ul className="wallet_menu_box">
          {
            walletList.map((item: any, index: number) => {
              return <li key={index} onClick={() => chooseMenu(item, index)} className={[activeTab == index ? "active" : null].join(' ')}>
                <img src={activeTab == index ? item.icon2 : item.icon1} />
                <p>{item.name}</p>
              </li>
            })
          }
        </ul>
        <div className="bottom_line" />
      </div>
      <div className="wallet_content">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Wallet;
