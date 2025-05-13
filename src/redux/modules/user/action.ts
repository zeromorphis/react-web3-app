/*
 * @version: 3.0.0
 * @Date: 2022-08-31 21:08:25
 * @LastEditors: YT
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @LastEditTime: 2025-05-13 20:02:37
 * @FilePath: /dev/web3-app/src/redux/modules/user/action.ts
 */
import * as types from "@/redux/mutation-types";

// * setToken
export const setToken = (token: string) => ({
	type: types.SET_TOKEN,
	token
});

// * setAddress
export const setAddress = (address: string) => ({
	type: types.SET_ADDRESS,
	address
});

// * setBalance
export const setBalance = (balance: number) => ({
	type: types.SET_BALANCE,
	balance
});

// * signOut
export const signOut = () => ({
	type: types.SIGNOUT,
});