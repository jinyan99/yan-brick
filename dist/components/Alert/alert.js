var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Button from '../Button';
import Icon from '../Icon';
import Transition from '../Transition';
export var Alert = function (props) {
    var _a;
    var title = props.title, type = props.type, timeout = props.timeout, description = props.description, animateClassName = props.animateClassName, directions = props.directions, autoclosedelay = props.autoclosedelay, className = props.className, initAnimate = props.initAnimate, wrapper = props.wrapper, closeCallback = props.closeCallback, initiativeCloseCallback = props.initiativeCloseCallback, children = props.children, style = props.style, icon = props.icon, close = props.close, restProps = __rest(props, ["title", "type", "timeout", "description", "animateClassName", "directions", "autoclosedelay", "className", "initAnimate", "wrapper", "closeCallback", "initiativeCloseCallback", "children", "style", "icon", "close"]);
    var classes = classNames('yanbrick-alert', className, (_a = {},
        _a["yanbrick-alert-" + type] = type,
        _a));
    var _b = useState(!initAnimate), state = _b[0], setState = _b[1];
    var nodeRef = useRef(null);
    useEffect(function () {
        if (initAnimate) {
            setState(true);
        }
        var handler;
        if (autoclosedelay) {
            handler = window.setTimeout(function () {
                setState(false);
                if (closeCallback)
                    closeCallback();
            }, autoclosedelay);
        }
        return function () { return clearTimeout(handler); };
    }, [autoclosedelay, closeCallback, initAnimate]);
    return (React.createElement(Transition, { in: state, animation: "zoom-in-" + directions, classNames: animateClassName ? animateClassName : '', timeout: timeout, wrapper: wrapper, nodeRef: nodeRef },
        React.createElement("div", __assign({ ref: nodeRef, className: classes, style: style }, restProps),
            React.createElement("span", null,
                icon && icon,
                title),
            description && React.createElement("span", null, description),
            children,
            close && (React.createElement(Button, { btnType: type, onClick: function (e) {
                    if (initiativeCloseCallback) {
                        initiativeCloseCallback(setState, e);
                    }
                    else {
                        setState(false);
                    }
                } },
                React.createElement(Icon, { icon: "times" }))))));
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
};
export default Alert;
