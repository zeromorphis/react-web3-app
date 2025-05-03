/*
 * @version: 3.0.0
 * @Date: 2022-08-31 21:08:25
 * @LastEditors: 言棠
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @LastEditTime: 2023-10-22 20:34:45
 * @FilePath: /dev/react-ts-app/src/redux/modules/user/reducer.ts
 */
import { AnyAction } from "redux";
import { produce } from "immer";
import { UserState } from "@/redux/interface";
import * as types from "@/redux/mutation-types";

const userState: UserState = {
	token: "",
	address: undefined,
	isLogin: false,
	bnbBalance: undefined,
	bindAccountCode: undefined,
	isBindAccount: false,
	gameAccount: undefined,
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
			case types.SET_BNBBALANCE:
				draftState.bnbBalance = action.bnbBalance;
				break;
			case types.SET_BINDACCOUNTCODE:
				draftState.bindAccountCode = action.bindAccountCode;
				draftState.isBindAccount = action.bindAccountCode == 520 ? false : action.bindAccountCode == undefined ? false : action.bindAccountCode == "ERR_NETWORK" ? false : true;
				break;
			case types.SET_GAMEACCOUNT:
				draftState.gameAccount = action.gameAccount;
				break;
			case types.RESET_USERSTATE:
				draftState.token = "";
				draftState.address = undefined;
				draftState.isLogin = false;
				draftState.bnbBalance = undefined;
				draftState.bindAccountCode = undefined;
				draftState.gameAccount = undefined;
				break;
			case types.SIGNOUT:
				draftState.token = "";
				draftState.address = undefined;
				draftState.isLogin = false;
				draftState.bnbBalance = undefined;
				draftState.bindAccountCode = undefined;
				draftState.gameAccount = undefined;
				break;
			default:
				return draftState;
		}
	});

export default user;
