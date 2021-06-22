import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Transition from '../Transition';
import useClickOutside from '../../hooks/useClickOutside';
/**
 * Select组件用法
 * ## Select引入
 * ~~~js
 * import {Select} from 'yan-brick'
 * ~~~
 */
export var Select = function (props) {
    var icon = props.icon, defaultValue = props.defaultValue, timeout = props.timeout, renderTemplate = props.renderTemplate, callback = props.callback, data = props.data, disabled = props.disabled, style = props.style, innerStyle = props.innerStyle, className = props.className, children = props.children;
    var classes = classNames('yanbrick-select', className, {
        'disabled': disabled
    });
    var _a = useState(defaultValue), state = _a[0], setState = _a[1];
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var nodeRef = useRef(null);
    var ref = useRef(null);
    useClickOutside(ref, function () { return setOpen(false); });
    useEffect(function () {
        if (callback)
            callback(state);
    }, [callback, state]);
    return (React.createElement("div", { className: classes, style: style, ref: ref },
        React.createElement("div", { className: "yanbrick-select-display", onClick: function () {
                if (!disabled)
                    setOpen(!open);
            } },
            React.createElement("div", { className: "yanbrick-select-displaytext", style: innerStyle }, state),
            icon ? React.createElement("div", { className: "yanbrick-select-icon" }, icon) : null),
        React.createElement(Transition, { nodeRef: nodeRef, in: open, animation: "zoom-in-top", timeout: timeout },
            React.createElement("div", { ref: nodeRef, className: "yanbrick-select-options" }, data.map(function (item, index) {
                var renderRes = renderTemplate ? (renderTemplate(item, index, setState, setOpen)) : (React.createElement("div", { onClick: function () {
                        setState(item);
                        setOpen(false);
                    }, key: index },
                    " ",
                    item));
                return renderRes;
            })))));
};
Select.defaultProps = {
    icon: React.createElement(Icon, { icon: "angle-down" }),
    defaultValue: "",
    timeout: 300,
    data: [],
    disabled: false
};
export default Select;
