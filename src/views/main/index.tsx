/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-22 10:41:53
 * @LastEditors: YT
 * @LastEditTime: 2025-05-13 10:05:34
 */
import { Outlet } from "react-router-dom";
import MenuHeader from "@/components/Menu";
import "./index.less";

const MainIndex = (props: any) => {
  return (
    <div className="main_container">
      <header className="main_header">
        <MenuHeader></MenuHeader>
      </header>
      <main className="main_content">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default MainIndex;
