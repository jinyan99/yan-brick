import React, {FC, useMemo, ReactNode, CSSProperties, useRef, useEffect} from 'react';
import {createPortal} from 'react-dom';
import classNames from 'classnames';
import Button from '../Button';
import Icon from '../Icon';
import Transition from '../Transition';
import useStopScroll from '../../hooks/useStopScroll';

export interface ModalType {
    /** 父组件用来控制的状态 */
    visible: boolean;
    /** 容器位置 */
    container?: Element;
    /** 父组件用来改变显示状态的setState */
    setState: React.Dispatch<React.SetStateAction<boolean>>;
    /** 弹出框标题 */
    title?: ReactNode;
    /** 是否有确认按钮 */
    confirm?: boolean;
    /** 确认按钮文本 */
    okText?: string;
    /** 取消按钮文本 */
    cancelText?: string;
    /** 确认回调，需自行处理关闭 */
    onOk?: () => void;
    /** 取消回调，需自行处理关闭 */
    onCancel?: () => void;
    /** 显示状态改变回调 */
    callback?: (b: boolean) => void;
    /** 点击mask是否关闭模态框 */
    maskClose?: boolean;
    /** 是否有mask */
    mask?: boolean;
    /** 自定义模态框位置 */
    style?: CSSProperties;
    /** 是否展现右上角关闭按钮 */
    closeButton?: boolean;
    /** 动画时间 */
    delay?: number;
    /** 额外类名 */
    className?: string;
    /** 是否停止滚动 */
    stopScroll?: boolean;
    /** portal-style */
    portalStyle?: CSSProperties;
    /** 默认确认按钮大小 */
    btnSize?: 'sm' | 'lg';
    /** portal元素的回调，接受元素要portal的标签 */
    refCallback?: (ref: HTMLDivElement) => void;
    /** 点关闭icon的回调 */
    closeCallback?: () => void;
}

export const Modal:FC<ModalType> = (props) => {
    const {
        visible,
        maskClose,
        closeButton,
        delay,
        mask,
        container,
        confirm,
        okText,
        style,
        cancelText,
        onOk,
        onCancel,
        callback,
        title,
        setState,
        className,
        stopScroll,
        portalStyle,
        btnSize,
        children,
        refCallback,
        closeCallback
    } = props;
    const classes = classNames('yanbrick-modal-portal', className, {
        open: visible
    });

    const ref = useRef<HTMLDivElement>(null);

    useStopScroll(visible!, 300, stopScroll!);
    useEffect(() => {
        if (refCallback && ref.current) refCallback(ref.current);
    }, [refCallback]);

    const renderTemplate = useMemo(() => {
        return createPortal(
            <Transition
                //nodeRef={ref}
                in={visible}
                timeout={delay!}
                classNames="yanbrick-modal-animation"
                //animation="zoom-in-top"默认不合适自定义比较好
            >
                <div
                    className={classes}
                    style={portalStyle}
                    ref={ref}
                >
                    <div className={`yanbrick-modal-viewport ${className ? className: ""}`}>
                        <div className={`yanbrick-modal-title`}>
                            {title && <span>{title}</span>}
                            {closeButton && (
                                <div className={`yanbrick-modal-closebtn ${className ? className : ""}`}>
                                    <Button
                                        onClick={() => {
                                            setState(false);
                                            if (closeCallback) closeCallback();
                                        }}
                                        size={btnSize}
                                    >
                                        <Icon icon="times"/>
                                    </Button>
                                </div>
                            )}
                        </div>
                        {children && (
                            <div className={`yanbrick-modal-children ${className ? className : ""}`}>
                                {children}
                            </div>
                        )}
                        {confirm && (
                            <div className={`yanbrick-modal-confirm ${className ? className: ""}`}>
                                <Button
                                    onClick={() => {
                                        onOk ? onOk() : setState(false);
                                        if (callback) callback(true);
                                    }}
                                    size={btnSize}
                                >
                                    {okText || '确认'}
                                </Button>
                                <Button
                                    onClick={() => {
                                        onCancel ? onCancel() : setState(false);
                                        if (callback) callback(false);
                                    }}
                                    size={btnSize}
                                >
                                    {cancelText || '取消'}
                                </Button>
                            </div>
                        )}
                    </div>
                    {mask && (
                        <div
                            className="yanbrick-modal-mask"
                            onClick={() => {
                                if (maskClose) {
                                    setState(false);
                                    if (closeCallback) closeCallback();
                                }
                            }}
                        />
                    )}
                </div>
            </Transition>,
            container!
        )
    },[
        btnSize,
		callback,
		cancelText,
		className,
		closeButton,
		closeCallback,
		confirm,
		container,
		delay,
		mask,
		maskClose,
		okText,
		onCancel,
		onOk,
		portalStyle,
		children,
		setState,
		style,
		title,
		visible
    ])

    return <div className="yanbrick-modal-wrapper">{renderTemplate}</div>
}

Modal.defaultProps = {
    visible: false,
    container: window.document.body,
    confirm: true,
    title: '标题',
    maskClose: true,
    mask: true,
    closeButton: true,
    delay: 200,
    stopScroll: true,
    btnSize: 'lg'
}

export default Modal;