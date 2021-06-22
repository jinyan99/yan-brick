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
import React, { useCallback, useState } from 'react';
import Icon from '../Icon';
import Button from '../Button/button';
import { Input } from '../Input/input';
import useControlReverse from '../../hooks/useControlReverse';
function betterparseInt(value) {
    var res = parseInt(value);
    if (isNaN(res)) {
        return 0;
    }
    return res;
}
function transformCalc(value, add, tmp) {
    if (add) {
        return betterparseInt(value) + tmp + '';
    }
    return betterparseInt(value) - tmp + '';
}
function transformString(v, maxNumber, minNumber) {
    if (v === '') {
        return '';
    }
    else {
        if (maxNumber && betterparseInt(v) > maxNumber) {
            return maxNumber + '';
        }
        if (minNumber && betterparseInt(v) < minNumber) {
            return minNumber + '';
        }
        return betterparseInt(v) + '';
    }
}
function validateNumber(v) {
    return /^[0-9]+$/.exec(v);
}
export var InputNumber = function (props) {
    var width = props.width, inputWidth = props.inputWidth, extraWidth = props.extraWidth, step = props.step, customValidate = props.customValidate, maxNumber = props.maxNumber, minNumber = props.minNumber, inputNumberCallback = props.inputNumberCallback, defaultValue = props.defaultValue, initialVisible = props.initialVisible, className = props.className, btnProps = props.btnProps, height = props.height, parentSetState = props.parentSetState, parentValue = props.parentValue, restProps = __rest(props, ["width", "inputWidth", "extraWidth", "step", "customValidate", "maxNumber", "minNumber", "inputNumberCallback", "defaultValue", "initialVisible", "className", "btnProps", "height", "parentSetState", "parentValue"]);
    var _a = useState(defaultValue + ''), innerState = _a[0], setInnerState = _a[1];
    var _b = useState(initialVisible), visible = _b[0], setVisible = _b[1];
    var _c = useControlReverse(innerState, parentValue, setInnerState, parentSetState), state = _c[0], setState = _c[1];
    var handleOnchange = useCallback(function (e) {
        if (customValidate) {
            var res = customValidate(e, setState);
            if (inputNumberCallback)
                inputNumberCallback(res);
        }
        else {
            if (validateNumber(e) || e === '') {
                var res = transformString(e, maxNumber, minNumber);
                setState(res);
                if (inputNumberCallback)
                    inputNumberCallback(res);
            }
            else {
                setState(function (prev) {
                    if (inputNumberCallback)
                        inputNumberCallback(prev);
                    return prev;
                });
            }
        }
    }, [customValidate, inputNumberCallback, maxNumber, minNumber]);
    return (React.createElement("div", { className: "yanbrick-inputnumber-wrapper " + (className || ""), style: { width: width } },
        React.createElement("div", { className: "yanbrick-inputnumber-prev", style: { display: visible ? "inline-block" : "none" } },
            React.createElement(Button, __assign({ onClick: function (prev) {
                    setState(function (prev) {
                        var res = transformString(transformCalc(prev, false, step), maxNumber, minNumber);
                        if (inputNumberCallback)
                            inputNumberCallback(res);
                        return res;
                    });
                } }, btnProps),
                React.createElement(Icon, { icon: "angle-left" }))),
        React.createElement("div", { className: "yanbrick-inputnumber-main", style: { width: (visible ? inputWidth + extraWidth : inputWidth) + "px" }, onClick: function () { setVisible(!visible); } },
            React.createElement(Input, __assign({ value: state, setValueCallback: handleOnchange }, { height: height }, restProps))),
        React.createElement("div", { className: "yanbrick-inputnumber-next", style: { display: visible ? "inline-block" : "none" } },
            React.createElement(Button, __assign({ onClick: function () {
                    setState(function (prev) {
                        var res = transformString(transformCalc(prev, true, step), maxNumber, minNumber);
                        if (inputNumberCallback)
                            inputNumberCallback(res);
                        return res;
                    });
                } }, btnProps),
                React.createElement(Icon, { icon: "angle-right" })))));
};
InputNumber.defaultProps = {
    width: 200,
    inputWidth: 50,
    extraWidth: 20,
    step: 1,
    defaultValue: 0,
    initialVisible: false,
    height: "32px"
};
export default InputNumber;
