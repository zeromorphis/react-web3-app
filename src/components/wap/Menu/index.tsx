/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-13 14:44:26
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-27 10:08:36
 */
import { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { HOME_URL } from "@/config/config";
import { resetUserState } from "@/redux/modules/user/action";
import { interceptStr, interceptDecimal, getAssetsFile } from "@/utils/common";
import { connectWeb3 } from "@/utils/web3/connectWeb3";
import { refreshBalance, networkListening, clipboardContent } from "@/hooks/useWallet";

import './index.less'

function Menu(props: any) {
  const { address, isLogin, bnbBalance, resetUserState } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [active, setActive] = useState<number | null>(null);
  const routeList = [
    {
      name: "Dashboard",
      url: '/main/dashboard',
      isLogin: false
    },
    {
      name: "Marketplace",
      url: '/main/marketplace/heroes',
      isLogin: false
    },
    {
      name: "Pre Sale",
      url: '/main/presale/heroes',
      isLogin: false
    },
    {
      name: "Wallet",
      url: '/main/wallet/nft',
      isLogin: true
    },
  ];

  const goHome = () => navigate(HOME_URL);

  const chooseRouter = (item: any, index: number) => {
    console.log('chooseRouter:', item, index);
    if (item.url) navigate(item.url)
    setShowMenu(false);
  };

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
      case '/main/wallet/asset':
        setActive(3)
        break;
      case '/main/wallet/nft':
        setActive(3)
        break;
      case '/main/wallet/heroDetails':
        setActive(3)
        break;
      case '/main/wallet/gemDetails':
        setActive(3)
        break;
      case '/main/wallet/claim':
        setActive(3)
        break;
      case '/main/wallet/binding':
        setActive(3)
        break;
      case '/main/home':
        setActive(null)
        break;
      default:
        setActive(null)
        break;
    }
  }, [location.pathname]);

  // 钱包注销操作
  const disconnect = async () => {
    console.warn("钱包注销操作");
    setShowMenu(false);
    resetUserState();
  };

  // 钱包连接操作
  const linkWallet = async () => {
    setShowMenu(false)
    await connectWeb3(); //调用钱包（连接、监听网络、获取余额）
  };

  // 根据路由变化刷新余额
  refreshBalance();

  // 监听网络与账户变化
  networkListening();

  return (
    <>
      <div className='wap_menu_container' >
        <div onClick={goHome} className="logo">
          <img src={getAssetsFile('images/home/logo@2x.png')} />
        </div>
        <div className='menu'>
          {
            isLogin ? (
              <div className="myWallet_info">
                <div className="balance_wrap">
                  <img src={getAssetsFile('images/public/logo_bnb@2x.png')} />
                  <span className="balance">{interceptDecimal(bnbBalance, 4)}</span>
                </div>
                <div className="address_wrap">
                  <span className="address">{interceptStr(address, 3)}</span>
                  <img src={getAssetsFile('images/menu/copy.png')} onClick={() => clipboardContent('nav-copy')} alt="Copy to clipboard" data-clipboard-text={address} className="nav-copy" />
                </div>
              </div>
            ) : (<div onClick={() => linkWallet()} className="login_btn">CONNECT</div>)
          }
          <div className="menu_wrap">
            {
              !showMenu ? (
                <div onClick={() => setShowMenu(true)} className="menu">
                  <img src={getAssetsFile(`images/wap/menu.png`)} />
                </div>
              ) : (
                <div onClick={() => setShowMenu(false)} className="menu">
                  <img src={getAssetsFile(`images/wap/close.png`)} />
                </div>
              )
            }
          </div>
        </div>
      </div >
      {
        showMenu ? (
          <div className="menu_popup">
            <div onClick={() => setShowMenu(false)} className="popup_mask" />
            <div className="popup_content">
              <ul>
                {
                  routeList.map((item: any, index: number) => {
                    if (item.isLogin && !isLogin) return
                    return (<li key={index} onClick={() => chooseRouter(item, index)} className={["item", index === active ? "active" : null].join(' ')}>
                      {item.name}
                    </li>)
                  })
                }
                {isLogin ? (<li onClick={() => disconnect()} className='item'>Disconnect</li>) : null}
              </ul>
            </div>
          </div>
        ) : null
      }
    </>
  )
}

export default connect((state: any) => state.user, { resetUserState })(Menu);