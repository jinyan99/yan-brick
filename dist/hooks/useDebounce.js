import { useState, useEffect } from 'react';
// 自定义hook一定要use开头
/**
 * 原理：这个和节流(用闭包)不一样，防抖是利用useEffect的return自动卸载特性，输出是返回目标的vlaue
 * 值，每当value更新都会重新渲染都会执行useEffect的上次渲染的return卸载函数，保证了再次触发时会重新
 * 进行延时处理
 * @param {any} value 防抖的目标值
 * @param {number} delay 多少秒后执行
 */
function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    useEffect(function () {
        var handler = window.setTimeout(function () {
            setDebouncedValue(value);
        }, delay);
        return function () {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}
export default useDebounce;
