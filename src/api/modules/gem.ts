import http from "@/api";

enum Api {
  getGemInfo = '/client/api/gem/getGemInfo',
}
/** 查询宝石详细信息api */
export const getGemInfoApi = (data: object) => http.post<any>(Api.getGemInfo, data);