/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-13 14:44:26
 * @LastEditors: 言棠
 * @LastEditTime: 2022-09-15 10:59:06
 */
import bg1 from '@/assets/images/home/bg1@2x.png'
import bg3 from '@/assets/images/home/bg3@2x.png'
import txt1 from '@/assets/images/home/txt1@2x.png'
import icon_battle from '@/assets/images/home/icon_battle@2x.png'
import icon_collect from '@/assets/images/home/icon_collect@2x.png'
import icon_earn from '@/assets/images/home/icon_earn@2x.png'
import bg_tuan from '@/assets/images/home/bg_tuan@2x.png'
import light_bg from '@/assets/images/home/light_bg@2x.png'

import './index.less'

export default function HomePage1(props: any) {
  return (
    <div className="homePage1_container">
      <img src={bg1} className="homePage1_bg1" />
      <div className="homePage1_bg2">
        <img src={bg3} className="homePage1_bg3" />
        <div className="homePage1_content">
          <div className="txt1 animate__animated animate__fadeInUp">
            <img src={txt1} />
          </div>
          <p className="txt2 animate__animated animate__fadeInUp">
            A DeFi game built on the blockchain designed with useable NFTs
          </p>
          <div className="mimiji animate__animated animate__fadeInUp">
            <div className="miniji_item">
              <img src={icon_battle} />
              <span>Battle</span>
            </div>
            <div className="miniji_item">
              <img src={icon_collect} />
              <span>Collect</span>
            </div>
            <div className="miniji_item">
              <img src={icon_earn} />
              <span>Earn</span>
            </div>
          </div>
          <div className="qizhi">
            <img src={bg_tuan} />
          </div>
          <img src={light_bg} className="zhuhuo_left" />
          <img src={light_bg} className="zhuhuo_right" />
          <div className="btn_wrap animate__animated animate__fadeInUp">
            <div className="btn">PLAY NOW</div>
          </div>
        </div>
      </div>
    </div>
  )
}