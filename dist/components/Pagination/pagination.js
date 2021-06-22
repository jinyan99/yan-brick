import React, { useMemo, useState } from 'react';
import Icon from '../Icon';
import Button from '../Button';
/**
 * 点击分页条目自定义跳转算法函数(返回要出现的正确截取过的组)
 *
 * 此函数就是自定义跳转算法函数，分页组件中不用这个函数也能正常运行，只不过就是简单的左右按钮点一下
 * 移一下，当前数据组中点中哪个就激活哪个，没有其他额外效果。
 * 当加上该自定义算法规则跳转时，会自动区分:
 * * * 点到右半区域会一下跳多格(动态计算出的差值)的下一组state分页条目数据组
 * * * 点到左半区域会一下跳多格(动态计算出的差值)的上一组state分页条目数据组 ---- 即怎么跳跳多少
 * 都是该算法函数自定义的规则
 * @returns number[]| null 返回经算法规则计算出的新state分页条目数据组，当返回null时即外界不需
 * 更新state
 */
function calculateMove(
// 当前哪一页
current, 
// 分页条目的可视长度的数据组
state, 
// 总共页数
totalPage) {
    // 数组取中间数的位置(奇数组为中间那个数，偶数组为中间位下一位)
    var mid = Math.floor(state.length / 2);
    var arr;
    /**
     * 当前数与中间数的差值：其大于0在右部分，小于0在左部分，等于0当前正好在中间，差值的取值范围是±中间数
     * (差值最高不会超过正中间数最低不会低于负中间数。差值就是当前数与中间数差多少)
     * * * 当大于0时: 判断state[state.length-1](tmp) + 差值
     * * * * * 若一次性够不到总页数，则直接让源state数据组里的值每个都加差值，如(差值为2，[1,2,3,4,5]=>[3,4,5,6,7]
     * * * * * 若一次性能够到总页数还有可能会超总页数，则state.map(v => v + totalPage - tmp)
     * * * 当小于0时: 判断state[0]+差值
     * * * * * 若第一项加上差值能大于总页数的第一页数为1，则arr = state.map(v => v + minus);直接各
     * 项加差值即可(这样能保证当点左按钮时如(1+-1为0了就不好在页面中显示0页)不会在数据组出现0页-1页等啥的)
     * * * * * 若结果小于等于1时，则 state.map(v => v + 1 - state[0]);
     */
    var minus = current - state[mid];
    if (minus === 0) {
        // 当前位于中间数也返null不需要外界更新state数据组
        arr = null;
    }
    else if (minus > 0) {
        // 数据组最后一项
        var tmp_1 = state[state.length - 1];
        // 算当前数据项最后一项加差值会不会达到总页数，若达不到可以直接将tmp前面每项+差值进行移动，否则tmp项达到
        // 总页数还直接加差值的话超过总页数限制了就显示错误了
        if (tmp_1 + minus < totalPage) {
            arr = state.map(function (v) { return v + minus; });
        }
        else { // 当达到总页数时，不能直接+minus差值进行移动，得+总页数-最后一项值才行
            // 当前state数据组为最后一组时
            if (tmp_1 === totalPage) {
                arr = null;
            }
            else {
                arr = state.map(function (v) { return v + totalPage - tmp_1; });
            }
        }
    }
    else { // 小于0
        // (与上面tmp最后一项对应这是当左按钮点击时保证第一项加上差值能大于总页数的第一页1数才行，)
        if (state[0] + minus > 1) {
            arr = state.map(function (v) { return v + minus; });
        }
        // (若保证不了，则)
        else {
            // 边缘，看最大能减几
            if (state[0] === 1) {
                arr = null;
            }
            else {
                arr = state.map(function (v) { return v + 1 - state[0]; });
            }
        }
    }
    return arr;
}
export var Pagination = function (props) {
    var total = props.total, pageSize = props.pageSize, defaultCurrent = props.defaultCurrent, barMaxSize = props.barMaxSize, callback = props.callback;
    var _a = useState(defaultCurrent), current = _a[0], setCurrent = _a[1];
    var _b = useState([]), state = _b[0], setState = _b[1];
    // 计算出总共多少页(并对totalPage判断对state更新)
    var totalPage = useMemo(function () {
        var number = Math.ceil(total / pageSize);
        if (number > barMaxSize) {
            var statemap = new Array(barMaxSize).fill(1).map(function (x, y) { return y + 1; });
            setState(statemap);
            var arr = calculateMove(defaultCurrent, statemap, number);
            if (arr)
                setState(arr);
        }
        else {
            var statemap = new Array(number).fill(1).map(function (x, y) { return y + 1; });
            setState(statemap);
            var arr = calculateMove(defaultCurrent, statemap, number);
            if (arr)
                setState(arr);
        }
        return number;
    }, [barMaxSize, defaultCurrent, pageSize, total]);
    return (React.createElement("ul", { className: "yanbrick-pagination-wrapper" },
        React.createElement("li", { className: "yanbrick-pagination-up" },
            React.createElement(Button, { disabled: current === 1 ? true : false, onClick: function () {
                    // state不为第一组时
                    if (state && state[0] > 1) {
                        var statemp = state.map(function (x) { return x - 1; });
                        setState(statemp);
                        setCurrent(current - 1);
                        var arr = calculateMove(current - 1, statemp, totalPage);
                        // 当arr为null时不更新
                        if (arr)
                            setState(arr);
                        if (callback)
                            callback(current - 1);
                    }
                    else {
                        // state为第一组时(当current为2则左按钮可以点(此时不用设statemap)当为1时则禁用状态)
                        if (current !== state[0]) {
                            setCurrent(current - 1);
                            var arr = calculateMove(current - 1, state, totalPage);
                            if (arr)
                                setState(arr);
                            if (callback)
                                callback(current - 1);
                        }
                    }
                } },
                React.createElement(Icon, { icon: "angle-left" }))),
        state.map(function (v, i) {
            return (React.createElement("li", { className: "yanbrick-pagination-item " + (current === v ? "pagination-active" : ""), key: i },
                React.createElement(Button, { btnType: current === v ? "primary" : "default", onClick: function () {
                        setCurrent(v);
                        var arr = calculateMove(v, state, totalPage);
                        if (arr) {
                            setState(arr);
                        }
                        if (callback)
                            callback(v);
                    } }, v)));
        }),
        React.createElement("li", { className: "yanbrick-pagination-down" },
            React.createElement(Button, { disabled: current === totalPage ? true : false, onClick: function () {
                    // 当state数据组不是最后一组时:
                    if (state && state[barMaxSize - 1] < totalPage) {
                        var statetmp = state.map(function (x) { return x + 1; });
                        setState(statetmp);
                        setCurrent(current + 1);
                        var arr = calculateMove(current + 1, statetmp, totalPage);
                        if (arr) {
                            setState(arr);
                        }
                        if (callback)
                            callback(current + 1);
                    }
                    // 当state数据组为最后一组时:但当前current项不是数据组最后一页时此时还是可以点击移动current处理的
                    else {
                        if (current !== totalPage) {
                            setCurrent(current + 1);
                            var arr = calculateMove(current + 1, state, totalPage);
                            if (arr) {
                                setState(arr);
                            }
                            if (callback)
                                callback(current + 1);
                        }
                    }
                } },
                React.createElement(Icon, { icon: "angle-right" })))));
};
Pagination.defaultProps = {
    pageSize: 10,
    defaultCurrent: 1,
    barMaxSize: 5
};
export default Pagination;
