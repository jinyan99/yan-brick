/**
 * 节流的自定义hook，输入是回调函数和延迟时间2个值
 * (这是节流的延时器写法，还有时间戳写法待写，主要原理就是利用闭包的特性)
 * @param fn
 * @param delay
 */
function useThrottle(fn, delay) {
    // 为闭包，当多次调用useThrottle产物时，此flag开关值永远不变
    var flag = true;
    return function (_e) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var context = _e;
        // 当第一次调用这个节流产物时给flag开关设false了，在当多次连续调用时都不会
        // 走true的逻辑了，只有当栈里的延时器到期后变flag开关为true才能继续真正调用fn回调。
        if (flag) {
            flag = false;
            fn.apply(null, [_e, args]);
            setTimeout(function () {
                flag = true;
            }, delay);
        }
    };
}
export default useThrottle;
