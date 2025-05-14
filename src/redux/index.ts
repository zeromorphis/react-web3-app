/*
 * @Author: YT
 * @Date: 2025-05-09 09:05:52
 * @LastEditors: YT
 * @LastEditTime: 2025-05-14 15:41:17
 * @Description: 当时只道是寻常
 * @FilePath: \start\react-web3-app\src\redux\store.ts
 */
// redux/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './modules/user/userSlice';
import globalSlice from './modules/global/globalSlice';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['user', 'global'],
};

const rootReducer = combineReducers({
  user: userReducer,
  global: globalSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
