/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-13 14:44:26
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-27 18:22:07
 */
import { useRef, useEffect } from 'react'
import { useEcharts } from "@/hooks/useEcharts";
import { EChartsOption } from "echarts";
import { getAssetsFile } from "@/utils/common";
import './index.less'

interface ChartProp {
  color: string;
  lable: string;
  value: number;
}

export default function HomePage5(props: any) {
  // 初始化扇形图
  const rightInfoList: ChartProp[] = [
    {
      color: "#B58143",
      lable: "Stanking Rewards",
      value: 25,
    },
    {
      color: "#CE9851",
      lable: "Advisors",
      value: 20,
    },
    {
      color: "#E3AF61",
      lable: "Core Team",
      value: 15,
    },
    {
      color: "#FBD092",
      lable: "Play to Earn",
      value: 15,
    },
    {
      color: "#FFDCB3",
      lable: "Public Sale",
      value: 10,
    },
    {
      color: "#FFEBD7",
      lable: "Ecosystem Fund",
      value: 10,
    },
    {
      color: "#FFFFFF",
      lable: "Private Sale",
      value: 5,
    },
  ];
  const colors = [
    "#B58143",
    "#CE9851",
    "#E3AF61",
    "#FBD092",
    "#FFDCB3",
    "#FFEBD7",
    "#FFFFFF",
  ];
  const option: EChartsOption = {
    legend: {
      orient: "vertical",
      left: "right",
      top: "center",
    },
    series: [
      {
        name: "TOKEN ALLOCATION",
        type: "pie",
        radius: [0, 220],
        center: ["20%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 0,
        },
        label: {
          show: false,
        },
        color: colors,
        data: rightInfoList.map((val: ChartProp, index: number) => {
          return {
            value: val.value,
          }
        }),
      },
    ],
  };
  const [echartsRef] = useEcharts(option, rightInfoList);

  return (
    <div className="homePage5_container">
      <div className="context">
        <div className="title">
          <img src={getAssetsFile("images/home/token@2x.png")} />
        </div>
        <div className="echarts_wrap">
          <div ref={echartsRef} className="echarts_box"></div>
          <div className="chart_list_info">
            <ul>
              {
                rightInfoList.map((item: any, index: number) => {
                  return (<li key={index} >
                    <div className="left">
                      <div style={{ background: item.color }} className="kuai"></div>
                      <div className="lable">{item.lable}</div>
                    </div>
                    <p>{item.value}</p>
                  </li>)
                })
              }
            </ul>
          </div>
        </div >
      </div >
    </div >
  )
}