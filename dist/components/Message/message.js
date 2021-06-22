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
import React from 'react';
import Alert from '../Alert';
import ReactDOM, { createPortal } from 'react-dom';
import Icon from '../Icon';
function directionSelect(directions) {
    if (directions === 'top') {
        return 'top';
    }
    else if (directions === 'lt' || directions === 'lb') {
        return 'left';
    }
    else if (directions === 'rt' || directions === 'rb') {
        return 'right';
    }
    else {
        return 'bottom';
    }
}
function createContainer() {
    var container = document.createElement('div');
    container.className = 'yanbrick-message-factory';
    container = document.body.appendChild(container);
    var closeCallback = function () { var _a; (_a = container.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(container); };
    return {
        container: container,
        closeCallback: closeCallback
    };
}
export var Message = function (props) {
    var title = props.title, container = props.container, close = props.close, directions = props.directions, autoclosedelay = props.autoclosedelay, icon = props.icon, type = props.type, className = props.className, closeCallback = props.closeCallback, description = props.description, timeout = props.timeout, restProps = __rest(props, ["title", "container", "close", "directions", "autoclosedelay", "icon", "type", "className", "closeCallback", "description", "timeout"]);
    if (!container) {
        var createObj_1 = createContainer();
        container = createObj_1.container;
        closeCallback = function () {
            setTimeout(function () {
                createObj_1.closeCallback();
            }, timeout);
        };
    }
    var select = directionSelect(directions);
    var animateclass = directions === 'top' ? 'zoom-in-topmessage' : undefined;
    return createPortal(React.createElement(Alert, __assign({ title: title, className: "yanbrick-message-" + directions + " yanbrick-message " + (className ? className : ''), autoclosedelay: autoclosedelay, icon: icon, type: type, initAnimate: true, directions: select, closeCallback: closeCallback, animateClassName: animateclass, description: description, close: close, timeout: timeout }, restProps)), container);
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
var defaultOptions = {
    directions: 'top',
    description: undefined,
    icon: undefined,
    timeout: 300
};
// 对象数据结构可以把组件标签直接作为属性值传进去,只要它接收的是ReactNode类型
var defaultIcon = {
    default: undefined,
    primary: React.createElement(Icon, { icon: "bell", theme: "primary" }),
    danger: React.createElement(Icon, { icon: "times-circle", theme: "danger" }),
    warning: React.createElement(Icon, { icon: "exclamation-circle", theme: "warning" }),
    info: React.createElement(Icon, { icon: "info-circle", theme: "primary" }),
    secondary: React.createElement(Icon, { icon: "bookmark", theme: "secondary" }),
    success: React.createElement(Icon, { icon: "check-circle", theme: "success" }),
    light: React.createElement(Icon, { icon: "map-marker-alt", theme: "primary" }),
    dark: React.createElement(Icon, { icon: "atom", theme: "primary" })
};
function messageRender(
/** 文本内容 */
str, 
/** message类型 */
messageType, 
/** 可选配置项 */
options) {
    // icon用户不传就以defaultIcon的状态对应为准，传的话就mergeOptions中覆盖掉默认icon值
    defaultOptions.icon = defaultIcon[messageType];
    var mergeOptions = __assign(__assign({}, defaultOptions), options);
    var container = document.createElement('div');
    container.className = 'yanbrick-message-factory';
    container = document.body.appendChild(container);
    var closeCallback = function () {
        setTimeout(function () {
            container.parentElement.removeChild(container);
        }, mergeOptions.timeout);
    };
    var dom = document.createElement('div');
    dom.className = 'yanbrick-message-factory-item';
    container.appendChild(dom);
    return ReactDOM.render(React.createElement(Message, { title: str, type: messageType, icon: mergeOptions.icon, directions: mergeOptions.directions, closeCallback: closeCallback, initiativeCloseCallback: closeCallback, container: container, description: mergeOptions.description, autoclosedelay: mergeOptions.autoclosedelay, close: mergeOptions.close, timeout: mergeOptions.timeout }), container);
}
export var message = {
    // 函数有没有返回结果都可以，主要是内部函数的执行是全局插入body的操作不用使用返回结果
    default: function (str, options) {
        if (options === void 0) { options = {}; }
        messageRender(str, 'default', options);
    },
    primary: function (str, options) {
        if (options === void 0) { options = {}; }
        messageRender(str, 'primary', options);
    },
    danger: function (str, options) {
        if (options === void 0) { options = {}; }
        return messageRender(str, 'danger', options);
    },
    warning: function (str, options) {
        if (options === void 0) { options = {}; }
        return messageRender(str, 'warning', options);
    },
    info: function (str, options) {
        if (options === void 0) { options = {}; }
        return messageRender(str, 'info', options);
    },
    secondary: function (str, options) {
        if (options === void 0) { options = {}; }
        return messageRender(str, 'secondary', options);
    },
    success: function (str, options) {
        if (options === void 0) { options = {}; }
        return messageRender(str, 'success', options);
    },
    light: function (str, options) {
        if (options === void 0) { options = {}; }
        return messageRender(str, 'light', options);
    },
    dark: function (str, options) {
        if (options === void 0) { options = {}; }
        return messageRender(str, 'dark', options);
    }
};
export default Message;
