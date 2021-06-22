/* eslint-disable prefer-const */
/* eslint-disable react/no-render-return-value */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { FC, ReactNode } from 'react';
import Alert from '../Alert';
import ReactDOM, { createPortal } from 'react-dom';
import { AlertProps } from '../Alert/alert';
import Icon from '../Icon';

// 1. 常规型---组件编写
export type DirectionType = 'top' | 'lt' | 'lb' | 'rt' | 'rb';

export interface MessageProps extends Omit<AlertProps,'directions'>{
	/** 标题内容 */
	title?: string;
	/** 容器: 默认不传，使用内部默认container*/
	container?: Element | null;
	/** 类型 */
	type?:
		| 'primary'
		| 'default'
		| 'danger'
		| 'secondary'
		| 'success'
		| 'info'
		| 'light'
		| 'warning'
		| 'dark';
	/** 位于container的方向 */
	directions?: 'top' | 'lt' | 'lb' | 'rt' | 'rb';
	/** 自动关闭延迟 */
	autoclosedelay?: number;
	/** 图标 */
	icon?: ReactNode;
	/** 额外类名 */
	className?: string;
	/** 参考alert: 默认为不传，使用内部默认的回调 */
	closeCallback?: () => void;
	/** 文本内容 */
	description?: string;
	/** 关闭按钮 */
	close?: boolean;
	/** 动画时间 */
	timeout?: number;
}

function directionSelect(directions: DirectionType) {
	if (directions === 'top') {
		return 'top';
	} else if (directions === 'lt' || directions === 'lb') {
		return 'left';
	} else if (directions === 'rt' || directions === 'rb') {
		return 'right';
	} else {
		return 'bottom';
	}
}

function createContainer() {
	let container = document.createElement('div');
	container.className = 'yanbrick-message-factory';
	container = document.body.appendChild(container);
	const closeCallback = () => {container.parentElement?.removeChild(container)};
	return {
		container,
		closeCallback
	};
}

export const Message: FC<MessageProps> = (props) => {
	let {
		title,
		container,
		close,
		directions,
		autoclosedelay,
		icon,
		type,
		className,
		closeCallback,
		description,
    timeout,
    ...restProps
	} = props;

	if (!container) {
		const createObj = createContainer();
		container = createObj.container;
		closeCallback = () => {
			setTimeout(() => {
				createObj.closeCallback();
			}, timeout);
		};
	}
	const select: AlertProps['directions'] = directionSelect(
		directions as DirectionType
	);
	const animateclass = directions === 'top' ? 'zoom-in-topmessage' : undefined;

	return createPortal(
		<Alert
			title={title}
			className={`yanbrick-message-${directions} yanbrick-message ${
				className ? className : ''
			}`}
			autoclosedelay={autoclosedelay}
			icon={icon}
			type={type}
			initAnimate
			directions={select}
			closeCallback={closeCallback}
			animateClassName={animateclass}
			description={description}
			close={close}
      timeout={timeout}
      {...restProps}
		/>,
		container
	);
};

Message.defaultProps = {
	title: '',
	type: 'default',
	directions: 'top',
	autoclosedelay: 3000,
	close: false,
	timeout: 300
};

// 2. 函数调用型---组件编写
const defaultOptions = {
  directions: 'top',
  description: undefined,
  icon: undefined as ReactNode,
  timeout: 300
}
// 对象数据结构可以把组件标签直接作为属性值传进去,只要它接收的是ReactNode类型
const defaultIcon = {
  default: undefined,
  primary: <Icon icon="bell" theme="primary"/>,
  danger: <Icon icon="times-circle" theme="danger"/>,
  warning: <Icon icon="exclamation-circle" theme="warning"/>,
  info: <Icon icon="info-circle" theme="primary"/>,
  secondary: <Icon icon="bookmark" theme="secondary"/>,
  success: <Icon icon="check-circle" theme="success"/>,
  light: <Icon icon="map-marker-alt" theme="primary"/>,
  dark: <Icon icon="atom" theme="primary"/>
}

interface DefaultOptionsType {
  /** 方向 */
  directions?: DirectionType;
  /** 描述 */
  description?: string | undefined;
  /** icon图标 */
  icon?: ReactNode;
  /** 自动关闭延时 */
  autoclosedelay?: number;
  /** 是否显示关闭按钮 */
  close?: boolean;
  /** 手动关闭回调函数 */
  initiativeCloseCallback?: ()=>void
}

function messageRender(
  /** 文本内容 */
  str: string,
  /** message类型 */
  messageType: AlertProps['type'],
  /** 可选配置项 */
	options: DefaultOptionsType
) {
  // icon用户不传就以defaultIcon的状态对应为准，传的话就mergeOptions中覆盖掉默认icon值
  defaultOptions.icon = defaultIcon[messageType!];
  const mergeOptions = {...defaultOptions, ...options};

  let container = document.createElement('div');
  container.className = 'yanbrick-message-factory';
  container = document.body.appendChild(container);
  const closeCallback = () => {
    setTimeout(() => {
      container.parentElement!.removeChild(container);
    }, mergeOptions.timeout)
  };

  const dom = document.createElement('div');
  dom.className = 'yanbrick-message-factory-item';
  container.appendChild(dom);

  return ReactDOM.render(
    <Message
      title={str}
      type={messageType}
      icon={mergeOptions.icon}
      directions={mergeOptions.directions as DirectionType}
      closeCallback={closeCallback}
      initiativeCloseCallback={closeCallback}
      container={container}
      description={mergeOptions.description}
      autoclosedelay={mergeOptions.autoclosedelay}
      close={mergeOptions.close}
      timeout={mergeOptions.timeout}
    />,
    container
  )
}

export const message = {
  // 函数有没有返回结果都可以，主要是内部函数的执行是全局插入body的操作不用使用返回结果
	default: (str: string, options: DefaultOptionsType = {}) =>{
		messageRender(str, 'default', options)},
	primary: (str: string, options: DefaultOptionsType = {}) =>{
    messageRender(str, 'primary', options)},
  danger: (str:string, options: DefaultOptionsType = {}) =>
    messageRender(str, 'danger', options),
  warning: (str: string, options: DefaultOptionsType = {}) =>
    messageRender(str, 'warning', options),
  info: (str: string, options: DefaultOptionsType = {}) =>
    messageRender(str, 'info', options),
  secondary: (str: string, options: DefaultOptionsType = {}) =>
    messageRender(str, 'secondary', options),
  success: (str: string, options: DefaultOptionsType = {}) =>
    messageRender(str, 'success', options),
  light: (str: string, options: DefaultOptionsType = {}) =>
    messageRender(str, 'light', options),
  dark: (str: string, options: DefaultOptionsType = {}) =>
    messageRender(str, 'dark', options)
};

export default Message
