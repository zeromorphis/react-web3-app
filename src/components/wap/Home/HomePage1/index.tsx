/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-13 14:44:26
 * @LastEditors: 言棠
 * @LastEditTime: 2022-11-01 15:08:16
 */
import { getAssetsFile } from "@/utils/common";

import './index.less'

export default function HomePage1(props: any) {
  return (
    <div className="homePage1_container">
      <div className='homePage1_bg'>
        <div className='top_jianbian' />
        <div className='homePage1_box'>
          <img src={getAssetsFile("images/home/bg1@2x.png")} className="homePage1_bg1" />
          <div className="homePage1_bg2">
            <img src={getAssetsFile("images/home/bg3@2x.png")} className="homePage1_bg3" />
            <div className='qibiao_box'>
              <img src={getAssetsFile('images/home/light_bg@2x.png')} className="zhuhuo_left" />
              <div className="qizhi">
                <img src={getAssetsFile('images/home/bg_tuan@2x.png')} />
              </div>
              <img src={getAssetsFile('images/home/light_bg@2x.png')} className="zhuhuo_right" />
              <div className='bot_jianbian' />
            </div>
          </div>
        </div>
      </div>
      <div className="homePage1_content">
        <div className="txt1 animate__animated animate__fadeInUp">
          <img src={getAssetsFile("images/home/txt1@2x.png")} />
        </div>
        <p className="txt2 animate__animated animate__fadeInUp">
          A DeFi game built on the blockchain designed with useable NFTs
        </p>
        <div className="mimiji animate__animated animate__fadeInUp">
          <div className="miniji_item">
            <img src={getAssetsFile("images/home/icon_battle@2x.png")} />
            <span>Battle</span>
          </div>
          <div className="miniji_item">
            <img src={getAssetsFile("images/home/icon_collect@2x.png")} />
            <span>Collect</span>
          </div>
          <div className="miniji_item">
            <img src={getAssetsFile("images/home/icon_earn@2x.png")} />
            <span>Earn</span>
          </div>
        </div>
        <div className="btn_wrap animate__animated animate__fadeInUp">
          <div className="btn">PLAY NOW</div>
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
      </div>
    </div>
  )
}