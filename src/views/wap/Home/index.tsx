/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-13 14:45:32
 * @LastEditors: 言棠
 * @LastEditTime: 2022-11-01 13:57:39
 */
import { BackTop } from 'antd';
import MenuHeader from "@/components/wap/Menu/index";
import HomePage1 from "@/components/wap/Home/HomePage1";
import HomePage2 from "@/components/wap/Home/HomePage2";
import HomePage3 from "@/components/wap/Home/HomePage3";
import HomePage4 from "@/components/wap/Home/HomePage4";
import HomePage5 from "@/components/wap/Home/HomePage5";
import HomeFooter from "@/components/wap/Home/HomeFooter";
import './index.less'

export default function Home() {
  return (
    <>
      <div className="home_container">
        <MenuHeader />
        <HomePage1 />
        <HomePage2 />
        <HomePage3 />
        <HomePage4 />
        <HomePage5 />
        <HomeFooter />
      </div>
      <BackTop />
    </>
  );
};