/*
 * @Author: 言棠
 * @version: 3.0.0
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @Date: 2023-09-18 22:02:37
 * @LastEditors: 言棠
 * @LastEditTime: 2023-10-22 20:35:03
 */
import { AnyAction } from "redux";
import { GlobalState } from "@/redux/interface";
import { produce } from "immer";
import * as types from "@/redux/mutation-types";

const globalState: GlobalState = {
	language: "",
	lastTime: undefined,
	exchangeRate: '0'
};

// global reducer
const global = (state: GlobalState = globalState, action: AnyAction) =>
	produce(state, (draftState: any) => {
		switch (action.type) {
			case types.SET_LANGUAGE:
				draftState.language = action.language;
				break;
			case types.SET_LASTTIME:
				draftState.lastTime = action.lastTime;
				break;
			case types.SET_EXCHANGERATE:
				draftState.exchangeRate = action.exchangeRate;
				break;
			default:
				return draftState;
		}
	});

export default global;
