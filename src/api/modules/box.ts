/*
 * @Descripttion: 任何你写的代码，超过6个月不去看它，当你再看时，都像是别人写的
 * @version: 5.0.0
 * @Author: 言棠
 * @Date: 2022-10-11 10:54:54
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-11 11:00:25
 */
import http from "@/api";

enum Api {
  buyBlindBox = '/client/api/blindBox/buyBlindBox',
  openHeroBlindBox = '/client/api/blindBox/openHeroBlindBox',
  openGemBlindBox = '/client/api/blindBox/openGemBlindBox',
}

/** 购买盲盒api */
export const buyBlindBoxApi = (data: object) => http.post<any>(Api.buyBlindBox, data);

/** 开盲盒（英雄） */
export const openHeroBlindBoxApi = (data: object) => http.post<any>(Api.openHeroBlindBox, data);

/** 开盲盒（宝石） */
export const openGemBlindBoxApi = (data: object) => http.post<any>(Api.openGemBlindBox, data);