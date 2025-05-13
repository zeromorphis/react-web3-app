/*
 * @Author: 言棠
 * @version: 3.0.0
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @Date: 2023-09-18 22:02:37
 * @LastEditors: YT
 * @LastEditTime: 2025-05-13 20:05:45
 */
import { AnyAction } from "redux";
import { GlobalState } from "@/redux/interface";
import { produce } from "immer";
import * as types from "@/redux/mutation-types";

const globalState: GlobalState = {
	language: "",
	lastTime: undefined,
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
			default:
				return draftState;
		}
	});

export default global;
