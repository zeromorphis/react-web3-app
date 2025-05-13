/*
 * @version: 3.0.0
 * @Date: 2022-08-31 21:18:11
 * @LastEditors: YT
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @LastEditTime: 2025-05-13 20:18:16
 * @FilePath: /dev/web3-app/src/router/modules/main.tsx
 */
import React from "react";
import lazyLoad from "@/router/utils/lazyLoad";
import { RouteObject } from "@/router/interface";

// WEB主页面模块
const mainRouter: Array<RouteObject> = [
	{
		path: "/home",
		element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
		meta: {
			requiresAuth: false,
			title: "Home",
			key: "home"
		}
	},
	{
		element: lazyLoad(React.lazy(() => import("@/views/main/index"))),
		children: [
			{
				element: lazyLoad(React.lazy(() => import("@/views/main/wallet/index"))),
				children: [
					{
						path: "/main/wallet/nft",
						element: lazyLoad(React.lazy(() => import("@/views/main/wallet/components/nft/index"))),
						meta: {
							requiresAuth: true,
							title: "Nft",
							key: "nft"
						}
					},
					
				]
			},
		]
	},
];

export default mainRouter;
