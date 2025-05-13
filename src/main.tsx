/*
 * @version: 3.0.0
 * @Date: 2022-08-31 20:18:16
 * @LastEditors: 言棠
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @LastEditTime: 2023-10-22 20:17:36
 * @FilePath: /dev/react-ts-app/src/main.tsx
 */
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import { store, persistor } from "@/redux";
import App from './App'
import '@ant-design/v5-patch-for-react-19';
import 'lib-flexible';//postcss-pxtorem
import 'virtual:svg-icons-register';//svg-icons注册脚本
import './index.less';//初始化配置样式

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// * react严格模式
	// <React.StrictMode>
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
	// </React.StrictMode>
)
