/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-20 10:27:22
 * @LastEditors: 言棠
 * @LastEditTime: 2022-09-20 10:42:56
 */
import { useState } from "react";

/**
 * @description 用户滚动首页时，顶部菜单栏颜色随之渐变
 */
export const useGradient = () => {
    const [backgroundColor, setBackgroundColor] = useState<string>('transparent');

    // 滚动页面时触发导航变色
    const handleScroll = async () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        // 设置背景颜色的透明度
        if (scrollTop) {
            setBackgroundColor(`rgba(0, 0, 14,${scrollTop / (scrollTop + 100)})`); // scrollTop + 多少根据自己的需求设置
        } else if (scrollTop === 0) {
            setBackgroundColor("transparent"); // 设置回到顶部时，背景颜色为透明
        }
    };

    // 监听页面滚动
    window.addEventListener("scroll", handleScroll);

    return {
        backgroundColor
    };
};