/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-06-08 10:12:50
 * @LastEditors: 言棠
 * @LastEditTime: 2022-09-26 10:21:04
 */
import http from "@/api";

enum Api {
  getHeroInfo = '/client/api/hero/getHeroInfo',
}
/** 查询英雄详细信息api */
export const getHeroInfoApi = (data: object) => http.post<any>(Api.getHeroInfo, data);