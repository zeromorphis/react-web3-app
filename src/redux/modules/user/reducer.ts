/*
 * @version: 3.0.0
 * @Date: 2022-08-31 21:08:25
 * @LastEditors: YT
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @LastEditTime: 2025-05-13 20:04:23
 * @FilePath: /dev/web3-app/src/redux/modules/user/reducer.ts
 */
import { AnyAction } from "redux";
import { produce } from "immer";
import { UserState } from "@/redux/interface";
import * as types from "@/redux/mutation-types";

const userState: UserState = {
	token: "",
	address: undefined,
	balance: undefined,
	isLogin: false,
};

// user reducer
const user = (state: UserState = userState, action: AnyAction) =>
	produce(state, (draftState: any) => {
		switch (action.type) {
			case types.SET_TOKEN:
				draftState.token = action.token;
				break;
			case types.SET_ADDRESS:
				draftState.address = action.address;
				draftState.isLogin = action.address ? true : false;
				break;
				case types.SET_BALANCE:
				draftState.balance = action.balance;
				break;
			case types.SIGNOUT:
				draftState.token = "";
				draftState.address = undefined;
				draftState.balance = undefined;
				draftState.isLogin = false;
				break;
			default:
				return draftState;
		}
	});

export default user;
