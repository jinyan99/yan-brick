var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useMemo, useState, useEffect } from 'react';
import classNames from 'classnames';
export var Checkbox = function (props) {
    var defaultIndexArr = props.defaultIndexArr, callback = props.callback, data = props.data, className = props.className, disableIndex = props.disableIndex, parentSetStateCallback = props.parentSetStateCallback, parentState = props.parentState, style = props.style, text = props.text;
    var classes = classNames('yanbrick-checkbox-wrapper', className, {});
    /**
     * 这样写有bug：不能根据props变化使得state更新
     * 切记：只要是useState(调用的括号里为变量或函数的话)，它就会初始渲染只执行一次而后续(props变引起再渲染等其他类型渲染)渲染都会忽略掉，想要再更新只能用唯一的setState方法;
     * 所以它这个initArr写成useMemo完全没必要，借助useEffect重写(要变化要用useEffect钩子)
    const initArr = useMemo(() => {
        const arr = new Array(data.length).fill(false);
        if (defaultIndexArr) {
            defaultIndexArr.forEach((v) => {arr[v] = true});
        }
        return arr;
    }, [data.length, defaultIndexArr])
    const [state, setState] = useState<Array<boolean>>(initArr);
    */
    var _a = useState([]), state = _a[0], setState = _a[1];
    useEffect(function () {
        var arr = new Array(data.length).fill(false);
        if (defaultIndexArr) {
            defaultIndexArr.forEach(function (v) { arr[v] = true; });
        }
        setState(arr);
    }, [data.length, defaultIndexArr]);
    var disableRef = useMemo(function () {
        var arr = new Array(data.length).fill(false);
        if (disableIndex) {
            disableIndex.forEach(function (v) { arr[v] = true; });
        }
        return arr;
    }, [data.length, disableIndex]);
    return (React.createElement("div", { className: classes, style: style }, data.map(function (value, index) {
        var judgeStateIndex = parentState ? parentState[index] : state[index];
        return (React.createElement("label", { className: "yanbrick-checkbox-label " + (disableRef[index] ? "checkbox-disabled" : ""), key: index },
            React.createElement("input", { type: "checkbox", className: "yanbrick-checkbox-input", checked: judgeStateIndex ? true : false, onChange: function () {
                    if (parentState) {
                        if (parentSetStateCallback) {
                            parentSetStateCallback(parentState, index);
                            if (callback)
                                callback(parentState);
                        }
                    }
                    else {
                        if (!disableRef[index]) {
                            state[index] = !state[index];
                            setState(__spreadArrays(state));
                            if (callback)
                                callback(state);
                        }
                    }
                } }),
            React.createElement("span", { className: "yanbrick-checkbox-dot " + (judgeStateIndex ? "checkbox-active" : "") }),
            text ? React.createElement("span", { className: "yanbrick-checkbox-value" }, value) : null));
    })));
};
Checkbox.defaultProps = {
    text: true
};
export default Checkbox;
