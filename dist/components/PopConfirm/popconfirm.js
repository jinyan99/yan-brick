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
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from '../Modal/modal';
//转化定位属性
function switchPosition(sign, modalrect, popconfirmrect, scroll) {
    // 小三角高度
    var triangle = 5;
    switch (sign) {
        case 'TL':
            return {
                top: popconfirmrect.top + scroll - modalrect.height - triangle,
                left: popconfirmrect.left
            };
        case 'TOP':
            return {
                top: popconfirmrect.top + scroll - modalrect.height - triangle,
                left: popconfirmrect.left - modalrect.width / 2 + popconfirmrect.width / 2
            };
        case 'TR':
            return {
                top: popconfirmrect.top + scroll - modalrect.height - triangle,
                left: popconfirmrect.left - modalrect.width + popconfirmrect.width
            };
        case 'LT':
            return {
                top: popconfirmrect.top + scroll,
                left: popconfirmrect.left - modalrect.width - triangle
            };
        case 'LEFT':
            return {
                top: popconfirmrect.top + scroll + popconfirmrect.height / 2 - modalrect.height / 2,
                left: popconfirmrect.left - modalrect.width - triangle
            };
        case 'LB':
            return {
                top: popconfirmrect.top + scroll + popconfirmrect.height - modalrect.height,
                left: popconfirmrect.left - modalrect.width - triangle
            };
        case 'BL':
            return {
                top: popconfirmrect.top + scroll + popconfirmrect.height + triangle,
                left: popconfirmrect.left
            };
        case 'BOTTOM':
            return {
                top: popconfirmrect.top + scroll + popconfirmrect.height + triangle,
                left: popconfirmrect.left + popconfirmrect.width / 2 - modalrect.width / 2
            };
        case 'BR':
            return {
                top: popconfirmrect.top + scroll + popconfirmrect.height + triangle,
                left: popconfirmrect.left + popconfirmrect.width - modalrect.width
            };
        case 'RT':
            return {
                top: popconfirmrect.top + scroll,
                left: popconfirmrect.left + popconfirmrect.width + triangle
            };
        case 'RIGHT':
            return {
                top: popconfirmrect.top + scroll + popconfirmrect.height / 2 - modalrect.height / 2,
                left: popconfirmrect.left + popconfirmrect.width + triangle
            };
        case 'RB':
            return {
                top: popconfirmrect.top + scroll + popconfirmrect.height - modalrect.height,
                left: popconfirmrect.left + popconfirmrect.width + triangle
            };
        default:
            console.error('you may pass error directions' + sign);
            return {};
    }
}
export var Popconfirm = function (props) {
    var wrapperNode = props.wrapperNode, directions = props.directions, click = props.click, hover = props.hover, className = props.className, visible = props.visible, setState = props.setState, restProps = __rest(props, ["wrapperNode", "directions", "click", "hover", "className", "visible", "setState"]);
    // 用于综合计算返回Modal组件的可传props
    var defaultPropsConfirmParameter = {
        mask: false,
        className: "yanbrick-popconfirm popconfirm-" + directions,
        stopScroll: false,
        btnSize: 'sm'
    };
    var mergeOption = __assign(__assign({}, defaultPropsConfirmParameter), restProps);
    // 组件内部控制modal开关的切换状态，当外界传setState和visible时--该值失效
    var _a = useState(false), innerstate = _a[0], setInnerState = _a[1];
    var _b = useState({}), style = _b[0], setStyle = _b[1];
    var ref = useRef(null);
    var _c = useState(), modalRef = _c[0], setModalRef = _c[1];
    var refcallback = function (ref) {
        setModalRef(ref);
    };
    useEffect(function () {
        if (ref.current && modalRef) {
            // 获取网页正文滚去的高度
            var scroll_1 = document.documentElement.scrollTop + document.body.scrollTop; // 移动端可能取不到
            var res = switchPosition(directions, modalRef.getBoundingClientRect(), ref.current.getBoundingClientRect(), scroll_1);
            setStyle(res);
        }
    }, [directions, modalRef]);
    return (React.createElement("div", { className: "yanbrick-popconfirm-wrapper", ref: ref, onClick: click ? function () { return setInnerState(!innerstate); } : undefined, onMouseEnter: hover ? function () { return setInnerState(true); } : undefined, onMouseLeave: hover ? function () { return setInnerState(false); } : undefined },
        wrapperNode,
        React.createElement(Modal, __assign({ visible: setState ? visible : innerstate, setState: setState ? setState : setInnerState }, mergeOption, { portalStyle: style, refCallback: refcallback }))));
};
Popconfirm.defaultProps = {
    directions: 'TOP',
    click: true,
    hover: false
};
export default Popconfirm;
