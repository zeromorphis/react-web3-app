/*
 * @version: 3.0.0
 * @Date: 2022-08-31 21:08:25
 * @LastEditors: 言棠
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @LastEditTime: 2022-09-13 16:04:32
 * @FilePath: /dev/react-ts-app/src/redux/interface/index.ts
 */
/* UserState */
export interface UserState {
	token: string;
	address: string | undefined;
	isLogin: boolean;
	bnbBalance: number | undefined;
	bindAccountCode: number | string | undefined;
	isBindAccount: boolean;
	gameAccount: string | undefined
}

/* GlobalState */
export interface GlobalState {
	lastTime: number | undefined;
	language: string;
	exchangeRate: string;
}
