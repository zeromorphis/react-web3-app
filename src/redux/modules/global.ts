/*
 * @Author: YT
 * @Date: 2025-05-14 19:47:07
 * @LastEditors: YT
 * @LastEditTime: 2025-05-14 20:00:06
 * @Description: 当时只道是寻常
 * @FilePath: /dev/react-web3-app/src/redux/modules/global.ts
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalState } from "@/redux/interface";

// 初始状态
const initialState: GlobalState = {
  language: "",
	lastTime: undefined,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLanguage(state: GlobalState, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setLastTime(state: GlobalState, action: PayloadAction<number>) {
      state.lastTime = action.payload;
    },
  },
});

// 导出 action 和 reducer
export const { setLanguage, setLastTime } = globalSlice.actions;
export default globalSlice.reducer;
