import React from 'react';
import {storiesOf} from '@storybook/react';
import {List} from './list';

const data = [
  'Racing car sprays burning fuel into crowd。',
  'Japanese princess to wed commoner。',
  'Australian walks 100km after outback crash。',
  'Man charged over missing wedding girl。',
  'Los Angeles battles huge wildfires。',
  'Racing car sprays burning fuel into crowd。',
  'Japanese princess to wed commoner。',
  'Australian walks 100km after outback crash。',
  'Man charged over missing wedding girl。',
  'Los Angeles battles huge wildfires。',
  'Racing car sprays burning fuel into crowd。',
  'Japanese princess to wed commoner。',
  'Australian walks 100km after outback crash。',
  'Man charged over missing wedding girl。',
  'Los Angeles battles huge wildfires。',
  'Racing car sprays burning fuel into crowd。',
  'Japanese princess to wed commoner。',
  'Australian walks 100km after outback crash。',
  'Man charged over missing wedding girl。',
  'Los Angeles battles huge wildfires。',
  'Racing car sprays burning fuel into crowd。',
  'Japanese princess to wed commoner。',
  'Australian walks 100km after outback crash。',
  'Man charged over missing wedding girl。',
  'Los Angeles battles huge wildfires。'
];

const BasicComplete = () => {
	return (
    <List>{data}</List>
	);
};
const rowComplete = () => {
	return (
    <List mode="horizontal">{data}</List>
	);
};
const renderTemplateComplete = () => {
	return (
    <List
      renderTemplate={(child, index) => (
      <div style={{textAlign: 'center'}} onClick={(e) => {console.log(e)}}>{index}<div>{child}</div></div>
      )}
    >
      {data}
    </List>
	);
};
const interactiveComplete = () => {
	return (
    <List
      withHoverActive
      onSelect={(v)=>{console.log(v)}}
    >
      {data}
    </List>
	);
};

storiesOf('Display/List 列表', module)
    .add('基本使用', BasicComplete)
    .add('横向', rowComplete)
    .add('使用自定义模版', renderTemplateComplete)
    .add('互动样式属性', interactiveComplete)