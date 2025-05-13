/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-01 09:29:00
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-27 19:04:30
 */
import { RouteObject } from "@/router/interface";

/**
 * @description 拼接document标题
 * @param {String} route_title 当前路由title
 * @returns string
 */
export function getPageTitle(route_title: string): string {
	const title: string = import.meta.env.VITE_GLOB_APP_TITLE
	if (route_title) {
		return `${route_title} - ${title}`
	}
	return `${title}`
}

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export const getBrowserLang = () => {
	let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
	// let defaultBrowserLang = "";
	let defaultBrowserLang = "en";
	if (browserLang.toLowerCase() === "cn" || browserLang.toLowerCase() === "zh" || browserLang.toLowerCase() === "zh-cn") {
		defaultBrowserLang = "zh";
	} else {
		defaultBrowserLang = "en";
	}
	return defaultBrowserLang;
};

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (path: string, routes: RouteObject[] = []): RouteObject => {
	let result: RouteObject = {};
	for (let item of routes) {
		if (item.path === path) return item;
		if (item.children) {
			const res = searchRoute(path, item.children);
			if (Object.keys(res).length) result = res;
		}
	}
	return result;
};

/**
 * @description 处理env配置项非法字符
 * @param {Object} envConf 当前访问地址
 * @returns object
 */
export function wrapperEnv(envConf: Recordable): ViteEnv {
	const ret: any = {};
	for (const envName of Object.keys(envConf)) {
		let realName = envConf[envName].replace(/\\n/g, "\n");
		realName = realName === "true" ? true : realName === "false" ? false : realName;

		if (envName === "VITE_PORT") {
			realName = Number(realName);
		}
		ret[envName] = realName;
		process.env[envName] = realName;
	}
	return ret;
}