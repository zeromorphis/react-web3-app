/*
 * @version: 3.0.0
 * @Date: 2022-08-31 21:08:25
 * @LastEditors: 言棠
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @LastEditTime: 2022-09-13 16:44:57
 * @FilePath: /dev/react-ts-app/src/redux/modules/user/action.ts
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

// * setbnbBalance
export const setbnbBalance = (bnbBalance: number) => ({
	type: types.SET_BNBBALANCE,
	bnbBalance
});

// * setBindAccountCode
export const setBindAccountCode = (bindAccountCode: number) => ({
	type: types.SET_BINDACCOUNTCODE,
	bindAccountCode
});

// * setGameAccount
export const setGameAccount = (gameAccount: string) => ({
	type: types.SET_GAMEACCOUNT,
	gameAccount
});

// * resetUserState
export const resetUserState = () => ({
	type: types.RESET_USERSTATE,
});

// * signOut
export const signOut = () => ({
	type: types.SIGNOUT,
});