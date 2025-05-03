/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-22 10:41:53
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-10 13:46:19
 */
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Modal, message } from 'antd';
import { interceptStr, interceptDecimal, percentMoney, moneyFormat, getAssetsFile } from "@/utils/common";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import Stars from "@/components/web/Stars";

import "./index.less";

const StarUp = (props: any) => {
  const { user, global } = props;
  const { address, isLogin, bnbBalance } = user;
  const { exchangeRate } = global;
  const navigate = useNavigate();
  const location = useLocation();

  const [firstHasFrame, setFirstHasFrame] = useState<boolean>(false);//第一个框内是否选择NFT
  const [firstModel, setFirstModel] = useState<boolean>(false);//第一个选择NFT列表弹框
  const [chooseFirstInfo, setChooseFirstInfo] = useState<any>({});//第一个选择后的内容
  const [firstNFTList, setFirstNFTList] = useState<any[]>(
    [
      {
        name: 'Heartfilia',
        rarity: 0,//品质-0,1,2,3
        stars: 1,
        image: 'images/dashboard/13012@2x.png',
      },
      {
        name: 'Kazuhiko',
        rarity: 3,//品质-0,1,2,3
        stars: 2,
        image: 'images/dashboard/13015@2x.png',
      },
      {
        name: 'Aanandini',
        rarity: 1,//品质-0,1,2,3
        stars: 4,
        image: 'images/dashboard/23002@2x.png',
      },
      {
        name: 'Adefunmike',
        rarity: 1,//品质-0,1,2,3
        stars: 2,
        image: 'images/dashboard/12002@2x.png',
      },
      {
        name: 'Heartfilia',
        rarity: 0,//品质-0,1,2,3
        stars: 1,
        image: 'images/dashboard/23003@2x.png',
      },
      {
        name: 'Kazuhiko',
        rarity: 3,//品质-0,1,2,3
        stars: 2,
        image: 'images/dashboard/12002@2x.png',
      },
      {
        name: 'Rachelanne',
        rarity: 0,//品质-0,1,2,3
        stars: 5,
        image: 'images/dashboard/12002@2x.png',
      },
      {
        name: 'Aanandini',
        rarity: 2,//品质-0,1,2,3
        stars: 3,
        image: 'images/dashboard/23003@2x.png',
      }
    ]
  );//第一个选择NFT列表

  const [showLastFrame, setShowLastFrame] = useState<boolean>(false);//第二个框是否显示(取决于第一个框是否已选择)
  const [lastHasFrame, setLastHasFrame] = useState<boolean>(false);//第二个框内是否选择NFT
  const [lastModel, setLastModel] = useState<boolean>(false);//第二个选择NFT列表弹框
  const [chooseLastInfo, setChooseLastInfo] = useState<any>({});//第二个选择后的内容
  const [lastNFTList, setLastNFTList] = useState<any[]>(
    [
      {
        name: 'Heartfilia',
        rarity: 0,//品质-0,1,2,3
        stars: 1,
        image: 'images/dashboard/13012@2x.png',
      },
      {
        name: 'Kazuhiko',
        rarity: 3,//品质-0,1,2,3
        stars: 2,
        image: 'images/dashboard/13015@2x.png',
      },
      {
        name: 'Aanandini',
        rarity: 1,//品质-0,1,2,3
        stars: 4,
        image: 'images/dashboard/23002@2x.png',
      },
    ]
  );//第二个选择NFT列表


  // 第一个选择NFT列表-选择某个NFT操作
  async function chooseFirstNFTItemFun(e: object, i: number) {
    console.log('左侧选中内容', e, i)
    setChooseFirstInfo(e);//内容赋值
    setFirstModel(false);//关闭NFT列表弹框
    setFirstHasFrame(true);//设置第一个为已选择状态
    setShowLastFrame(true);//设置第二个为可选择状态

    setLastHasFrame(false);//切换为未选择状态
    setChooseLastInfo({});//左侧若重新选择，右侧则置空处理
  };

  // 第二个选择NFT列表-选择某个NFT操作
  async function chooseLastNFTItemFun(e: object, i: number) {
    console.log('右侧选中内容', e, i)
    setChooseLastInfo(e);//内容赋值
    setLastModel(false);//关闭NFT列表弹框
    setLastHasFrame(true);//设置第二个为已选择状态
  };

  // 升级按钮
  async function starUpFun() {

  }

  return (
    <>
      <div className="starup_container">
        <div className="main_wrap">
          <div className="title">
            <img src={getAssetsFile('images/starup/NFT-Star-Up@2x.png')} />
          </div>
          <div className="star-up-box">
            <div className="item_box">
              {
                firstHasFrame ? (
                  <div className="has_wrap">
                    <div className="first_row">
                      <p className="left">
                        <span>{chooseFirstInfo.name}</span>
                        <Stars stars={chooseFirstInfo.stars} />
                      </p>
                      <p className="right">
                        {chooseFirstInfo.rarity == 1 ? (<img src={getAssetsFile('images/dashboard/pinzhi_n@2x.png')} className='zhiye' />) : null}
                        {chooseFirstInfo.rarity == 2 ? (<img src={getAssetsFile('images/dashboard/pinzhi_r@2x.png')} className='zhiye' />) : null}
                        {chooseFirstInfo.rarity == 3 ? (<img src={getAssetsFile('images/dashboard/pinzhi_sr@2x.png')} className='zhiye' />) : null}
                        {chooseFirstInfo.rarity == 4 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ssr@2x.png')} className='zhiye' />) : null}
                        {chooseFirstInfo.rarity == 5 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ur@2x.png')} className='zhiye' />) : null}
                        {chooseFirstInfo.rarity == 6 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='zhiye' />) : null}
                      </p>
                    </div>
                    <div className="hero_img_wrap">
                      <img src={getAssetsFile(chooseFirstInfo.image)} />
                    </div>
                    <div onClick={() => setFirstModel(true)} className="choose_btn">Change NFT</div>
                  </div>
                ) : (
                  <div onClick={() => setFirstModel(true)} className="not_wrap">
                    <img src={getAssetsFile('images/starup/add.png')} />
                    <p>Choose the NFT<br />you want to Star-Up</p>
                  </div>
                )
              }
            </div>
            {
              showLastFrame ? (
                <div className="item_box last_item_box">
                  {
                    lastHasFrame ? (
                      <div className="has_wrap">
                        <div className="first_row">
                          <p className="left">
                            <span>{chooseLastInfo.name}</span>
                            <Stars stars={chooseLastInfo.stars} />
                          </p>
                          <p className="right">
                            {chooseLastInfo.rarity == 1 ? (<img src={getAssetsFile('images/dashboard/pinzhi_n@2x.png')} className='zhiye' />) : null}
                            {chooseLastInfo.rarity == 2 ? (<img src={getAssetsFile('images/dashboard/pinzhi_r@2x.png')} className='zhiye' />) : null}
                            {chooseLastInfo.rarity == 3 ? (<img src={getAssetsFile('images/dashboard/pinzhi_sr@2x.png')} className='zhiye' />) : null}
                            {chooseLastInfo.rarity == 4 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ssr@2x.png')} className='zhiye' />) : null}
                            {chooseLastInfo.rarity == 5 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ur@2x.png')} className='zhiye' />) : null}
                            {chooseLastInfo.rarity == 6 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} className='zhiye' />) : null}
                          </p>
                        </div>
                        <div className="hero_img_wrap">
                          <img src={getAssetsFile(chooseLastInfo.image)} />
                        </div>
                        <div onClick={() => setLastModel(true)} className="choose_btn">Change NFT</div>
                      </div>
                    ) : (
                      <div onClick={() => setLastModel(true)} className="not_wrap">
                        <img src={getAssetsFile('images/starup/add.png')} />
                        <p>Choose the NFT<br />you want to Star-Up</p>
                      </div>
                    )
                  }
                </div>) : null
            }
          </div>
          <div className="btn_wrap">
            {
              firstHasFrame && lastHasFrame ? (<Button onClick={() => starUpFun()} className="btn">Star-Up</Button>) : null
            }
          </div>
        </div>
      </div>
      {/* 左侧选择列表弹框 */}
      <Modal centered open={firstModel} onCancel={() => setFirstModel(false)} footer={null} className="model-model-starup">
        <div className="model_box">
          <p className="title">Select NFT</p>
          <ul className="title">
            <li className="w28">Name</li>
            <li className="w23 textcenter">Rarity</li>
            <li className="w23 textcenter">Star</li>
            <li className="w26 textright">Operate</li>
          </ul>
          {
            firstNFTList.length != 0 ? (
              <ul className="list">
                {
                  firstNFTList.map((item: any, index: number) => {
                    return (
                      <li key={index}>
                        <p className="w28 name">
                          <img src={getAssetsFile(item.image)} />
                          <span>{item.name}</span>
                        </p>
                        <p className="w23 pinzhi">
                          {item.rarity == 1 ? (<img src={getAssetsFile('images/dashboard/pinzhi_n@2x.png')} />) : null}
                          {item.rarity == 2 ? (<img src={getAssetsFile('images/dashboard/pinzhi_r@2x.png')} />) : null}
                          {item.rarity == 3 ? (<img src={getAssetsFile('images/dashboard/pinzhi_sr@2x.png')} />) : null}
                          {item.rarity == 4 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ssr@2x.png')} />) : null}
                          {item.rarity == 5 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ur@2x.png')} />) : null}
                          {item.rarity == 6 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} />) : null}
                        </p>
                        <p className="w23 stars">{item.stars}</p>
                        <div className="w26 btn_wrap">
                          <div onClick={() => chooseFirstNFTItemFun(item, index)} className="choose_btn">Select</div>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            ) : (
              <div className="noData">
                <img src={getAssetsFile("images/public/nodata@2x.png")} />
                <p>No Data</p>
              </div>
            )
          }
        </div>
      </Modal>
      {/* 右侧选择列表弹框 */}
      <Modal centered open={lastModel} onCancel={() => setLastModel(false)} footer={null} className="model-model-starup">
        <div className="model_box">
          <p className="title">Select NFT</p>
          <ul className="title">
            <li className="w28">Name</li>
            <li className="w23 textcenter">Rarity</li>
            <li className="w23 textcenter">Star</li>
            <li className="w26 textright">Operate</li>
          </ul>
          {
            lastNFTList.length != 0 ? (
              <ul className="list">
                {
                  lastNFTList.map((item: any, index: number) => {
                    return (
                      <li key={index}>
                        <p className="w28 name">
                          <img src={getAssetsFile(item.image)} />
                          <span>{item.name}</span>
                        </p>
                        <p className="w23 pinzhi">
                          {item.rarity == 1 ? (<img src={getAssetsFile('images/dashboard/pinzhi_n@2x.png')} />) : null}
                          {item.rarity == 2 ? (<img src={getAssetsFile('images/dashboard/pinzhi_r@2x.png')} />) : null}
                          {item.rarity == 3 ? (<img src={getAssetsFile('images/dashboard/pinzhi_sr@2x.png')} />) : null}
                          {item.rarity == 4 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ssr@2x.png')} />) : null}
                          {item.rarity == 5 ? (<img src={getAssetsFile('images/dashboard/pinzhi_ur@2x.png')} />) : null}
                          {item.rarity == 6 ? (<img src={getAssetsFile('images/dashboard/pinzhi_exr@2x.png')} />) : null}
                        </p>
                        <p className="w23 stars">{item.stars}</p>
                        <div className="w26 btn_wrap">
                          <div onClick={() => chooseLastNFTItemFun(item, index)} className="choose_btn">Select</div>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            ) : (
              <div className="noData">
                <img src={getAssetsFile("images/public/nodata@2x.png")} />
                <p>No Data</p>
              </div>
            )
          }
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(StarUp);
