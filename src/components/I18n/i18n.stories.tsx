import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { I18n, Context } from './i18n';
import Button from '../Button';

const BasicComplete = () => {
	const zh = {
		language: '语言',
		apple: '苹果'
	};
	const en = {
		language: 'language',
		apple: 'apple'
	};
	const combinedLibrary = {
		zh: zh,
		en: en
  };

	return (
		<I18n defaultLang={'zh'} library={combinedLibrary}>
			<Child />
		</I18n>
	);
};

function Child() {
	const { state, toggle } = useContext(Context);
	return (
		<div>
			<Button>{state.language}</Button>
      <Button>{state.apple}</Button>
			<div>
				<Button
					onClick={() => {
						toggle('zh');
					}}
				>
					切换中文
				</Button>
				<Button
					onClick={() => {
						toggle('en');
					}}
				>
					切换英文
				</Button>
			</div>
		</div>
	);
}
storiesOf('REACTION/I18n 国际化', module).add('基本使用', BasicComplete, {
	info: {
		text: `
## 基本使用

传入默认语言和library即可
把组件放在根节点上
需要使用国际化的地方直接useContext即可
类组件使用Context.Consumer拿到Context上的state

默认名需要等于combinedLibrary的key名
进行切换时，传入的也是combinedLibrary的键名

~~~js
import React, { useContext } from "react";
import {Button, Badge, I18n} from "yan-brick";
const {Context} = I18n;

const zh = {
  language: "语言",
  apple: "苹果"
};
const en = {
  language: 'language',
  apple: 'apple'
};
const combinedLibrary = {
  zh,
  en
};

export default function I18nExampleApp() {
  return (
    <I18n defaultLang="zh" library={combinedLibrary}>
      <Child/>
    </I18n>
  )
}

function Child() {
  const {state, toggle} = useContext(Context);
  return (
    <div>
      <Badge count={state.language}/>
      <Badge count={state.apple}/>
      <div>
        <Button onClick={()=>{toggle('zh')}}>切换中文</Button>
        <Button onClick={()=>{toggle('en')}}>切换英文</Button>
      </div>
    </div>
  )
}
~~~
        `, source: false
	}
});
