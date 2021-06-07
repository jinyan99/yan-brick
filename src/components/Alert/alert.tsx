import React, { CSSProperties, DOMAttributes, FC, ReactNode, useState, useRef, useEffect} from 'react';
import classNames from 'classnames';
import Button from '../Button';
import Icon from '../Icon';
import Transition from '../Transition';
import { AnimationName } from '../Transition/transition';

export interface AlertProps extends DOMAttributes<HTMLDivElement> {
	/** 标题 */
    title?: string;
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
	/** 是否有关闭按钮 */
	close?: boolean;
	/** 内容 */
	description?: ReactNode;
	/** 动画方向 */
	directions?: 'left' | 'top' | 'right' | 'bottom' | 'allscale';
	/** 自动关闭延时时间 0为忽略 */
	autoclosedelay?: number;
	/** 额外类名 */
	className?: string;
	/** 图标 */
	icon?: ReactNode;
	/** 启用开场动画 */
	initAnimate?: boolean;
	/** 是否套一层div */
	wrapper?: boolean;
	/** 主动关闭回调函数，若需要主动消失，需操作setState，或使用上层组件的state */
	initiativeCloseCallback?: (
        // 这是react hook中的useState中返回的第二个setState函数的内置类型，state值是布尔值类型
		setState: React.Dispatch<React.SetStateAction<boolean>>,
		e: React.MouseEvent<HTMLElement, MouseEvent>
	) => void;
	/** 自动关闭后的回调函数 */
	closeCallback?: () => void;
	/** 自定义动画类名 */
	animateClassName?: string;
	/** 动画持续时间 */
	timeout?: number;
	/** 孩子 */
	children?: ReactNode;
	/** 外层样式 */
	style?: CSSProperties;
}
export const Alert: FC<AlertProps> = (props) => {
	const {
		title,
		type,
		timeout,
		description,
		animateClassName,
		directions,
		autoclosedelay,
		className,
		initAnimate,
		wrapper,
		closeCallback,
		initiativeCloseCallback,
		children,
		style,
		icon,
		close,
		...restProps
	} = props;

	const classes = classNames('yanbrick-alert', className, {
		[`yanbrick-alert-${type}`]: type
	});
    const [state, setState] = useState(!initAnimate);
    const nodeRef = useRef(null);

    useEffect(() => {
        if (initAnimate) {
            setState(true)
        }
        let handler: number;
        if (autoclosedelay) {
            handler = window.setTimeout(() => {
                setState(false);
                if (closeCallback) closeCallback();
            }, autoclosedelay)
        }
        return () => clearTimeout(handler)
    }, [autoclosedelay, closeCallback, initAnimate])

	return (
        <Transition
            in={state}
            animation={`zoom-in-${directions}` as AnimationName}
            classNames={animateClassName ? animateClassName : ''}
            timeout={timeout!}
            wrapper={wrapper}
            nodeRef={nodeRef}
        >
            <div ref={nodeRef} className={classes} style={style} {...restProps}>
                <span>
                    {icon && icon}
                    {title}
                </span>
                {description && <span>{description}</span>}
                {children}
                {close && (
                    <Button
                        btnType={type}
                        onClick={(e) => {
                            if (initiativeCloseCallback) {
                                initiativeCloseCallback(setState, e)
                            } else {
                                setState(false)
                            }
                        }}
                    >
                        <Icon icon="times"/>
                    </Button>
                )}
            </div>
        </Transition>
    );
};

Alert.defaultProps = {
    title: '',
    type: 'default',
    close: false,
    description: null,
    directions: 'top',
    autoclosedelay: 0,
    initAnimate: false,
    wrapper: false,
    timeout: 3000
}

export default Alert;
