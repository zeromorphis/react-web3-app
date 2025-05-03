/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-06-08 10:12:50
 * @LastEditors: 言棠
 * @LastEditTime: 2022-09-22 15:55:44
 */
import http from "@/api";

enum Api {
  getHeroList = '/client/api/market/getHeroList',//查询英雄市场列表信息
  heroShelf = '/client/api/market/heroShelf',//英雄上架
  buyHero = '/client/api/market/buyHero',//英雄购买
  heroTakeDown = '/client/api/market/heroTakeDown',//英雄下架

  getGemList = '/client/api/market/getGemList',//查询宝石市场列表信息
  gemShelf = '/client/api/market/gemShelf',//宝石上架
  buyGem = '/client/api/market/buyGem',//宝石购买
  gemTakeDown = '/client/api/market/gemTakeDown',//宝石下架

  getHeroSales = '/client/api/market/getHeroSales',//仪表盘信息
}
/** 查询英雄市场列表信息api */
export const getHeroListApi = (params: object) => http.get<any>(Api.getHeroList, params);

/** 英雄上架api */
export const heroShelfApi = (data: object) => http.post<any>(Api.heroShelf, data);

/** 英雄购买api */
export const buyHeroApi = (data: object) => http.post<any>(Api.buyHero, data);

/** 英雄下架api */
export const heroTakeDownApi = (data: object) => http.put<any>(Api.heroTakeDown, data);

/** 查询宝石市场列表信息api */
export const getGemListApi = (params: object) => http.get<any>(Api.getGemList, params);

/** 宝石上架api */
export const gemShelfApi = (data: object) => http.post<any>(Api.gemShelf, data);

/** 宝石购买api */
export const buyGemApi = (data: object) => http.post<any>(Api.buyGem, data);

/** 宝石下架api */
export const gemTakeDownApi = (data: object) => http.put<any>(Api.gemTakeDown, data);

/** 仪表盘信息api */
export const getHeroSalesApi = (params: object) => http.get<any>(Api.getHeroSales, params);