import React,{useState,useMemo}from 'react';
import {storiesOf} from '@storybook/react';
import {Checkbox} from './checkbox';
import { isNullOrUndefined } from 'util';


const BasicComplete = () => {
	return (
		<Checkbox data={['苹果', '栗子', '香蕉']}/>
	);
};
const defaultComplete = () => {
	return (
		<Checkbox data={['苹果', '栗子', '香蕉']} defaultIndexArr={[1,2]}/>
	);
};
const DisabledComplete = () => {
	return (
		<Checkbox data={['苹果', '栗子', '香蕉']} defaultIndexArr={[2]}disableIndex={[1,2]}/>
	);
};
const CheckedAllComplete = () => {
    const data=['check1','check2','check3']
    const [state,setState]=useState<boolean[]>(new Array(data.length).fill(false));

    const isCheckedAll = useMemo(() => {
        return state.filter(Boolean).length === state?.length ? [0] : []
    }, [state])

	return (
		<div>
            <Checkbox data={['全选']} defaultIndexArr={isCheckedAll} callback={(stateArr) => {
                stateArr[0] ? setState(new Array(data.length).fill(true)) : setState(new Array(data.length).fill(false))
            }}/>
            <br/>
            <Checkbox
                data={data}
                parentState={state}
                parentSetStateCallback={(stateArr,i) => {
                    stateArr[i] = !stateArr[i];
                    setState([...stateArr]);
                }}
            />
        </div>
	);
};

storiesOf('ENTRY/Checkbox 多选按钮', module)
    .add('基本使用', BasicComplete)
    .add('默认选中', defaultComplete)
    .add('禁用', DisabledComplete)
    .add('扩展全选', CheckedAllComplete, {
        info: {
            text: `
                **Tips👇:** 扩展全选，需要额外自行封装，利用checkbox组件的状态转移属性来制作

                **Notice👀**：使用状态转移状态交由父组件处理，组件内不维护状态，初始值等属性无效。

                **Plans 🚩:** &nbsp; 未来版本迭代中，考虑将全选逻辑封装进内部优化***

                ~~~js
                const CheckedAllComplete = () => {
                    const data=['check1','check2','check3']
                    const [state,setState]=useState<boolean[]>(new Array(data.length).fill(false));

                    const isCheckedAll = useMemo(() => {
                        return state.filter(Boolean).length === state?.length ? [0] : []
                    }, [state])

                    return (
                        <div>
                            <Checkbox data={['全选']} defaultIndexArr={isCheckedAll} callback={(stateArr) => {
                                stateArr[0] ? setState(new Array(data.length).fill(true)) : setState(new Array(data.length).fill(false))
                            }}/>
                            <br/>
                            <Checkbox
                                data={data}
                                parentState={state}
                                parentSetStateCallback={(stateArr,i) => {
                                    stateArr[i] = !stateArr[i];
                                    setState([...stateArr]);
                                }}
                            />
                        </div>
                    );
                };
                ~~~
            `, source: false
        }
    })