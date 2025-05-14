/*
 * @version: 3.0.0
 * @Date: 2022-08-31 20:18:16
 * @LastEditors: YT
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @LastEditTime: 2025-05-14 16:03:52
 * @FilePath: \start\react-web3-app\src\App.tsx
 */
import { useState, useEffect } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom"; //hash路由：HashRouter history路由：BrowserRouter
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { setLanguage } from '@/redux/modules/global/globalSlice';
import { AppDispatch } from '@/redux';
import { getBrowserLang } from "@/utils/tools";
import AuthRouter from "@/router/utils/authRouter";
import Router from "@/router/index";
import { useTimeout } from "@/hooks/useTimeout";
import i18n from "@/language";
import zhCN_WEB from "antd/lib/locale/zh_CN";
import enUS_WEB from "antd/lib/locale/en_US";
import { ConfigProvider as ConfigProviderAntd } from "antd";
import sdk from "@/sdk/chainweb3";

const App = () => {
   const dispatch = useDispatch<AppDispatch>();
  const { language } = useSelector((state: RootState) => state.global);
  const { updateLastTime } = useTimeout();
  const [i18nLocaleWeb, setI18nLocaleWeb] = useState(enUS_WEB);

  // 设置 antd 语言国际化
  const setAntdLanguage = () => {
    // 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
    if (language && language == "en") return setI18nLocaleWeb(enUS_WEB);
    if (language && language == "zh") return setI18nLocaleWeb(zhCN_WEB);
    if (getBrowserLang() == "en") return setI18nLocaleWeb(enUS_WEB);
    if (getBrowserLang() == "zh") return setI18nLocaleWeb(zhCN_WEB);
  };

  useEffect(() => {
    // 全局使用国际化
    i18n.changeLanguage(language || getBrowserLang());
    dispatch(setLanguage(language || getBrowserLang()));
    setAntdLanguage(); // 监听 antd 语言国际化
  }, [language]);

  // 监听网络变化
  sdk.chainWeb3.networkListening();

  return (
    <div onClick={() => updateLastTime()} onMouseOver={() => updateLastTime()}>
      <BrowserRouter>
        <ConfigProviderAntd locale={i18nLocaleWeb}>
          <AuthRouter>
            <Router />
          </AuthRouter>
        </ConfigProviderAntd>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = { setLanguage };
export default connect(mapStateToProps, mapDispatchToProps)(App);
