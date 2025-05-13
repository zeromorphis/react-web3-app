/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-06-17 09:28:11
 * @LastEditors: ZT
 * @LastEditTime: 2023-12-06 19:55:50
 */

import { EtherunmVerfiyMessageApi } from "@/api/user";
import { setStorage, getStorage } from "@/utils/storage";
import sdk from "@/sdk/chainweb3";

// 获取未过期的签名
export const getSignature = async (account: any) => {
  // 如果本地有账户信息
  const localsigna: any = getStorage(account);
  let signature: any;
  if (localsigna) {
    // 获取本地有账户信息的 签名
    // 对比现在时间和签名起始时间
    var timestampNow = new Date().getTime(); //精确到毫秒
    //  如果签名未超时
    if (timestampNow - localsigna.expried < 24 * 60 * 60 * 1000) {
      return localsigna.signature;
    } else {
      //  如果签名超时
      signature = await getSigna(account);
    }
  } else {
    //  如果本地无该账户
    signature = await getSigna(account);
  }
  return signature;
};

// 请求签名字符串 并签名 记录起始时间和签名存储到本地该账户
const getSigna = async (account: any) => {
  // 获取签名字符串
  try {
    const message = await EtherunmVerfiyMessageApi(account);
    console.log(message);

    const signature = await sdk.chainWeb3.sign(message.Data);

    const timestampSet = new Date().getTime(); //精确到毫秒

    if (account && signature) {
      // 记录起始时间和签名存储到本地该账户
      setStorage(account, { signature: signature, expried: timestampSet });
    }
    // 返回签名
    return signature;
  } catch (error) {
    console.error("EtherunmVerfiyMessage quest error", error);
  }
};
