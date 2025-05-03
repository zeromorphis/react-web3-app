/*
 * @version: 3.0.0
 * @Date: 2022-08-31 21:18:11
 * @LastEditors: 言棠
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @LastEditTime: 2022-10-10 11:56:59
 * @FilePath: /dev/react-ts-app/src/router/modules/error
 */
import React from "react";
import lazyLoad from "@/router/utils/lazyLoad";
import { RouteObject } from "@/router/interface";

// WEB主页面模块
const mainRouter: Array<RouteObject> = [
	{
		path: "/home",
		element: lazyLoad(React.lazy(() => import("@/views/web/home/index"))),
		meta: {
			requiresAuth: false,
			title: "Home",
			key: "home"
		}
	},
	{
		element: lazyLoad(React.lazy(() => import("@/views/web/main/index"))),
		children: [
			{
				element: lazyLoad(React.lazy(() => import("@/views/web/main/marketplace/index"))),
				children: [
					{
						path: "/main/marketplace/heroes",
						element: lazyLoad(React.lazy(() => import("@/views/web/main/marketplace/components/heroes/index"))),
						meta: {
							requiresAuth: false,
							title: "Heroes",
							key: "market_heroes"
						}
					},
					{
						path: "/main/marketplace/heroDetails",
						element: lazyLoad(React.lazy(() => import("@/views/web/main/marketplace/components/heroDetails/index"))),
						meta: {
							requiresAuth: false,
							title: "HeroDetails",
							key: "market_hero_details"
						}
					},
					{
						path: "/main/marketplace/gems",
						element: lazyLoad(React.lazy(() => import("@/views/web/main/marketplace/components/gems/index"))),
						meta: {
							requiresAuth: false,
							title: "Gems",
							key: "market_gems"
						}
					},
					{
						path: "/main/marketplace/gemDetails",
						element: lazyLoad(React.lazy(() => import("@/views/web/main/marketplace/components/gemDetails/index"))),
						meta: {
							requiresAuth: false,
							title: "GemDetails",
							key: "market_gem_details"
						}
					},
				]
			},
			{
				path: "/main/dashboard",
				element: lazyLoad(React.lazy(() => import("@/views/web/main/dashboard/index"))),
				meta: {
					requiresAuth: false,
					title: "Dashboard",
					key: "dashboard"
				}
			},
			{
				element: lazyLoad(React.lazy(() => import("@/views/web/main/wallet/index"))),
				children: [
					{
						path: "/main/wallet/asset",
						element: lazyLoad(React.lazy(() => import("@/views/web/main/wallet/components/asset/index"))),
						meta: {
							requiresAuth: true,
							title: "Asset",
							key: "asset"
						}
					},
					{
						path: "/main/wallet/nft",
						element: lazyLoad(React.lazy(() => import("@/views/web/main/wallet/components/nft/index"))),
						meta: {
							requiresAuth: true,
							title: "NFT",
							key: "nft"
						}
					},
					{
						path: "/main/wallet/heroDetails",
						element: lazyLoad(React.lazy(() => import("@/views/web/main/wallet/components/heroDetails/index"))),
						meta: {
							requiresAuth: true,
							title: "heroDetails",
							key: "wallet_hero_details"
						}
					},
					{
						path: "/main/wallet/gemDetails",
						element: lazyLoad(React.lazy(() => import("@/views/web/main/wallet/components/gemDetails/index"))),
						meta: {
							requiresAuth: true,
							title: "gemDetails",
							key: "wallet_gem_details"
						}
					},
					{
						path: "/main/wallet/claim",
						element: lazyLoad(React.lazy(() => import("@/views/web/main/wallet/components/claim/index"))),
						meta: {
							requiresAuth: true,
							title: "Claim",
							key: "claim"
						}
					},
					{
						path: "/main/wallet/binding",
						element: lazyLoad(React.lazy(() => import("@/views/web/main/wallet/components/binding/index"))),
						meta: {
							requiresAuth: true,
							title: "Binding",
							key: "binding"
						}
					},
				]
			},
			{
				element: lazyLoad(React.lazy(() => import("@/views/web/main/presale/index"))),
				children: [
					{
						path: "/main/presale/heroes",
						element: lazyLoad(React.lazy(() => import("@/views/web/main/presale/components/heroes/index"))),
						meta: {
							requiresAuth: false,
							title: "Heroes",
							key: "blindbox_heroes"
						}
					},
					{
						path: "/main/presale/gems",
						element: lazyLoad(React.lazy(() => import("@/views/web/main/presale/components/gems/index"))),
						meta: {
							requiresAuth: false,
							title: "Gems",
							key: "blindbox_gems"
						}
					},
				]
			},
			{
				path: "/main/starup",
				element: lazyLoad(React.lazy(() => import("@/views/web/main/starup/index"))),
				meta: {
					requiresAuth: true,
					title: "NFT Star UP",
					key: "starup"
				}
			},
		]
	},
];

export default mainRouter;
