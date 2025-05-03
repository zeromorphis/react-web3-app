/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-22 10:41:53
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-27 19:00:00
 */
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from 'antd';
import { interceptStr, interceptDecimal, percentMoney, getAssetsFile } from "@/utils/common";
// import { getGoldNumApi, getDiamondNumApi } from "@/api/modules/wallet";
import sdk from '@/sdk/chanjssdktd.js';
import BindTips from "@/components/wap/BindTips";
import "./index.less";

const Asset = (props: any) => {
  const { user, global } = props;
  const { address, bnbBalance, isBindAccount } = user;
  const { exchangeRate } = global;
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState({
    goldNum: 0,
    diamondNum: 0,
    totalBalance: 0,
  })

  useEffect(() => {
    setState(previousState => {
      return {
        ...previousState,
        totalBalance: (Number(bnbBalance) * Number(exchangeRate))
      }
    });
  }, [bnbBalance])

  useEffect(() => {
    getWallletClaimInfo();
  }, [])

  function getWallletClaimInfo() {
    console.log(sdk)
    // getGoldNumApi({ address }).then((res: any) => {
    //   console.log(res)
    //   setState(previousState => {
    //     return {
    //       ...previousState,
    //       goldNum: JSON.parse(res.data.count)
    //     }
    //   });
    // });
    // getDiamondNumApi({ address }).then((res: any) => {
    //   console.log(res)
    //   setState(previousState => {
    //     return {
    //       ...previousState,
    //       diamondNum: JSON.parse(res.data.count)
    //     }
    //   });
    // });
  }

  return (
    <>
      <div className="asset_container">
        <div className="main_wrap">
          <div className="total_box">
            <p className="tit">Total Asset</p>
            <p className="num">≈ ${percentMoney(state.totalBalance, 4)}</p>
          </div>
          <div className="bi_box">
            <div className="left">
              <img src={getAssetsFile("images/public/logo_bnb@2x.png")} />
              <div className="num_wrap">
                <p>BNB</p>
                <p>{percentMoney(bnbBalance, 4)}</p>
                <p>≈ ${percentMoney(Number(bnbBalance) * Number(exchangeRate), 4)}</p>
              </div>
            </div>
          </div>
          <div className="bi_box">
            <div className="left">
              <img src={getAssetsFile("images/wallet/icon_spr@2x.png")} />
              <div className="num_wrap">
                <p>SPR</p>
                <p>{percentMoney(state.goldNum, 4)}</p>
                <p>≈ ${percentMoney(Number(state.goldNum) * Number(exchangeRate), 4)}</p>
              </div>
            </div>
            <div className="right">
              <Button className="btn">Swap</Button>
            </div>
          </div>
          <div className="bi_box">
            <div className="left">
              <img src={getAssetsFile("images/wallet/icon_spg@2x.png")} />
              <div className="num_wrap">
                <p>SPG</p>
                <p>{percentMoney(state.diamondNum, 4)}</p>
                <p>≈ ${percentMoney(Number(state.diamondNum) * Number(exchangeRate), 4)}</p>
              </div>
            </div>
            <div className="right">
              <Button className="btn">Swap</Button>
            </div>
          </div>
        </div>
      </div>
      <BindTips dialogVisible={!isBindAccount} navigate={useNavigate()} />
    </>
  );
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Asset);
