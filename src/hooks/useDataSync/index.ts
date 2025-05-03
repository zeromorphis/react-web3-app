/*
 * @Descripttion: 任何你写的代码，超过6个月不去看它，当你再看时，都像是别人写的
 * @version: 5.0.0
 * @Author: 言棠
 * @Date: 2022-10-17 10:18:42
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-24 13:43:23
 */
import { useEffect } from "react";
import { store } from "@/redux";
import { dataSyncHeroApi, dataSyncGemApi, dataSyncBoxApi } from "@/api/modules/wallet";
import sdk from '@/sdk/chanjssdktd.js';


/**
 * @description 拉取链上数据，同步至DB
 */
export const pullChainData = () => {
    // 拉取链上所有盲盒及英雄
    const pullChainBoxAndHeroList = async () => {
        const address = await sdk.chainWeb3.connectMetamask();
        const balanceOf = await sdk.Hero721.balanceOf(address);//当前Token数量
        if (balanceOf == 0) return;
        const getTokens = await sdk.Hero721.getTokens(address);//所有的英雄Token编号
        const boxprice = await sdk.HeroLogic.getHeroBoxPrice();//三种盲盒价格
        let boxList: any[] = [];
        let heroList: any[] = [];
        for (let i = 0; i < balanceOf; i++) {
            let boxheroInfo = await sdk.Hero721.getMeta(getTokens[i]);
            if (!boxheroInfo.opened) {
                boxList.push({
                    boxType: '0',/** 盲盒类型（0 英雄 1 宝石） */
                    qualityType: boxheroInfo.quality_box - 1,/** 品质类型（0 普通 1 稀有 2 史诗） */
                    price: boxprice[boxheroInfo.quality_box - 1],/** 售价 */
                    heroId: getTokens[i],/** 英雄编号 */
                    holder: address,/** 持有人 */
                })
            } else {
                heroList.push({
                    address: address,/** 所有者 */
                    number: getTokens[i],/** 英雄编号 */
                    rarity: boxheroInfo.quality_hero,/** 品质（1N，2R，3SR，4SSR, 5UR, 6EXR） */
                    job: boxheroInfo.job,/** 职业（1坦克、2战士、3射手） */
                    fiveElements: `${boxheroInfo.five1},${boxheroInfo.five2},${boxheroInfo.five3},${boxheroInfo.five4},${boxheroInfo.five5}`,/** 五行属性（金木水火土） */
                    stars: boxheroInfo.stars,/** 星级（0~5） */
                    image: boxheroInfo.appearance,/** 图片地址 */
                    grade: '1',/** 等级（1~70） */
                })
            }
        }
        Promise.all(boxList).then(async (data) => {
            try {
                await dataSyncBoxApi({ blindBoxList: JSON.stringify(data) });
            } catch (error) {
                console.error('Hero盲盒同步失败:', error)
            }
        });
        Promise.all(heroList).then(async (data) => {
            try {
                await dataSyncHeroApi({ heroList: JSON.stringify(data) });
            } catch (error) {
                console.error('Hero英雄同步失败:', error)
            }
        });
        console.log('英雄盲盒:', boxList)
        console.log('英雄:', heroList)
    };

    // 拉取链上所有宝石
    const pullChainGemList = async () => {
        const address = await sdk.chainWeb3.connectMetamask();
        const balanceOf = await sdk.Equip721.balanceOf(address);//当前Token数量
        if (balanceOf == 0) return;
        const getTokens = await sdk.Equip721.getTokens(address);//所有的宝石Token编号
        let gemList: any[] = [];
        for (let i = 0; i < balanceOf; i++) {
            let gemInfo = await sdk.Equip721.getMeta(getTokens[i]);
            gemList.push({
                address: address,/** 所有者 */
                number: getTokens[i],/** 宝石编号 */
                type: gemInfo.quality_equip,/** 宝石类型（1红，2黄，3蓝，4绿，5紫） */
                grade: gemInfo.level,/** 等级（1~9） */
                rarity: gemInfo.level,/** 品质（1N对应等级1，2R对应等级2，3SR对应等级3，4SSR对应等级4, 5UR对应等级5, 6EXR对应等级6~9） */
            })
        }
        Promise.all(gemList).then(async (data) => {
            console.log(data)
            try {
                await dataSyncGemApi({ gemList: JSON.stringify(data) });
            } catch (error) {
                console.error('Gem宝石同步失败:', error)
            }
        });
        console.log('宝石:', gemList)
    };

    const isLogin = store.getState().user.isLogin;
    useEffect(() => {
        if (isLogin) {
            pullChainBoxAndHeroList();
            pullChainGemList();
        }
    }, [isLogin]);

};