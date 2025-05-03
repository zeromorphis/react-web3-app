/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-01 09:29:00
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-10 13:38:37
 */
import { useLocation, Navigate } from "react-router-dom";
import { AxiosCanceler } from "@/api/helper/axiosCancel";
import { getPageTitle, searchRoute } from "@/utils/tools";
import rootRouter from '@/router/routes';
import { store } from "@/redux/index";
import { message } from 'antd';

const axiosCanceler = new AxiosCanceler();

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
	const { pathname } = useLocation();
	const route = searchRoute(pathname, rootRouter);

	// * 设置页面标题
	if (route.meta?.title) {
		document.title = getPageTitle(route.meta.title);
	}

	// * 在跳转路由之前，清除所有的请求
	axiosCanceler.removeAllPending();

	// * 判断当前路由是否需要访问权限(不需要权限直接放行)
	if (!route.meta?.requiresAuth) return props.children;

	// * 判断是否已经连接钱包
	const isLogin = store.getState().user.isLogin;
	if (!isLogin) {
		message.warning({
			content: 'Please connect your wallet',
			duration: 2
		});
		return <Navigate to="/home" replace />;
	};

	// * 当前账号有权限返回 Router，正常访问页面
	return props.children;
};

export default AuthRouter;
