/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-13 14:45:32
 * @LastEditors: 言棠
 * @LastEditTime: 2023-10-22 20:53:59
 */
import { FloatButton } from 'antd';
import HomeHeader from "@/components/web/Home/HomeHeader";
import HomePage1 from "@/components/web/Home/HomePage1";
import HomePage2 from "@/components/web/Home/HomePage2";
import HomePage3 from "@/components/web/Home/HomePage3";
import HomePage4 from "@/components/web/Home/HomePage4";
import HomePage5 from "@/components/web/Home/HomePage5";
import HomeFooter from "@/components/web/Home/HomeFooter";
import './index.less'

export default function Home() {
  return (
    <>
      <div className="home_container">
        <HomeHeader />
        <HomePage1 />
        <HomePage2 />
        <HomePage3 />
        <HomePage4 />
        <HomePage5 />
        <HomeFooter />
      </div>
      <FloatButton.BackTop visibilityHeight={0} />
    </>
  );
};