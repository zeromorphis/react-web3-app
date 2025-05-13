import * as types from "@/redux/mutation-types";

// * setLanguage
export const setLanguage = (language: string) => ({
	type: types.SET_LANGUAGE,
	language
});

// * setLastTime
export const setLastTime = (lastTime: number) => ({
	type: types.SET_LASTTIME,
	lastTime
});