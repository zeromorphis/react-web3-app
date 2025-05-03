/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-01 09:29:00
 * @LastEditors: 言棠
 * @LastEditTime: 2022-09-01 14:10:03
 */
import i18n from "i18next";
import enUsTrans from "./modules/en";
import zhCnTrans from "./modules/zh";
import { initReactI18next } from "react-i18next";

const resources = {
	en: {
		translation: enUsTrans
	},
	zh: {
		translation: zhCnTrans
	}
}

i18n.use(initReactI18next).init({
	resources: resources,
	// 选择默认语言，选择内容为上述配置中的 key，即 en/zh
	fallbackLng: "en",
	debug: false,
	interpolation: {
		escapeValue: false // not needed for react as it escapes by default
	},
})

export default i18n;