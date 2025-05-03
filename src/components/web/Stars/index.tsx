/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-13 14:44:26
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-08 14:25:51
 */
import { useState, useEffect } from 'react'
import { getAssetsFile } from "@/utils/common";

import './index.less'

function Stars(props: any) {
  const { stars } = props;
  const [starList, setStarList] = useState<number[]>([])
  useEffect(() => {
    switch (stars) {
      case 1:
        setStarList([1])
        break;
      case '1':
        setStarList([1])
        break;
      case 2:
        setStarList([1, 2])
        break;
      case '2':
        setStarList([1, 2])
        break;
      case 3:
        setStarList([1, 2, 3])
        break;
      case '3':
        setStarList([1, 2, 3])
        break;
      case 4:
        setStarList([1, 2, 3, 4])
        break;
      case '4':
        setStarList([1, 2, 3, 4])
        break;
      case 5:
        setStarList([1, 2, 3, 4, 5])
        break;
      case '5':
        setStarList([1, 2, 3, 4, 5])
        break;
      default:
        setStarList([])
        break;
    }
  }, [stars])
  return (
    <>
      {
        starList.length != 0 ? (
          <div className='web_stars_container' >
            <div className="star">
              {
                starList.map((e: any, i: number) => {
                  return (<img key={i} src={getAssetsFile('images/dashboard/xingxing@2x.png')} />)
                })
              }
            </div>
          </div >
        ) : null
      }
    </>
  )
}

export default Stars;