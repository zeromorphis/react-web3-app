/*
 * @version: 3.0.0
 * @Date: 2022-05-21 17:44:15
 * @LastEditors: 言棠
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @LastEditTime: 2022-05-21 20:40:25
 * @FilePath: /dev/react-ts-app/src/router/routes.ts
 */
import { Navigate } from "react-router-dom";
import { RouteObject } from "@/router/interface";

import mainRouter from "../modules/wapMain";
import errorRouter from "../modules/error";

const wapRoutes: Array<RouteObject> = [
	{
		path: "/",
		element: <Navigate to="/home" />
	},
	...mainRouter,
	...errorRouter,
	{
		path: "*",
		element: <Navigate to="/404" />
	},
]

export default wapRoutes;