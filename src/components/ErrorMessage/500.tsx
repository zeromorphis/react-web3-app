/*
 * @version: 3.0.0
 * @Date: 2022-08-31 21:37:22
 * @LastEditors: 言棠
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @LastEditTime: 2022-09-01 20:52:59
 * @FilePath: /dev/react-ts-app/src/components/ErrorMessage/500.tsx
 */
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import "./index.less";

const NotNetwork = () => {
	const navigate = useNavigate();
	const goHome = () => {
		navigate(HOME_URL);
	};
	return (
		<Result
			status="500"
			title="500"
			subTitle="Sorry, something went wrong."
			extra={
				<Button type="primary" onClick={goHome}>
					Back Home
				</Button>
			}
		/>
	);
};

export default NotNetwork;
