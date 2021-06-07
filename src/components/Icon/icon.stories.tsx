import React from 'react';
import {storiesOf} from '@storybook/react';
import {Icon} from './icon';


const BasicComplete = () => {
	return (
		<Icon icon="angle-down"/>
	);
};


storiesOf('Display/Icon 图标', module)
    .add('基本使用', BasicComplete)