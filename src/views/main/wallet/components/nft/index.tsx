/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-22 10:41:53
 * @LastEditors: YT
 * @LastEditTime: 2025-05-13 20:32:10
 */
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import "./index.less";

const Nft = (props: any) => {
  const { user, global } = props;
  const { address } = user;
  
  return (
    <>
      <div className="nft_container">
        { address }
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Nft);
