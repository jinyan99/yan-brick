import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
export var Radio = function (props) {
    var data = props.data, defaultIndex = props.defaultIndex, selectCallback = props.selectCallback, className = props.className, disableIndex = props.disableIndex;
    var classes = classNames('yanbrick-radio-wrapper', className, {});
    // 1- 先根据data长度初始化state状态值
    var _a = useState(new Array(data.length)
        .fill(false)
        .map(function (v, i) { return (i === defaultIndex ? true : v); })), state = _a[0], setState = _a[1];
    var disableRef = useMemo(function () {
        return state.map(function (v, i) {
            if (disableIndex === null || disableIndex === void 0 ? void 0 : disableIndex.includes(i))
                return true;
            return false;
        });
    }, [state, disableIndex]);
    // 2- 再根据data的值遍历渲染jsx模版，然后input绑定状态值直接就能用state[index]来对应了
    return (React.createElement("div", { className: classes }, data.map(function (value, index) { return (React.createElement("label", { className: "yanbrick-radio-label " + (disableRef[index] ? 'radio-disabled' : '') },
        React.createElement("input", { className: "yanbrick-radio-input", type: "radio", checked: state[index], onClick: function () {
                if (!disableRef[index]) {
                    // 每点击一下就重新初始成fill(false)的state数据,以便保证是单选的效果，点击这其他强制全为false，被点的项强制赋值成true以重复点击无影响
                    var newState = new Array(data.length).fill(false);
                    newState[index] = true;
                    setState(newState);
                    if (selectCallback)
                        selectCallback(newState);
                }
            }, onChange: function () { } }),
        React.createElement("span", { className: "yanbrick-radio-dot " + (state[index] ? 'radio-active' : '') }),
        React.createElement("span", { className: "yanbrick-radio-value" }, value))); })));
};
Radio.defaultProps = {
    data: ['0', '1', '2'],
    defaultIndex: 1
};
export default Radio;
