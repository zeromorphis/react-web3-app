/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-13 14:44:26
 * @LastEditors: 言棠
 * @LastEditTime: 2022-11-01 15:14:31
 */
import { getAssetsFile } from "@/utils/common";

import './index.less'

const HomePage2 = () => {
  return (
    <div className="homePage2_container">
      <div className="info_box">
        <div className="tit_wrap">
          <img src={getAssetsFile('images/home/about@2x.png')} />
          <span>META KING TD</span>
        </div>
        <div className="txt_wrap">
          <p className="txt">In SG, players need to gather 5 heroes before they can engage in PVE and PVP battles</p>
          <p className="txt">In PVE mode, players need to push levels in order, kill all enemies in the level to pass the level and get rewards. The higher the level, the better the rewards.</p>
          <p className="txt w250">In PVP mode, players will randomly match a player based on the current arena points. After defeating all heroes of the opponent, they will win and get rewards and points.</p>
        </div>
        <img src={getAssetsFile('images/home/Castle@2x.png')} className="right_main_img" />
      </div>
      <div className="card_wrap">
        <div className="card_item">
          <p>Play 2 Earn</p>
          <p className="txt">earning tokens by playing games and then trade on the market.</p>
        </div>
        <div className="card_item">
          <p>Exhibition</p>
          <p className="txt">Collect a variety of uniquely shaped hero to show them to your friends and other players through social platforms.</p>
        </div>
        <div className="card_item">
          <p>Expedition</p>
          <p className="txt">Every hero has genetic characteristics, make a good arrangement of your hero team and win rewards with your team.</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage2