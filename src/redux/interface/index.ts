/*
 * @version: 3.0.0
 * @Date: 2022-08-31 21:08:25
 * @LastEditors: YT
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @LastEditTime: 2025-05-14 20:01:04
 * @FilePath: /dev/react-web3-app/src/redux/interface/index.ts
 */
/* UserState */
export interface UserState {
	token: string;
	address: string | undefined;
	isLogin: boolean;
	balance: number | undefined;
}

/* GlobalState */
export interface GlobalState {
	language: string;
	lastTime: number | undefined;
}
