/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-13 14:44:26
 * @LastEditors: YT
 * @LastEditTime: 2025-05-13 20:31:44
 */
import { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { HOME_URL } from "@/config/config";
import { signOut } from "@/redux/modules/user/action";
import { interceptStr, interceptDecimal } from "@/utils/common";
import sdk from "@/sdk/chainweb3";
// images
import logo from '@/assets/images/home/logo@2x.png'
import bi_icon from '@/assets/images/public/logo_bi.png'
import copy from '@/assets/images/menu/copy.png'
import metamask from '@/assets/images/menu/metamask.png'

import './index.less'

function Menu(props: any) {
  const { address, isLogin, balance, signOut } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginModel, setShowLoginModel] = useState<boolean>(false);
  const [active, setActive] = useState<number | null>(1);
  const routeList = [
    {
      name: "Dashboard",
      url: '/main/dashboard',
      isFirst: true
    },
    {
      name: "Marketplace",
      url: '/main/marketplace/heroes',
      isFirst: true
    },
    {
      name: "Pre Sale",
      url: '/main/presale/heroes',
      isFirst: true
    },
    // {
    //   name: "More",
    //   url: null,
    //   isFirst: true,
    //   children: [
    //     {
    //       name: "NFT Star UP",
    //       url: "/main/starup",
    //       isFirst: false
    //     },
    //   ]
    // },
  ];
  const [showMoreChild, setShowMoreChild] = useState<boolean>(false);

  const goHome = () => navigate(HOME_URL);

  const chooseRouter = (item: any, index: number) => {
    console.log('chooseRouter:', item, index);
    if (item.isFirst) {
      if (item.url) setActive(index)
      if (item.url) navigate(item.url)
    } else {
      if (item.url) navigate(item.url)
    }
  };

  const hoverOverItem = (e: any, i: number): void => {
    if (e.children) {
      setShowMoreChild(true)
    }
  }

  const hoverOutItem = (e: any, i: number): void => {
    if (e.children) {
      setShowMoreChild(false)
    }
  }

  const gotoWallet = () => navigate("/main/wallet/nft");

  useEffect(() => {
    switch (location.pathname) {
      case '/main/dashboard':
        setActive(0)
        break;
      case '/main/marketplace/heroes':
        setActive(1)
        break;
      case '/main/marketplace/gems':
        setActive(1)
        break;
      case '/main/marketplace/heroDetails':
        setActive(1)
        break;
      case '/main/marketplace/gemDetails':
        setActive(1)
        break;
      case '/main/presale/heroes':
        setActive(2)
        break;
      case '/main/presale/gems':
        setActive(2)
        break;
      // case '/main/starup':
      //   setActive(3)
      //   break;
      case '/main/wallet/asset':
        setActive(null)
        break;
      case '/main/wallet/nft':
        setActive(null)
        break;
      case '/main/wallet/heroDetails':
        setActive(null)
        break;
      case '/main/wallet/gemDetails':
        setActive(null)
        break;
      case '/main/wallet/claim':
        setActive(null)
        break;
      case '/main/wallet/binding':
        setActive(null)
        break;
      default:
        setActive(1)
        break;
    }
  }, [location.pathname]);

  // 钱包连接操作
  const connectWallet= async () => {
    await sdk.chainWeb3.connectWallet();
  };

  // 钱包注销操作
  const disconnect = async () => {
    console.warn("钱包注销操作");
    signOut();
  };

  

  // 根据路由变化刷新余额
  // refreshBalance();

  // 监听网络与账户变化
  // networkListening();

  return (
    <div className='web_menu_container' >
      <div className="menu">
        <div onClick={goHome} className="logo">
          <img src={logo} />
        </div>
        <ul className="list">
          {
            routeList.map((item: any, index: number) => {
              return (<li key={index} onClick={() => chooseRouter(item, index)} onMouseOver={() => hoverOverItem(item, index)} onMouseOut={() => hoverOutItem(item, index)} className={["item", index === active ? "active" : null].join(' ')}>
                <p className='mingzi'>
                  {item.name}
                  {item.children ? (<>{showMoreChild ? <CaretDownOutlined /> : <CaretUpOutlined />}</>) : null}
                </p>
                {
                  item.children && showMoreChild ? (
                    <div onMouseOver={() => hoverOverItem(item, index)} onMouseOut={() => hoverOutItem(item, index)} className="children">
                      {
                        item.children.map((e: any, i: number) => {
                          return (<div key={i} onClick={() => chooseRouter(e, i)} className='child_item'>{e.name}</div>)
                        })
                      }
                    </div>
                  ) : null
                }
              </li>)
            })
          }
        </ul>
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
          ) : (<Button type="primary" onClick={() => connectWallet()} className="login_btn">CONNECT WALLET</Button>)
        }
      </div >
    </div >
  )
}

export default connect((state: any) => state.user, { signOut })(Menu);