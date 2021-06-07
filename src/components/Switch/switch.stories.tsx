import React from 'react';
import {storiesOf} from '@storybook/react';
import {Switch} from './switch';


const BasicComplete = () => {
	return (<>
		<Switch></Switch>
   <Switch bottomType='primary'  defaultState={true} ></Switch>
   <Switch bottomType='danger'></Switch>
    <Switch bottomType='warning' btnType='warning'></Switch>
   <Switch bottomType='success' btnType='success'></Switch>
   <Switch bottomType='info' btnType='info'></Switch>
   <Switch bottomType='dark' btnType='danger'></Switch>
	</>);
};
const sizeComplete = () => {
	return (<>
		<Switch switchSize='lg' ></Switch>
   <Switch switchSize='lg' bottomType='primary'></Switch>
   <Switch switchSize='lg' bottomType='danger' defaultState={true} ></Switch>
    <Switch switchSize='lg' bottomType='warning' btnType='warning'></Switch>
   <Switch switchSize='lg' bottomType='success' btnType='secondary'></Switch>
   <Switch switchSize='lg' bottomType='info' btnType='info'></Switch>
   <Switch switchSize='lg' bottomType='dark' btnType='danger'></Switch>
   <hr/>
   <Switch switchSize='sm' ></Switch>
   <Switch switchSize='sm' bottomType='primary'></Switch>
   <Switch switchSize='sm' bottomType='danger'></Switch>
    <Switch switchSize='sm' bottomType='warning' btnType='warning'></Switch>
   <Switch switchSize='sm' bottomType='success' btnType='success'></Switch>
   <Switch switchSize='sm' bottomType='info' btnType='info'></Switch>
   <Switch switchSize='sm' bottomType='dark' btnType='danger'></Switch>
	</>);
};
const binComplete = () => {
	return (<>
	<Switch disabled={true} ></Switch>
   <Switch disabled={true} bottomType='primary'></Switch>
   <Switch disabled={true} bottomType='danger'></Switch>
    <Switch disabled={true} bottomType='warning' btnType='warning'></Switch>
   <Switch disabled={true} bottomType='success' btnType='success'></Switch>
   <Switch disabled={true} bottomType='info' btnType='info'></Switch>
   <Switch disabled={true} bottomType='dark' btnType='danger'></Switch>
	</>);
};


storiesOf('ENTRY/Switch 开关', module)
    .add('基本使用', BasicComplete,{info:{text:'底座和按钮都可以根据喜好换颜色！'}})
    .add('大小配置', sizeComplete,{info:{text:'有大中小三种'}})
    .add('禁用', binComplete,{info:{text:'传disabled属性'}})