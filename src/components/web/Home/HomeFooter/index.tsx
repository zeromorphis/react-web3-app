/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-13 14:44:26
 * @LastEditors: 言棠
 * @LastEditTime: 2022-09-15 10:50:38
 */
import cooperation from '@/assets/images/home/cooperation@2x.png'
import logo_certih from '@/assets/images/home/logo_certih@2x.png'
import logo_CMC from '@/assets/images/home/logo_CMC@2x.png'
import logo_binance_chain from '@/assets/images/home/logo_binance_chain@2x.png'
import logo from '@/assets/images/home/logo@2x.png'
import icon_tele from '@/assets/images/home/icon_tele@2x.png'
import icon_discode from '@/assets/images/home/icon_discode@2x.png'
import icon_twitter from '@/assets/images/home/icon_twitter@2x.png'
import icon_medium from '@/assets/images/home/icon_medium@2x.png'
import logo_ironflag from '@/assets/images/home/logo_ironflag@2x.png'
import './index.less'

export default function HomeFooter(props: any) {
  return (
    <div className="homeFooter_container">
      <div className="centent_box">
        <div className="tit_wrap">
          <img src={cooperation} />
        </div>
        <div className="link_wrap">
          <img src={logo_certih} />
          <img src={logo_CMC} />
          <img src={logo_binance_chain} />
        </div>
        <div className="logo_wrap">
          <img src={logo} />
        </div>
        <div className="social_contact">
          <div className="shejiao">
            <img src={icon_tele} className="hover_show" />
          </div>
          <div className="shejiao">
            <img src={icon_discode} className="hover_show" />
          </div>
          <div className="shejiao">
            <img src={icon_twitter} className="hover_show" />
          </div>
          <div className="shejiao">
            <img src={icon_medium} className="hover_show" />
          </div>
        </div>
        <div className="bot_wrap_box">
          <div className="related_information">
            <img src={logo_ironflag} />
            <span className="fu">©</span>
            <span className="text">IRONFLAG 2022 All right reserved</span>
          </div>
        </div>
      </div>
    </div>
  )
}