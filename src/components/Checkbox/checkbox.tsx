import React, {CSSProperties, FC, useMemo, useState, useEffect} from 'react';
import classNames from 'classnames';

export interface CheckboxProps {
    /** 数据 */
    data: Array<string>;
    /** 默认选中索引 */
    defaultIndexArr?: Array<number>;
    /** 回调值 */
    callback?: (arr: Array<boolean>) => void;
    /** 额外类名 */
    className?: string;
    /** 禁用索引 */
    disableIndex?: Array<number>;
    /** 用于扩展全选：控制转移的onchange回调 */
    parentSetStateCallback?: (e: boolean[], index: number) => void;
    /** 用于扩展全选：控制转移的state */
    parentState?: Array<boolean>;
    /** 是否显示文字 */
    text?: boolean;
    /** 外层容器样式，有时可能需要把box-shadow设置成none */
    style?: CSSProperties
}

export const Checkbox:FC<CheckboxProps> = (props) => {
    const {
        defaultIndexArr,
        callback,
        data,
        className,
        disableIndex,
        parentSetStateCallback,
        parentState,
        style,
        text
    } = props;
    const classes = classNames('yanbrick-checkbox-wrapper', className, {

    })
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
    const [state, setState] = useState<Array<boolean>>([]);

    useEffect(() => {
        const arr = new Array(data.length).fill(false);
        if (defaultIndexArr) {
            defaultIndexArr.forEach((v) => {arr[v] = true});
        }
        setState(arr)
    }, [data.length, defaultIndexArr])

    const disableRef = useMemo(() => {
        const arr = new Array(data.length).fill(false);
        if (disableIndex) {
            disableIndex.forEach((v) => {arr[v] = true});
        }
        return arr;
    }, [data.length, disableIndex])

    return (
        <div className={classes} style={style}>
            {data.map((value, index) => {
                const judgeStateIndex = parentState ? parentState[index] : state[index];
                return (
                    <label
                        className={`yanbrick-checkbox-label ${
                            disableRef[index] ? "checkbox-disabled" : ""
                        }`}
                        key={index}
                    >
                        <input
                            type="checkbox"
                            className="yanbrick-checkbox-input"
                            checked={judgeStateIndex ? true : false}
                            onChange={() => {
                                if (parentState) {
                                    if (parentSetStateCallback) {
                                        parentSetStateCallback(parentState, index)
                                        if (callback) callback(parentState);
                                    }
                                } else {
                                    if (!disableRef[index]) {
                                        state[index] = !state[index];
                                        setState([...state]);
                                        if (callback) callback(state);
                                    }
                                }
                            }}
                        />
                        <span
                            className={`yanbrick-checkbox-dot ${
                                judgeStateIndex ? "checkbox-active" : ""
                            }`}
                        />
                        {text ? <span className="yanbrick-checkbox-value">{value}</span> : null}
                    </label>
                )
            })}
        </div>
    )
}

Checkbox.defaultProps = {
    text: true
}

export default Checkbox;