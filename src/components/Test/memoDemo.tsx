/*
 * @version: 3.0.0
 * @Date: 2022-09-04 16:16:10
 * @LastEditors: 言棠
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @LastEditTime: 2022-09-09 10:44:13
 * @FilePath: /dev/react-ts-app/src/components/Test/index.tsx
 */

import { useState, memo } from 'react'

const memoDemo = memo(() => {
    console.log('memo子组件被更新了')
    const [state, setState] = useState({
        zy: "啊"
    });
    const setStateFun = () => {
        setState(previousState => {
            return { ...previousState, zy: '哈' }
        });
    }
    return (
        <>
            <div>memo子组件</div>
            <button onClick={setStateFun}>{state.zy}</button>
        </>
    );
});

export default memoDemo;

