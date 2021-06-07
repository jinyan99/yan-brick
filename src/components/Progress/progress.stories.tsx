import React from 'react';
import {storiesOf} from '@storybook/react';
import {Progress} from './progress';


const BasicComplete = () => {
	return (
		<Progress percent={80}/>
	);
};


storiesOf('REACTION/Progress 进度条', module)
    .add('基本使用', BasicComplete)