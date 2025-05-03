/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-09-09 15:24:29
 * @LastEditors: 言棠
 * @LastEditTime: 2022-11-09 16:53:56
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setToken } from "@/redux/modules/user/action";
type PropType = {
    token: string;
    language: string;
    setToken: (token: string) => void;
};
type StateType = {
    msg: string;
    dash: string;
    date: Date;
};
class classDemo extends Component<PropType, StateType> {
    constructor(props: any) {
        console.log("constructor============1");
        super(props);
        this.state = {
            msg: '这是更新前',
            dash: '',
            date: new Date()
        }
        this.setDate = this.setDate.bind(this);
    }
    componentDidMount() {
        console.log("componentDidMount============3");
        // this.timerID = setInterval(() => this.tick(),1000);
    }
    componentDidUpdate() {
        console.log('更新时');//此处需shouldComponentUpdate返回true才会执行
    }
    componentWillUnmount() {
        console.log('卸载时');//卸载当前组件时执行
        // clearInterval(this.timerID);
    }
    tick() {
        this.setState({
            date: new Date()
        });
    }
    componentDidCatch() {
        console.log("捕捉到异常了");
    }
    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        console.log(nextProps, prevState, "纯函数,静态方法");
        // return null
        return { dash: nextProps.dash };//此处操作会将父级元素的props赋值给当前state。在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
    }
    getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
        console.log(prevProps, prevState, "需要搭配 componentDidUpdate来使用");//即将更新，在最近一次渲染输出componentDidUpdate（提交到 DOM 节点）之前调用
        return null
    }
    shouldComponentUpdate() {
        console.log('是否更新当前组件数据');//设置true即允许更新，false则不允许更新(是否会执行componentDidUpdate生命周期)
        return true
    }
    setDate = () => {
        const { token, setToken } = this.props;
        setToken(token + 1)
        console.log(this)
        this.setState({
            msg: '这是更新后'
        })
    }
    render() {
        console.log("render============2");
        const { token, language } = this.props
        return (
            <div>
                <button onClick={this.setDate}>{this.state.msg}</button>
                <h2>现在时间是：{this.state.date.toLocaleTimeString()}</h2>
                <p>{token}---{language}</p>
            </div>
        )
    }
}


const mapStateToProps = (state: any) => state.user;
const mapDispatchToProps = { setToken };
export default connect(mapStateToProps, mapDispatchToProps)(classDemo);