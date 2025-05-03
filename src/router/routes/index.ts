/*
 * @Author: 言棠
 * @version: 3.0.0
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @Date: 2022-04-14 14:32:33
 * @LastEditTime: 2022-06-23 20:53:33
 */
import { RouteObject } from "../interface";
//WEB模块
import webRoutes from "./webRoutes";
//WAP模块
import wapRoutes from "./wapRoutes";

let routes: RouteObject[] = [];

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    console.log('WAP')
    routes = [...wapRoutes]
} else {
    console.log('WEB')
    routes = [...webRoutes]
}

export default routes;