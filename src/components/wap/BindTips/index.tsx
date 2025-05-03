/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-09 15:24:29
 * @LastEditors: 言棠
 * @LastEditTime: 2022-10-27 16:46:47
 */
import { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { CenterPopup } from 'antd-mobile';
import "./index.less";

type StateType = {
    bindingStateInfoModel: boolean;
};
type propType = {
    dialogVisible: boolean;
    navigate: (to: any) => void;
};

class BindTips extends Component<propType, StateType> {
    constructor(props: any) {
        console.log("constructor============1");
        super(props);
        this.state = {
            bindingStateInfoModel: false,
        }
    }
    componentDidMount() {
        console.log("componentDidMount============3", this);
        this.setBindingStateInfoModel(this.props.dialogVisible)
    }
    componentDidUpdate() {
        console.log('更新时');//此处需shouldComponentUpdate返回true才会执行
    }
    componentWillUnmount() {
        console.log('卸载时');//卸载当前组件时执行
    }
    componentDidCatch() {
        console.log("捕捉到异常了");
    }
    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        // console.log(nextProps, prevState, "纯函数,静态方法");
        // return null
        return { dash: nextProps.dash };//此处操作会将父级元素的props赋值给当前state。在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
    }
    getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
        // console.log(prevProps, prevState, "需要搭配 componentDidUpdate来使用");//即将更新，在最近一次渲染输出componentDidUpdate（提交到 DOM 节点）之前调用
        return null
    }
    shouldComponentUpdate() {
        // console.log('是否更新当前组件数据');//设置true即允许更新，false则不允许更新(是否会执行componentDidUpdate生命周期)
        return true
    }
    setBindingStateInfoModel = (show: boolean) => {
        console.log(this)
        this.setState({ bindingStateInfoModel: show }, () => {
            console.log('写入成功')
        })
    }
    navigateTo = () => {
        this.setBindingStateInfoModel(false)
        this.props.navigate('/main/wallet/binding');
    }
    render() {
        console.log("render============2");
        return (
            <CenterPopup visible={this.state.bindingStateInfoModel} onMaskClick={() => this.setBindingStateInfoModel(false)} className="model-model-bindtips">
                <div className="model_box">
                    <p className="title">Note</p>
                    <p className="des">Link Wallet with your Game Account</p>
                    <div className="btn_wrap">
                        <Button onClick={() => this.setBindingStateInfoModel(false)} className="btn btn1">Cancle</Button>
                        <Button onClick={this.navigateTo.bind(this)} className="btn btn2">Link Now</Button>
                    </div>
                </div>
            </CenterPopup>
        )
    }
}


const mapStateToProps = (state: any) => state.user;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(BindTips);