/*
 * @version: 3.0.0
 * @Date: 2022-08-31 21:18:11
 * @LastEditors: 言棠
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @LastEditTime: 2022-09-01 10:45:40
 * @FilePath: /dev/react-ts-app/src/router/index.tsx
 */
import { useRoutes } from "react-router-dom";
import rootRouter from '@/router/routes';

const Router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};

export default Router;
