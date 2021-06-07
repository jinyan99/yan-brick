import React from 'react';
import {storiesOf} from '@storybook/react';
import Transition from './transition';


const BasicComplete = () => {
	return (
    <Transition
      in={true}
      timeout={3000}
      animation={`zoom-in-top`}
    >
      <h1 style={{background:'red'}}>哈哈</h1>
      unmountOnExit boolean 退出时卸载组件
    </Transition>
	);
};


storiesOf('ANIMATE/Transition 过渡动画', module)
    .add('基本使用', BasicComplete)