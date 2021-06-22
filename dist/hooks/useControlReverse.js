/**
 * 受控组件状态提升hook: 父组件接管受控组件状态的hook
 * 用到了多参数范型的使用，当外界不传范型时会自动根据传入的参数确定类型
 * @param value 原state
 * @param replaceValue 父组件state
 * @param setState 原setState
 * @param replaceSetState 父组件setState
 */
import { useMemo } from 'react';
function useControlReverse(value, replaceValue, setState, replaceSetState) {
    var val = useMemo(function () {
        var val = value;
        if (replaceValue !== undefined) {
            val = replaceValue;
        }
        return val;
    }, [value, replaceValue]);
    var set = useMemo(function () {
        var set = setState;
        if (replaceSetState !== undefined) {
            set = replaceSetState;
        }
        return set;
    }, [setState, replaceSetState]);
    return [val, set];
}
export default useControlReverse;
