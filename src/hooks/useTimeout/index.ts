/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-14 12:03:51
 * @LastEditors: YT
 * @LastEditTime: 2025-05-14 19:46:35
 */
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { store } from "@/redux";
import { setLastTime } from "@/redux/modules/global";
import { signOut } from "@/redux/modules/user";
/**
 * @description 监测用户指定时间内有无操作，超时即退出登录
 */
export const useTimeout = () => {
  const { lastTime } = useSelector((state: RootState) => state.user);

  // 更新用户的最后操作时间
  const updateLastTime = () => {
    store.dispatch(setLastTime(new Date().getTime()));
  };

  // 判断是否超时
  const isTimeOut = () => {
    // 页面上一次的点击时间
    let currentTime: number = new Date().getTime();
    let sys_timeout: number = 60 * 1000 * 30; // 超时时间, 如果10分钟都没有点击页面就算超时
    // 超时了
    if (currentTime - lastTime >= sys_timeout) {
      return true;
    } else {
      return false;
    }
  };

  const timer: any = useRef(null);
  useEffect(() => {
    timer.current = setInterval(async () => {
      // 判断一下是否超时，如果超时了就退出
      if (isTimeOut()) {
        console.warn("Login timed out! You are disconnected!");
        store.dispatch(signOut());
        clearInterval(timer.current);
      }
    }, 1000);
    return () => {
      clearInterval(timer.current);
    };
  }, [lastTime]);

  return {
    updateLastTime,
  };
};
