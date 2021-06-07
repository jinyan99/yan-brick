import React from 'react';
import {storiesOf} from '@storybook/react';
import {MultiSelect} from './multiSelect';


const BasicComplete = () => {
	return (
		<MultiSelect data={['北京','杭州','上海','广州','深圳']} onOptionClick={(a,b,c) => console.log(a,b,c)} displayType="dark" callback={(e)=>console.log(e)} defaultIndex={[1]}/>
	);
};
const LongDataComplete = () => {
	return (
		<MultiSelect  data={new Array(100).fill(1).map((x,y)=>y + '项')} callback={(e)=>console.log(e)}/>
	);
};
const BanComplete = () => {
	return (
		<MultiSelect  data={['深圳','杭州','上海']} disabled callback={(e)=>console.log(e)}/>
	);
};

storiesOf('ENTRY/MultiSelect 多选框', module)
    .addParameters({
           info: {
                text: `
                    **Tips👇：**多选框是在alert组件基础上封装的 组件选型不同于其他组件库 只要传数据就可以了 避免使用上过于复杂
                `,
           }
        })
    .add('基本使用', BasicComplete)
    .add('超长数据', LongDataComplete)
    .add('禁用样式', BanComplete)