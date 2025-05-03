/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-13 14:44:26
 * @LastEditors: 言棠
 * @LastEditTime: 2022-11-01 14:59:07
 */
import { getAssetsFile } from "@/utils/common";

import './index.less'

export default function HomeFooter(props: any) {
  return (
    <div className="homeFooter_container">
      <div className="logo_wrap">
        <img src={getAssetsFile("images/home/logo@2x.png")} />
      </div>
      <div className="social_contact">
        <div className="shejiao">
          <img src={getAssetsFile("images/home/icon_tele@2x.png")} className="hover_show" />
        </div>
        <div className="shejiao">
          <img src={getAssetsFile("images/home/icon_discode@2x.png")} className="hover_show" />
        </div>
        <div className="shejiao">
          <img src={getAssetsFile("images/home/icon_twitter@2x.png")} className="hover_show" />
        </div>
        <div className="shejiao">
          <img src={getAssetsFile("images/home/icon_medium@2x.png")} className="hover_show" />
        </div>
      </div>
      <div className="related_information">
        <img src={getAssetsFile("images/home/logo_ironflag@2x.png")} />
        <span className="fu">©</span>
        <span className="text">IRONFLAG 2022 All right reserved</span>
      </div>
    </div>
  )
}