/**
 * 受控组件状态提升hook: 父组件接管受控组件状态的hook
 * 用到了多参数范型的使用，当外界不传范型时会自动根据传入的参数确定类型
 * @param value 原state
 * @param replaceValue 父组件state
 * @param setState 原setState
 * @param replaceSetState 父组件setState
 */
import React, {useMemo} from 'react';

function useControlReverse<T, F>(
  value: T,
  replaceValue: T | undefined,
  setState: F,
  replaceSetState: F | undefined
): [T, F] {

  const val = useMemo(() => {
    let val = value;
    if (replaceValue !== undefined) {
      val = replaceValue;
    }
    return val;
  }, [value, replaceValue]);

  const set = useMemo(() => {
    let set = setState;
    if (replaceSetState !== undefined) {
      set = replaceSetState;
    }
    return set;
  }, [setState, replaceSetState]);

  return [val, set]
}

export default useControlReverse;