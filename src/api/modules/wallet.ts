/*
 * @Descripttion: YT
 * @version: 1.0.0
 * @Author: 言棠
 * @Date: 2021-12-30 17:13:17
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-24 11:40:48
 */
import http from "@/api";

enum Api {
  connectWallet = '/client/api/wallet/connectWallet',//连接钱包
  accountHeroInfo = '/client/api/wallet/accountHeroInfo',//获取钱包英雄列表
  accountGemInfo = '/client/api/wallet/accountGemInfo',//获取钱包宝石列表
  accountBlindBoxInfo = '/client/api/wallet/accountBlindBoxInfo',//获取钱包盲盒列表
  isBound = '/client/api/wallet/isBound',//判断是否绑定钱包
  bindAccount = '/client/api/wallet/bindAccount',//绑定钱包账号
  dataSyncHero = '/client/api/wallet/dataSyncHero',//数据同步（英雄）
  dataSyncGem = '/client/api/wallet/dataSyncGem',//数据同步（宝石）
  dataSyncBox = '/client/api/wallet/dataSyncBox',//数据同步（盲盒）
}

/** 连接钱包api */
export const connectWalletApi = (data: object) => http.post<any>(Api.connectWallet, data);

/** 获取钱包英雄列表api */
export const accountHeroInfoApi = (data: object) => http.post<any>(Api.accountHeroInfo, data);

/** 获取钱包宝石列表api */
export const accountGemInfoApi = (data: object) => http.post<any>(Api.accountGemInfo, data);

/** 获取钱包盲盒列表api */
export const accountBlindBoxInfoApi = (data: object) => http.post<any>(Api.accountBlindBoxInfo, data);

/** 判断是否绑定钱包api */
export const isBoundApi = (data: object) => http.post<any>(Api.isBound, data);

/** 绑定钱包账号api */
export const bindAccountApi = (data: object) => http.post<any>(Api.bindAccount, data);

/** 数据同步（英雄）api */
export const dataSyncHeroApi = (data: object) => http.post<any>(Api.dataSyncHero, data, { headers: { noLoading: true } });

/** 数据同步（宝石）api */
export const dataSyncGemApi = (data: object) => http.post<any>(Api.dataSyncGem, data, { headers: { noLoading: true } });

/** 数据同步（盲盒）api */
export const dataSyncBoxApi = (data: object) => http.post<any>(Api.dataSyncBox, data, { headers: { noLoading: true } });