var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';
import Icon from '../Icon';
import Transition from '../Transition';
import Alert from '../Alert';
import { unstable_batchedUpdates } from 'react-dom';
/**
 * datamap中间层映射到state供以按序显示在display-text中的方法
 * @param {string[]} data
 * @param {number[]} datamap
 * @param {React.Dispatch<React.SetStateAction<string[]>>} setState
 */
var dataMapToState = function (data, datamap, setState) {
    if (datamap.length) {
        var newState_1 = [];
        datamap.forEach(function (v) { newState_1.push(data[v]); });
        setState(newState_1);
    }
    else {
        setState([]);
    }
};
export var MultiSelect = function (props) {
    var _a;
    var icon = props.icon, timeout = props.timeout, callback = props.callback, onOptionClick = props.onOptionClick, className = props.className, data = props.data, disabled = props.disabled, displayType = props.displayType, optionStyle = props.optionStyle, displayStyle = props.displayStyle, defaultIndex = props.defaultIndex, itemTimeout = props.itemTimeout;
    var classes = classNames('yanbrick-multiselect', className, (_a = {},
        _a['disabled'] = disabled,
        _a));
    /**
     * 该组件的state与data的基础数据结构设定决定着datamap的存在意义，当前Array<string>需datamap，
     * 若Array<{value: string, index: number}>就可能不需datamap基础
     *
     * 1. state:Array<string>: 用来遍历display层的文本显示
     * 2. data:Array<string>: 用来遍历transition层的options列表显示
     * 3. datamap:Array<number>: 当点击option项后，触发state更新的中间层-专门记录选中项对应data里恒定的下标
     * (由于state的数据结构原因，点击后不能直接去更新state里项值，仅靠数组的index判断data数据位置是不明确的，所
     * 以需要基于(indexvalue位置均)不变的data结构做一个用户选中结果过渡到state更新的中间层：datamap)
     *
     * */
    var _b = useState(function () {
        if (defaultIndex) {
            return defaultIndex.map(function (v) { return data[v]; });
        }
        return [];
    }), state = _b[0], setState = _b[1];
    var _c = useState(false), open = _c[0], setOpen = _c[1];
    var _d = useState(defaultIndex || []), datamap = _d[0], setDataMap = _d[1];
    var ref = useRef(null);
    useClickOutside(ref, function () { return setOpen(false); });
    useEffect(function () {
        if (callback)
            callback(state);
    }, [callback, state]);
    return (React.createElement("div", { className: classes, ref: ref },
        React.createElement("div", { className: "yanbrick-multiselect-display", onClick: function () {
                if (!disabled)
                    setOpen(!open);
            }, style: displayStyle },
            React.createElement("div", { className: "yanbrick-multiselect-displaytext" }, state.map(function (item, index) {
                return (React.createElement(Alert, { key: datamap[index], title: item, close: true, type: displayType, timeout: itemTimeout, initiativeCloseCallback: function (setAlert, e) {
                        e.stopPropagation();
                        setAlert(false);
                        setTimeout(function () {
                            unstable_batchedUpdates(function () {
                                // 点击关闭后，先去删除datamap中间层里的对应值
                                datamap.splice(index, 1);
                                // 触发中间层映射state方法
                                dataMapToState(data, datamap, setState);
                                setDataMap(__spreadArrays(datamap));
                            });
                        }, itemTimeout);
                    } }));
            })),
            icon ? React.createElement("div", { className: "yanbrick-multiselect-icon" }, icon) : null),
        React.createElement(Transition, { in: open, timeout: timeout, animation: "zoom-in-top" },
            React.createElement("ul", { className: "yanbrick-multiselect-options", style: optionStyle }, data.map(function (item, index) { return (React.createElement("li", { onClick: function () {
                    if (onOptionClick)
                        onOptionClick(item, index, data);
                    var res = datamap.indexOf(index);
                    if (res === -1) {
                        var newmap = __spreadArrays(datamap, [index]);
                        setDataMap(newmap);
                        dataMapToState(data, newmap, setState);
                    }
                    else {
                        datamap.splice(res, 1);
                        setDataMap(__spreadArrays(datamap));
                        dataMapToState(data, datamap, setState);
                    }
                }, key: index, className: datamap.indexOf(index) === -1 ? 'yanbrick-multiselect-option' : "yanbrick-multiselect-option-active" }, item)); })))));
};
MultiSelect.defaultProps = {
    icon: React.createElement(Icon, { icon: "angle-down" }),
    timeout: 300,
    data: [],
    disabled: false,
    displayType: 'primary',
    optionStyle: { maxHeight: '500px' },
    displayStyle: { minHeight: '43px' },
    defaultIndex: [],
    itemTimeout: 300
};
export default MultiSelect;
