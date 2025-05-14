/*
 * @Author: YT
 * @Date: 2025-05-09 09:05:52
 * @LastEditors: YT
 * @LastEditTime: 2025-05-14 20:12:08
 * @Description: 当时只道是寻常
 * @FilePath: /dev/react-web3-app/src/redux/index.ts
 */

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import userReducer from "./modules/user";
import globalReducer from "./modules/global";

// 临时 RootState 类型定义（供 persistConfig 用）
type RootState = ReturnType<typeof rootReducer>;

// Redux Persist 配置
const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage: storageSession,
  whitelist: ["user", "global"],
};

// 合并 reducer
const rootReducer = combineReducers({
  user: userReducer,
  global: globalReducer,
});

// 持久化 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 创建 store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production",
});

// 持久化对象
export const persistor = persistStore(store);

// 类型导出
export type AppDispatch = typeof store;
