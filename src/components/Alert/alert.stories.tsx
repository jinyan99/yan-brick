import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Icon from '../Icon';
import { Alert, AlertProps } from './alert';

const BasicComplete = () => {
	return <Alert title="我是标题" type="primary" />;
};
const ButtonWithCloseType = () => {
	return (
		<Alert
			title="我是标题"
			type="success"
			close={true}
			initiativeCloseCallback={(s, e) => {
                console.log('点关闭了')
				s((p) => !p);
				action('clicked');
			}}
		/>
	);
};
const ButtonWithIcon = () => {
	return (
		<Alert
			title="我是标题"
			type="success"
			close={true}
			icon={<Icon icon="info-circle" theme="warning" />}
			initiativeCloseCallback={(s, e) => {
				s((p) => !p);
				action('clicked');
			}}
		/>
	);
};
const ButtonWithDes = () => {
	return (
		<Alert
			title="我是标题"
			close={true}
			type="light"
			description="我是长文字我是长文字我是长文字
    我是长文字我是长文字我是长文字我是长文字我是
    长文字我是长文字我是长文字我是长文字我是
    长文字我是长文字我是长文
    字我是长文字我是长文字我是长文字我是长
    文字我是长文字我是长文字我是长文字
    我是长文字我是长文字我是长文字我是长文字我是
    长文字我是长文字我是长文字我是长文字我是
    长文字我是长文字我是长文
    字我是长文字我是长文字我是长文字我是长
    文字我是长文字我是长文字我是长文字
    "
			initiativeCloseCallback={(s, e) => {
				s((p) => !p);
				action('clicked');
			}}
		/>
	);
};
const ButtonWithChildren = () => {
	return (
		<Alert
			title="我是标题"
			type="success"
			close={true}
			icon={<Icon icon="info-circle" theme="warning" />}
			initiativeCloseCallback={(s, e) => {
				s((p) => !p);
				action('clicked');
			}}
		>
			<div>
				432432
				<Icon icon="coffee" />
			</div>
		</Alert>
	);
};
const ButtonWithAuto = () => {
    return (
		<Alert
			title="我是标题"
			type="success"
			close={true}
            icon={<Icon icon="info-circle" theme="warning" />}
            autoclosedelay={2000}
		>
			<div>
				432432
				<Icon icon="coffee" />
			</div>
		</Alert>
	);
}
storiesOf('Display/Alert 提示框', module)
	.add('基本使用', BasicComplete)
	.add('close与type', ButtonWithCloseType)
	.add('带icon', ButtonWithIcon)
    .add('带描述', ButtonWithDes)
    .add('带自动关', ButtonWithAuto)
	.add('带children手动关', ButtonWithChildren);
