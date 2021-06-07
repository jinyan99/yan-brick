import React from 'react';
import {storiesOf} from '@storybook/react';
import {Select, SelectProps} from './select';
import Icon from '../Icon'

const BasicComplete = () => {
	return (
		<Select
            data={['options1', 'options2', 'options3']}
            defaultValue="options2"
            callback={state => {console.log(state)}}
        ></Select>
	);
};

const TempalteComplete = () => {
	return (
		<Select
            data={['options1', 'options2', 'options3']}
            renderTemplate={(item, index, setState, setOpen) => {
            return <div
                    onClick={() => {setState(`${index}:${item}`); setOpen(false)}}
                    key={index}
                >{index}:{item}</div>
            }}
        ></Select>
	);
};


storiesOf('ENTRY/Select 选择框', module)
    .add('基本使用', BasicComplete)
    .add('渲染模版', TempalteComplete)