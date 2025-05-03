/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-14 09:56:49
 * @LastEditors: 言棠
 * @LastEditTime: 2023-10-22 20:13:24
 */
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Clipboard from "clipboard";
import { message } from 'antd';
import { store } from "@/redux";
import { setbnbBalance, signOut } from "@/redux/modules/user/action";
import { isMobile } from "@/utils/common";
import Web3 from 'web3';
import sdk from '@/sdk/chanjssdktd.js';

/**
 * 监听路由变化更新余额
 */
const refreshBalance = async () => {
    const location = useLocation();
    const isLogin = store.getState().user.isLogin;

    const resetBnbBalance = async () => {
        if (isLogin) {
            console.log('监听路由变化更新余额')
            await sdk.chainWeb3.connectMetamask();
            const bnbBalance = await sdk.chainWeb3.getBalance();
            store.dispatch(setbnbBalance(bnbBalance));
        }
    };

    useEffect(() => {
        resetBnbBalance();
    }, [location.pathname]);
}

/**
 * 监听网络和账户变化
 */
const networkListening = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
        await (window.ethereum as any).on("chainChanged", async (chainId: any) => {
            if (chainId != Web3.utils.numberToHex(97)) {
                console.warn('不是这个网络-清除登录信息并退出');
                store.dispatch(signOut());//清空redux
            } else {
                console.info('是这个网络-建立连接并重载数据');
            };
        });
        await (window.ethereum as any).on("accountsChanged", async (accounts: string) => {
            console.warn('账户切换...');
            store.dispatch(signOut());//清空redux
            console.log(accounts);//一旦切换账号这里就会执行
        });
    } else {
        if (isMobile()) {
            message.warning('No wallet detected, please install MetaMask')
        } else {
            message.warning('No wallet detected, please install MetaMask')
        }
    }
}

// 剪贴板内容
const clipboardContent = async (copyclass: string) => {
    let clipboard = new Clipboard("." + copyclass); // 这里括号里填写上面点击事件绑定的class名
    clipboard.on("success", (e: any) => {
        // 复制成功，提示根据自己项目实际使用的UI来写
        message.success("Wallet Address copied");
        // 释放内存
        clipboard.destroy();
    });
    clipboard.on("error", (e: any) => {
        // 不支持复制，提示根据自己项目实际使用的UI来写
        message.error("copy failed");
        // 释放内存
        clipboard.destroy();
    });
};

export {
    refreshBalance,
    networkListening,
    clipboardContent
}