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
import icon10 from "@/assets/images/home/921@2x.png";
import icon11 from "@/assets/images/home/922@2x.png";
import icon12 from "@/assets/images/home/923@2x.png";
import icon13 from "@/assets/images/home/924@2x.png";
import icon14 from "@/assets/images/home/925@2x.png";
import icon15 from "@/assets/images/home/926@2x.png";
import icon16 from "@/assets/images/home/927@2x.png";
// 中间空8个
import icon21 from "@/assets/images/home/928@2x.png";
import icon22 from "@/assets/images/home/929@2x.png";
import icon23 from "@/assets/images/home/930@2x.png";
import icon24 from "@/assets/images/home/931@2x.png";
import icon25 from "@/assets/images/home/932@2x.png";
import icon26 from "@/assets/images/home/933@2x.png";
// 中间空8个
import icon31 from "@/assets/images/home/934@2x.png";
import icon32 from "@/assets/images/home/935@2x.png";
import icon33 from "@/assets/images/home/936@2x.png";
import icon34 from "@/assets/images/home/937@2x.png";
import icon35 from "@/assets/images/home/938@2x.png";
import icon36 from "@/assets/images/home/939@2x.png";
import icon37 from "@/assets/images/home/940@2x.png";
import icon38 from "@/assets/images/home/941@2x.png";
import icon39 from "@/assets/images/home/942@2x.png";
import icon40 from "@/assets/images/home/943@2x.png";
import icon41 from "@/assets/images/home/944@2x.png";
import icon42 from "@/assets/images/home/945@2x.png";
import icon43 from "@/assets/images/home/946@2x.png";
import icon44 from "@/assets/images/home/947@2x.png";
import icon45 from "@/assets/images/home/948@2x.png";
import icon46 from "@/assets/images/home/949@2x.png";
import icon47 from "@/assets/images/home/950@2x.png";
import icon48 from "@/assets/images/home/951@2x.png";
import icon49 from "@/assets/images/home/952@2x.png";
import icon50 from "@/assets/images/home/953@2x.png";

import character from "@/assets/images/home/character@2x.png";
import './index.less'

const HomePage3 = () => {
  const randomList: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14,
    15, 20, 21, 22, 23, 24, 25,
    30, 31, 32, 33, 34, 35, 36,
    37, 38, 39, 40, 41, 42, 43,
    44, 45, 46, 47, 48, 49,
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
      url: icon10,
    },
    {
      url: icon11,
    },
    {
      url: icon12,
    },
    {
      url: icon13,
    },
    {
      url: icon14,
    },
    {
      url: icon15,
    },
    {
      url: icon16,
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
      url: null,
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
      url: null,
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
      url: icon31,
    },
    {
      url: icon32,
    },
    {
      url: icon33,
    },
    {
      url: icon34,
    },
    {
      url: icon35,
    },
    {
      url: icon36,
    },
    {
      url: icon37,
    },
    {
      url: icon38,
    },
    {
      url: icon39,
    },
    {
      url: icon40,
    },
    {
      url: icon41,
    },
    {
      url: icon42,
    },
    {
      url: icon43,
    },
    {
      url: icon44,
    },
    {
      url: icon45,
    },
    {
      url: icon46,
    },
    {
      url: icon47,
    },
    {
      url: icon48,
    },
    {
      url: icon49,
    },
    {
      url: icon50,
    },
  ];
  const [randomActive, setRandomActive] = useState<number | null>(null);

  const randomFun = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  setInterval(() => {
    let ind: number = randomFun(0, 42);
    setRandomActive(randomList[ind])
  }, 1400);

  return (
    <div className="homePage3_container">
      <div className="homePage3_box">
        <div className="icon_wrap">
          {
            iconList.map((item: any, index: number) => {
              return (<div key={index} className={randomActive == index ? "icon_item icon_item_active" : "icon_item"} >
                {item.url ? (<img src={item.url} />) : (<div className="noimg" />)}
              </div>)
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