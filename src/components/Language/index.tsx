/*
 * @Author: YT
 * @Date: 2025-05-09 09:05:52
 * @LastEditors: YT
 * @LastEditTime: 2025-05-14 15:57:53
 * @Description: 当时只道是寻常
 * @FilePath: \start\react-web3-app\src\components\Language\index.tsx
 */

import { Dropdown, Menu, Space, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { setLanguage } from '@/redux/modules/global/globalSlice';
import { AppDispatch } from '@/redux';

const Language: React.FC = (props: any) => {
const dispatch = useDispatch<AppDispatch>();
  const { language } = useSelector((state: RootState) => state.global);
	const menu = (
		<Menu
			items={[
				{
					key: "1",
					label: <span>简体中文</span>,
					onClick: () => dispatch(setLanguage("zh")),
					disabled: language === "zh"
				},
				{
					key: "2",
					label: <span>English</span>,
					onClick: () => dispatch(setLanguage("en")),
					disabled: language === "en"
				}
			]}
		/>
	);
	return (
		<Dropdown overlay={menu}>
			<Typography.Link>
				<Space>
					Language
					<DownOutlined />
				</Space>
			</Typography.Link>
		</Dropdown>
	);
};

export default Language;
