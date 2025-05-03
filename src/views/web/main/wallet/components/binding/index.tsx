/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-22 10:41:53
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-27 17:34:14
 */
import React, { useState } from "react";
import { connect } from "react-redux";
import { LockOutlined, MailOutlined, WalletFilled, MailFilled } from '@ant-design/icons';
import { Input, Button, Modal, Form, message } from 'antd';
import { interceptStr, getAssetsFile } from "@/utils/common";
import { bindAccountApi, isBoundApi } from "@/api/modules/wallet";
import { setBindAccountCode, setGameAccount } from "@/redux/modules/user/action";
import "./index.less";

const Binding: React.FC = (props: any) => {
  const { address, isBindAccount, gameAccount, setBindAccountCode, setGameAccount } = props;
  const [sureBindModel, setSureBindModel] = useState<boolean>(false);//确认绑定提示
  const [bindingForm, setBindingForm] = useState<{ email: string; password: string; }>({ email: '', password: '' });//确认绑定提示
  const [bindingFormRef] = Form.useForm();

  const onBindingFinish = (values: any) => {
    console.log(values);
    setBindingForm(previousState => {
      return {
        ...previousState,
        email: values.email,
        password: values.password
      }
    });
    setSureBindModel(true)
  };

  // 绑定调用事件
  const bindAccountFun = () => {
    let httpData = {
      email: bindingForm.email,
      password: bindingForm.password,
      address: address
    }
    bindAccountApi(httpData).then((res: any) => {
      console.log(res)
      upDateBindAccount();
      message.success('Binding success')
      setBindingForm(previousState => {
        return {
          ...previousState,
          email: '',
          password: ''
        }
      });
      bindingFormRef.resetFields();
      setSureBindModel(false);
    }).catch((err: any) => {
      console.log(err)
      upDateBindAccount();
      message.warning('Binding failed')
      setBindingForm(previousState => {
        return {
          ...previousState,
          email: '',
          password: ''
        }
      });
      bindingFormRef.resetFields();
      setSureBindModel(false)
    });
  };

  // 更新用户是否已经完成绑定
  const upDateBindAccount = () => {
    isBoundApi({ address }).then((res: any) => {
      setBindAccountCode(res.code)
      setGameAccount(res.data.account)
    }).catch((err: any) => {
      setBindAccountCode(err.code)
    });
  }

  return (
    <>
      <div className="binding_container">
        <div className="main_wrap">
          {
            isBindAccount ? (
              <div className="bound">
                <div className="avatar">
                  <img src={getAssetsFile('images/wallet/4.jpg')} />
                </div>
                <div className="info_item">
                  <WalletFilled className="icon" />
                  {/* <img src={getAssetsFile('images/dashboard/12002@2x.png')} /> */}
                  <p>
                    <span>WALLET</span>
                    <span>{interceptStr(address, 12)}</span>
                  </p>
                </div>
                <div className="info_item">
                  <MailFilled className="icon" />
                  {/* <img src={getAssetsFile('images/dashboard/12002@2x.png')} /> */}
                  <p>
                    <span>EMAIL</span>
                    <span>{gameAccount}</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="unbound">
                <p className="title">BINDING</p>
                <Form onFinish={onBindingFinish} form={bindingFormRef} autoComplete="off" name="bound-messages" className="bound-messages">
                  <Form.Item name="email" rules={[
                    { required: true, message: 'Please input your email address!' },
                    { type: 'email', message: 'The input is not valid E-mail!' }
                  ]}>
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} type="text" placeholder="Enter email address" />
                  </Form.Item>
                  <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Enter your password" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="btn">
                      Confirm
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )
          }
        </div>
      </div>
      {/* 确认绑定时的提示信息 */}
      <Modal centered open={sureBindModel} onCancel={() => setSureBindModel(false)} closable={false} footer={null} className="model-model-binding">
        <div className="model_box">
          <p className="title">Bind confirmation</p>
          <p className="des">Are you sure to bind your wallet and email？</p>
          <p className="des">It cannot be changed after binding</p>
          <div className="btn_wrap">
            <Button onClick={() => setSureBindModel(false)} className="btn btn1">Cancle</Button>
            <Button onClick={() => bindAccountFun()} className="btn btn2">Confirm</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: any) => state.user;
const mapDispatchToProps = { setBindAccountCode, setGameAccount };
export default connect(mapStateToProps, mapDispatchToProps)(Binding);
