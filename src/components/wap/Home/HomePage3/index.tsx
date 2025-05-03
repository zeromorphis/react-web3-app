import { useState } from 'react'

import icon1 from "@/assets/images/home/912@2x.png";
import icon2 from "@/assets/images/home/913@2x.png";
import icon3 from "@/assets/images/home/914@2x.png";
import icon4 from "@/assets/images/home/915@2x.png";
import icon5 from "@/assets/images/home/916@2x.png";
import icon6 from "@/assets/images/home/917@2x.png";
import icon7 from "@/assets/images/home/918@2x.png";
import icon8 from "@/assets/images/home/919@2x.png";
import icon9 from "@/assets/images/home/920@2x.png";
// 中间空3个
import icon13 from "@/assets/images/home/924@2x.png";
// 中间空3个
import icon17 from "@/assets/images/home/936@2x.png";
import icon18 from "@/assets/images/home/937@2x.png";
import icon19 from "@/assets/images/home/938@2x.png";
import icon20 from "@/assets/images/home/939@2x.png";
import icon21 from "@/assets/images/home/928@2x.png";
import icon22 from "@/assets/images/home/929@2x.png";
import icon23 from "@/assets/images/home/930@2x.png";
import icon24 from "@/assets/images/home/931@2x.png";
import icon25 from "@/assets/images/home/932@2x.png";
import icon26 from "@/assets/images/home/933@2x.png";
import icon27 from "@/assets/images/home/940@2x.png";
import icon28 from "@/assets/images/home/941@2x.png";
import icon29 from "@/assets/images/home/942@2x.png";
import icon30 from "@/assets/images/home/943@2x.png";
import icon31 from "@/assets/images/home/934@2x.png";
import icon32 from "@/assets/images/home/935@2x.png";

import character from "@/assets/images/home/character@2x.png";
import './index.less'

const HomePage3 = () => {
  const randomList: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32
  ];
  const iconList: object[] = [
    {
      url: icon1,
    },
    {
      url: icon2,
    },
    {
      url: icon3,
    },
    {
      url: icon4,
    },
    {
      url: icon5,
    },
    {
      url: icon6,
    },
    {
      url: icon7,
    },
    {
      url: icon8,
    },
    {
      url: icon9,
    },
    {
      url: null,
    },
    {
      url: null,
    },
    {
      url: null,
    },
    {
      url: icon13,
    },
    {
      url: null,
    },
    {
      url: null,
    },
    {
      url: null,
    },
    {
      url: icon17,
    },
    {
      url: icon18,
    },
    {
      url: icon19,
    },
    {
      url: icon20,
    },
    {
      url: icon21,
    },
    {
      url: icon22,
    },
    {
      url: icon23,
    },
    {
      url: icon24,
    },
    {
      url: icon25,
    },
    {
      url: icon26,
    },
    {
      url: icon27,
    },
    {
      url: icon28,
    },
    {
      url: icon29,
    },
    {
      url: icon30,
    },
    {
      url: icon31,
    },
    {
      url: icon32,
    },
  ];
  const [randomActive, setRandomActive] = useState<number | null>(null);

  const randomFun = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  setInterval(() => {
    let ind: number = randomFun(0, 26);
    setRandomActive(randomList[ind])
  }, 1400);

  return (
    <div className="homePage3_container">
      <div className="homePage3_box">
        <div className="icon_wrap">
          {
            iconList.map((item: any, index: number) => {
              return (
                <div key={index} className={["icon_item", index === randomActive ? "icon_item_active" : null].join(' ')}>
                  {item.url ? (<img src={item.url} />) : (<div className="noimg" />)}
                </div>
              )
            })
          }
        </div>
        <div className="right_txt_box">
          <img src={character} />
          <div className="txt_wrap">
            <p>The hero image is highly free,</p>
            <p>from head to toe, from skeleton to skin color,</p>
            <p>everything can be freely transformed.</p>
            <p>16 independent modules,</p>
            <p>casting unique heroes and obtaining higher value</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage3