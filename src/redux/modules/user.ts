import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "@/redux/interface";

// 初始状态
const initialState: UserState = {
  token: "",
  address: undefined,
  balance: undefined,
  isLogin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state: UserState, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setAddress(state: UserState, action: PayloadAction<string>) {
      state.address = action.payload;
      state.isLogin = action.payload ? true : false;
    },
    setBalance(state: UserState, action: PayloadAction<number>) {
      state.balance = action.payload;
    },
    signOut(state: UserState) {
      state.token = "";
      state.address = undefined;
      state.balance = undefined;
      state.isLogin = false;
    },
  },
});

// 导出 action 和 reducer
export const { setToken, setAddress, setBalance, signOut } = userSlice.actions;
export default userSlice.reducer;
