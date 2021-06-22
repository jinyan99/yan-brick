import React, { useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import Button from '../Button';
import Icon from '../Icon';
import Transition from '../Transition';
import useStopScroll from '../../hooks/useStopScroll';
export var Modal = function (props) {
    var visible = props.visible, maskClose = props.maskClose, closeButton = props.closeButton, delay = props.delay, mask = props.mask, container = props.container, confirm = props.confirm, okText = props.okText, style = props.style, cancelText = props.cancelText, onOk = props.onOk, onCancel = props.onCancel, callback = props.callback, title = props.title, setState = props.setState, className = props.className, stopScroll = props.stopScroll, portalStyle = props.portalStyle, btnSize = props.btnSize, children = props.children, refCallback = props.refCallback, closeCallback = props.closeCallback;
    var classes = classNames('yanbrick-modal-portal', className, {
        open: visible
    });
    var ref = useRef(null);
    useStopScroll(visible, 300, stopScroll);
    useEffect(function () {
        if (refCallback && ref.current)
            refCallback(ref.current);
    }, [refCallback]);
    var renderTemplate = useMemo(function () {
        return createPortal(React.createElement(Transition
        //nodeRef={ref}
        , { 
            //nodeRef={ref}
            in: visible, timeout: delay, classNames: "yanbrick-modal-animation" },
            React.createElement("div", { className: classes, style: portalStyle, ref: ref },
                React.createElement("div", { className: "yanbrick-modal-viewport " + (className ? className : "") },
                    React.createElement("div", { className: "yanbrick-modal-title" },
                        title && React.createElement("span", null, title),
                        closeButton && (React.createElement("div", { className: "yanbrick-modal-closebtn " + (className ? className : "") },
                            React.createElement(Button, { onClick: function () {
                                    setState(false);
                                    if (closeCallback)
                                        closeCallback();
                                }, size: btnSize },
                                React.createElement(Icon, { icon: "times" }))))),
                    children && (React.createElement("div", { className: "yanbrick-modal-children " + (className ? className : "") }, children)),
                    confirm && (React.createElement("div", { className: "yanbrick-modal-confirm " + (className ? className : "") },
                        React.createElement(Button, { onClick: function () {
                                onOk ? onOk() : setState(false);
                                if (callback)
                                    callback(true);
                            }, size: btnSize }, okText || '确认'),
                        React.createElement(Button, { onClick: function () {
                                onCancel ? onCancel() : setState(false);
                                if (callback)
                                    callback(false);
                            }, size: btnSize }, cancelText || '取消')))),
                mask && (React.createElement("div", { className: "yanbrick-modal-mask", onClick: function () {
                        if (maskClose) {
                            setState(false);
                            if (closeCallback)
                                closeCallback();
                        }
                    } })))), container);
    }, [
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
    ]);
    return React.createElement("div", { className: "yanbrick-modal-wrapper" }, renderTemplate);
};
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
};
export default Modal;
