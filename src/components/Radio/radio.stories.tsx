import React from 'react';
import {storiesOf} from '@storybook/react';
import {Radio} from './radio';


const BasicComplete = () => {
	return (
		<Radio data={['0', '1','2']} defaultIndex={1}/>
	);
};
const BanComplete = () => {
	return (
		<Radio data={['0', '1','2']} defaultIndex={1} disableIndex={[2,3]}/>
	);
};


storiesOf('ENTRY/Radio 单选框', module)
    .add('基本使用', BasicComplete)
    .add('禁用效果', BanComplete)