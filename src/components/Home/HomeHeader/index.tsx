/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-13 14:44:26
 * @LastEditors: YT
 * @LastEditTime: 2025-05-14 20:03:07
 */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { signOut } from '@/redux/modules/user';
import { AppDispatch } from '@/redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { interceptStr, interceptDecimal } from "@/utils/common";
import { useGradient } from "@/hooks/useGradient";
import sdk from "@/sdk/chainweb3";
// images
import logo from '@/assets/images/home/logo@2x.png'
import icon_tele from '@/assets/images/home/icon_tele@2x.png'
import icon_discode from '@/assets/images/home/icon_discode@2x.png'
import icon_twitter from '@/assets/images/home/icon_twitter@2x.png'
import icon_medium from '@/assets/images/home/icon_medium@2x.png'
import bi_icon from '@/assets/images/public/logo_bi.png'
import copy from '@/assets/images/menu/copy.png'
import metamask from '@/assets/images/menu/metamask.png'

import './index.less'

function HomeHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const { address, isLogin, balance } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [showLoginModel, setShowLoginModel] = useState<boolean>(false);
  const { backgroundColor } = useGradient();
  const routeList = [
    {
      name: "Marketplace",
      url: '/main/marketplace/heroes',
    },
    {
      name: "Pre Sale",
      url: '/main/presale/heroes',
    },
    {
      name: "Whitepaper",
      url: null,
    },
  ];
  const chooseRouter = (item: any, index: number) => {
    console.log('chooseRouter:', item, index);
    // if (item.url) navigate(item.url)
  };

  const gotoWallet = () => navigate("/main/wallet/nft");

  // 钱包连接操作
  const connectWallet= async () => {
    await sdk.chainWeb3.connectWallet();
  };

  // 钱包注销操作
  const disconnect = async () => {
    console.warn("钱包注销操作");
    dispatch(signOut());
  };

  return (
    <div className='homeHeader_container' style={{ backgroundColor: backgroundColor }}>
      <div className="menu">
        <div className="logo">
          <img src={logo} />
        </div>
        <ul className="list">
          {
            routeList.map((item: any, index: number) => {
              return (<li key={index} onClick={() => chooseRouter(item, index)} className="item">{item.name}</li>)
            })
          }
        </ul>
      </div>
      <div className="social_contact">
        <div className="shejiao">
          <img src={icon_tele} className="hover_show" />
        </div>
        <div className="shejiao">
          <img src={icon_discode} className="hover_show" />
        </div>
        <div className="shejiao">
          <img src={icon_twitter} className="hover_show" />
        </div>
        <div className="shejiao">
          <img src={icon_medium} className="hover_show" />
        </div>
      </div>
      <div className="operate">
        {
          isLogin ? (
            <div className="myWallet" >
              <div className="myWallet_info" onMouseOver={() => setShowLoginModel(true)} onMouseOut={() => setShowLoginModel(false)} >
                <div className="balance_wrap">
                  <img src={bi_icon} />
                  <span className="balance">{interceptDecimal(balance, 4)}</span>
                </div>
                <div className="address_wrap">
                  <span className="address">{interceptStr(address, 3)}</span>
                  {/* <img src={copy} onClick={() => clipboardContent('nav-copy')} alt="Copy to clipboard" data-clipboard-text={address} className="nav-copy" /> */}
                </div>
                {showLoginModel ? (
                  <div className="logOut_box" onMouseOver={() => setShowLoginModel(true)} onMouseOut={() => setShowLoginModel(false)}>
                    <div className="user_add">
                      <div className="us_tt">Wallet</div>
                      <div className="us_logo">
                        <img src={metamask} />
                        <span>MetaMask</span>
                      </div>
                    </div>
                    <div className="user_add">
                      <div className="us_tt">Connected Network</div>
                      <div className="copy_bsc">
                        <div className="b_circle"></div>
                        <span>Base</span>
                      </div>
                    </div>
                    <div className="disconnect" onClick={() => disconnect()}>
                      Disconnect Wallet
                    </div>
                    <div className="triangle"></div>
                  </div>
                ) : null}
              </div>
              <div onClick={() => gotoWallet()} className="myWallet_btn">WALLET</div>
            </div>
          ) : (<Button type="primary" onClick={() => connectWallet()} className="login_btn">Connect</Button>)
        }
      </div >
    </div >
  )
}

export default HomeHeader;
