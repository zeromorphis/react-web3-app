/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-09 15:24:29
 * @LastEditors: 言棠
 * @LastEditTime: 2022-09-21 18:54:24
 */
// * Vite
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	NODE_ENV: string;
	VITE_API_URL: string;
	VITE_ENABLE_VCONSOLE: boolean;
	VITE_GLOB_APP_TITLE: string;
	VITE_HOST: string | boolean;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_BUILD_GZIP: boolean;
	VITE_DROP_CONSOLE: boolean;
}