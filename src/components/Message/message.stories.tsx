import React from 'react';
import { storiesOf } from '@storybook/react';
import { Message, message } from './message';
import Button from '../Button';
import Icon from '../Icon';

const BasicComplete = () => {
	return (
		<div>
			<Message title="上方消息" />
			<Message title="左上方消息" directions="lt" />
			<Message title="左下方消息" directions="lb" />
			<Message title="右上方消息" directions="rt" />
			<Message title="右下方消息" directions="rb" />
		</div>
	);
};
const functionComplete = () => {
	return (
		<div>
			<Button onClick={() => message.success('成功的消息')}> success</Button>
			<Button onClick={() => message.warning('警告的消息')}> warning</Button>
			<Button onClick={() => message.danger('危险的消息')}>danger</Button>
			<Button onClick={() => message.info('普通通知', { icon: undefined })}>
				info取消icon
			</Button>
			<Button
				onClick={() =>
					message.default('普通消息', { icon: [<Icon key="7-32" icon="coffee"></Icon>,<Icon key="87-9976" icon="coffee"/>] })
				}
			>
				{' '}
				default+自定义图标
			</Button>
			<Button onClick={() => message.primary('主题通知', { directions: 'rb' })}>
				{' '}
				primary
			</Button>
			<Button
				onClick={() => message.secondary('副标题通知', { directions: 'lt' })}
			>
				{' '}
				secondary
			</Button>
			<Button onClick={() => message.light('浅色通知')}> light</Button>
			<Button onClick={() => message.dark('深色通知')}> dark</Button>
		</div>
	);
};
const NoAutoComplete = () => {
	return (
		<div>
			<Button
				onClick={() =>
					message.info('我是标题', {
						autoclosedelay: 0,
						close: true,
						directions: 'rb',
						description:'我是长文本我是长文本我是我是长文本我是长文本我是长文本我是长文本我是长文本长文本我是长文本我是长文本我是长文本',
            initiativeCloseCallback: () => {console.log('手动关闭了')}
					})
				}
			>
				持久化点击关闭
			</Button>
		</div>
	);
};

storiesOf('REACTION/Message 全局提示', module)
	.add('基本使用', BasicComplete, {
		info: { text: '此组件在Alert组件上做了层封装' }
	})
	.add('函数调用', functionComplete, {
		info: {
      text: `
## 函数调用
***
第一个参数文本message, 第二个参数是options支持各种配置
***
### options可选配置项
|  prop  |是否可选|类型|   默认值|
|  ----  | ----  | --- | --- |
| directions?:| 可选 |top ｜ lt ｜ lb ｜ rt ｜rb|  top|
| description?:| 可选 |string|''|
| icon?:| 可选 |ReactNode|ReactNode|
| autoclosedelay?:| 可选 |number|300|
| close?:| 可选 |boolean|false|
| initiativeCloseCallback?:| 可选 |()=>void|空|
***
### 函数调用示例
~~~js
<div>
			<Button onClick={() => message.success('成功的消息')}> success</Button>
			<Button onClick={() => message.warning('警告的消息')}> warning</Button>
			<Button onClick={() => message.danger('危险的消息')}>danger</Button>
			<Button onClick={() => message.info('普通通知', { icon: undefined })}>
				info取消icon
			</Button>
			<Button
				onClick={() =>
					message.default('普通消息', { icon: [<Icon key="7-32" icon="coffee"></Icon>,<Icon key="87-9976" icon="coffee"/>] })
				}
			>
				{' '}
				default+自定义图标
			</Button>
			<Button onClick={() => message.primary('主题通知', { directions: 'rb' })}>
				{' '}
				primary
			</Button>
			<Button
				onClick={() => message.secondary('副标题通知', { directions: 'lt' })}
			>
				{' '}
				secondary
			</Button>
			<Button onClick={() => message.light('浅色通知')}> light</Button>
			<Button onClick={() => message.dark('深色通知')}> dark</Button>
		</div>
	);
~~~
    `,
    source: false
		}
	})
	.add('手动关闭', NoAutoComplete, {
    info: { text: `
手动关闭需要设置autoclosedelay:0, close:true, initiativeCloseCallback:任意函数体(不需要手动接收操作setState它是全局body加元素会自动把元素remove掉)
***
### 函数调用示例
***
~~~js
<div>
<Button
  onClick={() =>
    message.info('我是标题', {
      autoclosedelay: 0,
      close: true,
      directions: 'rb',
      description:'我是长文本我是长文本我是我是长文本我是长文本我是长文本我是长文本我是长文本长文本我是长文本我是长文本我是长文本',
      initiativeCloseCallback: () => {console.log('手动关闭了')}
    })
  }
>
  持久化点击关闭
</Button>
</div>
	);
~~~
    `,source: false }
	});
