/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-22 10:41:53
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-28 12:05:47
 */
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Button, Modal, message } from 'antd';
import { interceptStr, interceptDecimal, percentMoney, moneyFormat, onlyNumOnePoint, getAssetsFile } from "@/utils/common";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
// import { getGoldNumApi, withdrawalsRecordApi, withdrawalApplicationApi } from "@/api/modules/wallet";
import BindTips from "@/components/wap/BindTips";
import "./index.less";

const Claim = (props: any) => {
  const { user, global } = props;
  const { address, isBindAccount } = user;
  interface Withdraw {
    goldNum: string | number;
    extractableVal: string;
    withdrawHistoryList: any[];
  }
  const [state, setState] = useState<Withdraw>({
    goldNum: 0,
    extractableVal: "",
    withdrawHistoryList: [
      // {
      //   orderId: '5647385',
      //   applicationTime: '2022-9-30 15:25:36',
      //   approvalTime: '2022-9-30 15:25:36',
      //   applicationAmount: 5000,
      //   applicant: '0xb2de973f303013b679346d1d81bf6a6c65da382e',
      //   approvalStatus: 0
      // },
    ],//申请记录
  });
  const [isApplyLoading, setIsApplyLoading] = useState<boolean>(false);//点击APPLY按钮loading

  useEffect(() => {
    getWallletClaimInfo();
  }, [])

  function getWallletClaimInfo() {
    // getGoldNumApi({ address }).then((res: any) => {
    //   console.log(res)
    //   setState(previousState => {
    //     return {
    //       ...previousState,
    //       goldNum: JSON.parse(res.data.count)
    //     }
    //   });
    // });
    // withdrawalsRecordApi({ applicant: address }).then((res: any) => {
    //   console.log(res)
    //   setState(previousState => {
    //     return {
    //       ...previousState,
    //       withdrawHistoryList: res.rows
    //     }
    //   });
    // });
  }

  // 监听输入框是否为数字，不能为非法字符
  useEffect(() => {
    setState(previousState => {
      return {
        ...previousState,
        extractableVal: onlyNumOnePoint(String(state.extractableVal)),
      }
    });
  }, [state.extractableVal])

  const applyFun = () => {
    setIsApplyLoading(true);
    showFullScreenLoading('Proceeding');
    // withdrawalApplicationApi({ address, count: state.extractableVal }).then((res: any) => {
    //   message.success(res.msg)
    //   setState(previousState => {
    //     return {
    //       ...previousState,
    //       extractableVal: '',
    //     }
    //   });
    //   setIsApplyLoading(false);
    //   tryHideFullScreenLoading();
    // }).catch((err: any) => {
    //   message.warning(err.msg);
    //   setState(previousState => {
    //     return {
    //       ...previousState,
    //       extractableVal: '',
    //     }
    //   });
    //   setIsApplyLoading(false);
    //   tryHideFullScreenLoading();
    // });
  }

  return (
    <>
      <div className="claim_container">
        <div className="main_wrap">
          <div className="total_box">
            <div className="info">
              <div className="txt">
                {/* <span>MHA BALANCE ≈ $0</span> */}
                <span>MHA BALANCE</span>
              </div>
              <span className="edu">{state.goldNum}</span>
            </div>
            <div className="youareadashabi">
              {/* <p className="txt">Extractable MHA ≈ $0</p> */}
              <p className="txt">Extractable MHA</p>
              <div className="extractable_box">
                <div className="input_wrap">
                  <Input defaultValue={state.extractableVal} value={state.extractableVal} onChange={(e) => {
                    setState(previousState => {
                      return {
                        ...previousState,
                        extractableVal: e.target.value,
                      }
                    });
                  }} placeholder="Please enter" className="idty" />
                </div>
                {
                  state.extractableVal == '0' || state.extractableVal == '' || Number(state.extractableVal) > Number(state.goldNum) ? (
                    <Button disabled={true} className="btn btn2">Apply</Button>
                  ) : (
                    <Button onClick={() => applyFun()} loading={isApplyLoading} className="btn btn1">Apply</Button>
                  )
                }
              </div>
            </div>
          </div>
          <div className="order_list_wrap">
            <div className="total_title">Order List</div>
            <div className="order_list">
              {
                state.withdrawHistoryList.length != 0 ? (
                  <ul className="data">
                    {
                      state.withdrawHistoryList.map((item: any, index: number) => {
                        return <li key={index}>
                          <div className="li_item">
                            <p className="tit">Withdraw ID</p>
                            <p className="txt">{item.orderId}</p>
                          </div>
                          <div className="li_item">
                            <p className="tit">Withdraw Time</p>
                            <p className="txt">{item.approvalTime}</p>
                          </div>
                          <div className="li_item">
                            <p className="tit">Amount</p>
                            <p className="txt">{percentMoney(item.applicationAmount, 3)}</p>
                          </div>
                          <div className="li_item">
                            <p className="tit">Request Time</p>
                            <p className="txt">{item.applicationTime}</p>
                          </div>
                          <div className="li_item">
                            <p className="tit">Withdraw Address</p>
                            <p className="txt">{interceptStr(item.applicant, 6)}</p>
                          </div>
                          <div className="li_item">
                            <p className="tit">Status</p>
                            <p className="txt">
                              {item.approvalStatus == 0 ? (<span className="status1">Waiting for Review</span>) : null}
                              {item.approvalStatus == 1 ? (<span className="status2">Approved</span>) : null}
                              {item.approvalStatus == 2 ? (<span className="status3">Withdrawed</span>) : null}
                              {item.approvalStatus == 3 ? (<span className="status4">Withdraw Failed</span>) : null}
                              {item.approvalStatus == 4 ? (<span className="status5">Rejected</span>) : null}
                            </p>
                          </div>
                        </li>
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
          </div>
        </div>
      </div >
      <BindTips dialogVisible={!isBindAccount} navigate={useNavigate()} />
    </>
  );
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Claim);