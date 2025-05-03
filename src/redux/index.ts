/*
 * @version: 3.0.0
 * @Date: 2022-08-31 21:08:25
 * @LastEditors: Please set LastEditors
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @LastEditTime: 2025-05-03 17:46:50
 * @FilePath: /dev/react-ts-app/src/redux/index.ts
 */
import { legacy_createStore as createStore, combineReducers, Store, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { applyMiddleware } from "redux";
// import storage from 'redux-persist/lib/storage';// 本地储存
import storageSession from 'redux-persist/lib/storage/session';// 会话储存
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';// 查看 'Merge Process' 部分的具体情况
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { thunk } from 'redux-thunk'
import reduxPromise from "redux-promise";

import user from "./modules/user/reducer";
import global from "./modules/global/reducer";

// 创建reducer(拆分reducer)
const reducer = combineReducers({
	user,
	global
});

// 默认存储引擎是localStorage
const persistConfig = {
	key: 'root',//向local里存的时候需要一个key
	storage: storageSession,//存储引擎
	// stateReconciler: hardSet,//autoMergeLevel2
	whitelist: ['user','global'],//白名单
	blacklist: [],//黑名单
};
const persistReducerConfig = persistReducer(persistConfig, reducer);

// 开启 redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 使用 redux 中间件导出仓库
const middleWares = applyMiddleware(thunk, reduxPromise);

// 创建 store
const store: Store = createStore(persistReducerConfig, composeEnhancers(middleWares));

// 导出持久化处理的仓库
const persistor = persistStore(store);

export { store, persistor };
