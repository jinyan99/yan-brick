import React from 'react';
import { storiesOf } from '@storybook/react';
import {Tabs, TabPane} from './index.js';

const BasicComplete = () => {
    const handleSelect = (index:string) => {
        console.log(index,'选中了')
    }
	return (
		<Tabs defaultIndex="2" onSelect={handleSelect}>
			<TabPane title="title1" index="1">
				content1
			</TabPane>
			<TabPane title="title2" index="2">
				content2
			</TabPane>
		</Tabs>
	);
};

storiesOf('REACTION/Tabs 选项卡', module)
    .add('基本使用', BasicComplete)