import React,{useState} from 'react';
import {storiesOf} from '@storybook/react';
import {InputNumber} from './inputnumber';


const BasicComplete = () => {
	return (
    <InputNumber/>
	);
};
const maxMinComplete = () => {
	return (
    <InputNumber maxNumber={5} minNumber={-1}></InputNumber>
	);
};
const stepComplete = () => {
	return (
    <InputNumber initValue='5' step={10}></InputNumber>
	);
};
const expandComplete = () => {
	return (
    <InputNumber initialVisible={true} inputNumberCallback={(e)=>console.log(e)} ></InputNumber>
	);
};
const styleComplete = () => {
	return (
    <InputNumber
  inputWidth={30}
  extraWidth={5}
  btnProps={{btnType:'primary',size:'sm'}}
  initialVisible
  inputNumberCallback={(e)=>console.log(e)}
/>
	);
};
const parentComplete = () => {
	const [state, setState] = useState<string>("0");
	return (
		<InputNumber
			parentValue={state}
			parentSetState={setState}
			inputNumberCallback={(e) => console.log(e)}
		></InputNumber>
	);
};


storiesOf('ENTRY/InputNumber 计数器', module)
    .add('基本使用', BasicComplete, {
      info: {
        text: `
## 基本使用

此组件基于Input组件封装而成。
        `, source: false
      }
    })
    .add('控制上下限', maxMinComplete, {
      info: {
        text: `
## 控制上下限

此组件基于Input组件封装而成。
~~~js
<InputNumber maxNumber={5} minNumber={-1}></InputNumber>
~~~
        `, source: false
      }
    })
    .add('步长与初始值', stepComplete, {
      info: {
        text: `
## 步长与初始值

此组件基于Input组件封装而成。

~~~js
<InputNumber defaultValue='5' step={10}></InputNumber>
~~~
        `, source: false
      }
    })
    .add('按钮初始展开', expandComplete, {
      info: {
        text: `
## 按钮初始展开

此组件基于Input组件封装而成。
~~~js
<InputNumber initialVisible={true} inputNumberCallback={(e)=>console.log(e)} ></InputNumber>
~~~
        `, source: false
      }
    })
    .add('按钮样式宽度', styleComplete, {
      info: {
        text: `
## 按钮样式宽度

此组件基于Input组件封装而成。
~~~js
<InputNumber
  inputWidth={30}
  extraWidth={5}
  btnProps={{btnType:'primary',size:'sm'}}
  initialVisible
  inputNumberCallback={(e)=>console.log(e)}
/>
~~~
        `, source: false
      }
    })
    .add('父组件接管', parentComplete, {
      info: {
        text: `
## 父组件接管

此组件基于Input组件封装而成。


~~~js
export default function() {
	const [state, setState] = useState<string>("0");
	return (
		<InputNumber
			parentValue={state}
			parentSetState={setState}
			inputNumberCallback={(e) => console.log(e)}
		></InputNumber>
	);
}
~~~
        `, source: false
      }
    })