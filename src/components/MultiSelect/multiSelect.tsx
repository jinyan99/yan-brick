import React, {FC, useState, ReactNode, useRef, useEffect, CSSProperties} from 'react';
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';
import Icon from '../Icon';
import Transition from '../Transition';
import Alert from '../Alert';
import {unstable_batchedUpdates} from 'react-dom';

export interface MultiSelectProps {
    /** 选框中数据 */
    data: Array<string>;
    /** 默认选中索引 */
    defaultIndex?: Array<number>;
    /** 展示右侧图标 */
    icon?: ReactNode;
    /** 主题类型设定 */
    displayType?:
        | 'primary'
        | 'default'
        | 'danger'
        | 'secondary'
        | 'success'
        | 'info'
        | 'light'
        | 'warning'
        | 'dark';
    /** 下拉动画时间 */
    timeout?: number;
    /** 选中回调 */
    callback?: (v: Array<string>) => void;
    /** option项点击回调 */
    onOptionClick?: (item: string, index: number, source: Array<string>) => void;
    /** 禁用 */
    disabled?: boolean;
    /** 选项框样式 */
    optionStyle?: CSSProperties;
    /** 显示框样式 */
    displayStyle?: CSSProperties;
    /** Item项延时 */
    itemTimeout?: number;
    /** 自定类名 */
    className?: string;
}

/**
 * datamap中间层映射到state供以按序显示在display-text中的方法
 * @param {string[]} data
 * @param {number[]} datamap
 * @param {React.Dispatch<React.SetStateAction<string[]>>} setState
 */
const dataMapToState = function(
    data: string[],
    datamap: number[],
    setState: React.Dispatch<React.SetStateAction<string[]>>
) {
    if (datamap.length) {
        let newState: Array<string> = [];
        datamap.forEach(v => {newState.push(data[v])});
        setState(newState);
    } else {
        setState([]);
    }
}

export const MultiSelect:FC<MultiSelectProps> = (props) => {
    const {
        icon,
        timeout,
        callback,
        onOptionClick,
        className,
        data,
        disabled,
        displayType,
        optionStyle,
        displayStyle,
        defaultIndex,
        itemTimeout
    } = props;
    const classes = classNames('yanbrick-multiselect', className,{
        ['disabled']: disabled
    })
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
    const [state, setState] = useState<Array<string>>(() => {
        if (defaultIndex) {
            return defaultIndex.map((v) => data[v])
        }
        return [];
    })
    const [open, setOpen] = useState<boolean>(false);
    const [datamap, setDataMap] = useState<Array<number>>(defaultIndex || []);
    const ref = useRef(null);

    useClickOutside(ref, () => setOpen(false));
    useEffect(() => {
        if (callback) callback(state);
    }, [callback, state]);

    return (
        <div className={classes} ref={ref}>
            <div
                className="yanbrick-multiselect-display"
                onClick={() => {
                    if (!disabled) setOpen(!open);
                }}
                style={displayStyle}
            >
                <div className="yanbrick-multiselect-displaytext">
                    {state.map((item, index) => {
                        return (
                            <Alert
                                key={datamap[index]}
                                title={item}
                                close={true}
                                type={displayType}
                                timeout={itemTimeout}
                                initiativeCloseCallback={(setAlert, e) => {
                                    e.stopPropagation();
                                    setAlert(false);
                                    setTimeout(() => {// 延时效果需要借助react手动批量更新的api
                                        unstable_batchedUpdates(() => {
                                            // 点击关闭后，先去删除datamap中间层里的对应值
                                            datamap.splice(index, 1);
                                            // 触发中间层映射state方法
                                            dataMapToState(data, datamap, setState);
                                            setDataMap([...datamap]);
                                        })
                                    }, itemTimeout)
                                }}
                            ></Alert>
                        )
                    })}
                </div>
                {icon ? <div className="yanbrick-multiselect-icon">{icon}</div> : null}
            </div>
            <Transition in={open} timeout={timeout!} animation="zoom-in-top">
                <ul className="yanbrick-multiselect-options" style={optionStyle}>
                    {data.map((item,index) => (
                        <li
                            onClick={() => {
                                if (onOptionClick) onOptionClick(item,index,data);
                                const res = datamap.indexOf(index);
                                if (res === -1) {
                                    const newmap = [...datamap, index];
                                    setDataMap(newmap);
                                    dataMapToState(data, newmap, setState);
                                } else {
                                    datamap.splice(res, 1);
                                    setDataMap([...datamap]);
                                    dataMapToState(data, datamap, setState);
                                }
                            }}
                            key={index}
                            className={datamap.indexOf(index) === -1 ? 'yanbrick-multiselect-option' : "yanbrick-multiselect-option-active"}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </Transition>
        </div>
    )
}

MultiSelect.defaultProps = {
    icon: <Icon icon="angle-down"/>,
    timeout: 300,
    data: [],
    disabled: false,
    displayType: 'primary',
    optionStyle: {maxHeight: '500px'},
    displayStyle: {minHeight: '43px'},
    defaultIndex: [],
    itemTimeout: 300
}
export default MultiSelect;