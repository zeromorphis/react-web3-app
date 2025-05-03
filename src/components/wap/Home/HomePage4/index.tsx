/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-13 14:44:26
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-31 17:41:55
 */
import { useState, useEffect } from 'react'
import WOW from "wow.js";
// images
import icon_spr from "@/assets/images/home/icon_spr@2x.png";
import icon_spg from "@/assets/images/home/icon_spg@2x.png";
import spr from "@/assets/images/home/spr@2x.png";
import spg from "@/assets/images/home/spg@2x.png";
import './index.less'

const HomePage4 = () => {
  var wow = new WOW({
    boxClass: "wow",
    animateClass: "animated",
    offset: 0,
    mobile: true,
    live: true,
    scrollContainer: null,
    resetAnimation: true,
  });
  useEffect(() => {
    wow.init();
  }, [])

  const [showSpr, setShowSpr] = useState<boolean>(false);
  const [showSpg, setShowSpg] = useState<boolean>(false);

  return (
    <div className="homePage4_container">
      <div className="content_box">
        <div className="sp_wrap" onMouseOver={() => setShowSpr(true)} onMouseOut={() => setShowSpr(false)}>
          <div className="tit_box">
            <img src={spr} />
            <span>EXTRABOLD ITALIC</span>
          </div>
          <div className="txt_box">
            <p>Governance and Staking, For governance and DAO</p>
            <p>In-game PVP leaderboards, Purchase items and blind boxes</p>
          </div>
          <img src={icon_spr} className="sp_img" />
        </div>
        <div className="sp_wrap" onMouseOver={() => setShowSpg(true)} onMouseOut={() => setShowSpg(false)}>
          <div className="tit_box">
            <img src={spg} />
            <span>GAME COIN</span>
          </div>
          <div className="txt_box">
            <p>Governance and Staking, For governance and DAO</p>
            <p>In-game PVP leaderboards, Purchase items and blind boxes</p>
          </div>
          <img src={icon_spg} className="sp_img" />
        </div>
      </div>
    </div>
  )
}

export default HomePage4