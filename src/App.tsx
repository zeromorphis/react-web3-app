/*
 * @version: 3.0.0
 * @Date: 2022-08-31 20:18:16
 * @LastEditors: 言棠
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @LastEditTime: 2022-10-11 10:20:38
 * @FilePath: /dev/react-ts-app/src/App.tsx
 */
import { useState, useEffect } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";//hash路由：HashRouter history路由：BrowserRouter
import { connect } from "react-redux";
import { getBrowserLang } from "@/utils/tools";
import AuthRouter from "@/router/utils/authRouter";
import Router from "@/router/index";
import { setLanguage, setExchangeRate } from "@/redux/modules/global/action";
import { useTimeout } from "@/hooks/useTimeout";
import { pullChainData } from "@/hooks/useDataSync";
import i18n from "@/language";
import zhCN_WEB from "antd/lib/locale/zh_CN";
import enUS_WEB from "antd/lib/locale/en_US";
import zhCN_WAP from 'antd-mobile/es/locales/zh-CN';
import enUS_WAP from 'antd-mobile/es/locales/en-US';
import { ConfigProvider as ConfigProviderWeb } from "antd";
import { ConfigProvider as ConfigProviderWap } from "antd-mobile";
import axios from 'axios';

const App = (props: any) => {
  const { global, setLanguage, setExchangeRate } = props;
  const { language } = global;
  const { updateLastTime } = useTimeout();
  const [i18nLocaleWeb, setI18nLocaleWeb] = useState(enUS_WEB);
  const [i18nLocaleWap, setI18nLocaleWap] = useState(enUS_WAP);

  // 拉取BNB2USDT汇率
  useEffect(() => {
    (function () {
      axios.get('https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=967M5GISPXCBYARM98YC9GNFP7Z1W1431V').then((res: any) => {
        if (res.data.status === "1" && res.data.result.ethusd) {
          setExchangeRate(res.data.result.ethusd)
          console.log("BNB2USDT_ExchangeRate:", res.data.result.ethusd);
        }
      });
    }());
  }, []);

  // 设置 antd 语言国际化
  const setAntdLanguage = () => {
    // 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
    if (language && language == "en") return setI18nLocaleWeb(enUS_WEB);
    if (language && language == "zh") return setI18nLocaleWeb(zhCN_WEB);
    if (getBrowserLang() == "en") return setI18nLocaleWeb(enUS_WEB);
    if (getBrowserLang() == "zh") return setI18nLocaleWeb(zhCN_WEB);
  };

  // 设置 antd-mobile 语言国际化
  const setAntdMobileLanguage = () => {
    // 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
    if (language && language == "en") return setI18nLocaleWap(enUS_WAP);
    if (language && language == "zh") return setI18nLocaleWap(zhCN_WAP);
    if (getBrowserLang() == "en") return setI18nLocaleWap(enUS_WAP);
    if (getBrowserLang() == "zh") return setI18nLocaleWap(zhCN_WAP);
  };

  useEffect(() => {
    // 全局使用国际化
    i18n.changeLanguage(language || getBrowserLang());
    setLanguage(language || getBrowserLang());
    setAntdLanguage();// 监听 antd 语言国际化
    setAntdMobileLanguage();// 监听 antd-mobile 语言国际化
  }, [language]);

  pullChainData();

  return (
    <div onClick={() => updateLastTime()} onMouseOver={() => updateLastTime()}>
      <BrowserRouter >
        <ConfigProviderWeb locale={i18nLocaleWeb} >
          <ConfigProviderWap locale={i18nLocaleWap}>
            <AuthRouter >
              <Router />
            </AuthRouter>
          </ConfigProviderWap>
        </ConfigProviderWeb>
      </BrowserRouter>
    </div>
  )
}

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = { setLanguage, setExchangeRate };
export default connect(mapStateToProps, mapDispatchToProps)(App);
