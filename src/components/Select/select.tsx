import React, {CSSProperties, FC, ReactNode, useState, useRef, useEffect} from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Transition from '../Transition';
import useClickOutside from '../../hooks/useClickOutside'


export interface SelectProps {
    /** 选项数据 */
    data: Array<string>;
    /** 模版渲染，setState设置展示元素的方法，setOpen控制开关 */
    renderTemplate?: (
        item: string,
        index: number,
        setState: React.Dispatch<React.SetStateAction<string>>,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>
    ) => ReactNode;
    /** 展示右侧图标 */
    icon?: ReactNode;
    /** 选框中初始值 */
    defaultValue?: string;
    /** 下拉动画时间 */
    timeout?: number;
    /** 选中value改变回调 */
    callback?: (v: string) => void;
    /** 禁用 */
    disabled?: boolean;
    /** 外层容器样式 */
    style?: CSSProperties;
    /** 内层容器样式 */
    innerStyle?: CSSProperties;
    className?: string
}
/**
 * Select组件用法
 * ## Select引入
 * ~~~js
 * import {Select} from 'yan-brick'
 * ~~~
 */
export const Select:FC<SelectProps> = (props) => {
    const {
        icon,
        defaultValue,
        timeout,
        renderTemplate,
        callback,
        data,
        disabled,
        style,
        innerStyle,
        className,
        children
    } = props;

    const classes = classNames('yanbrick-select', className, {
        'disabled': disabled
    })
    const [state, setState] = useState<string>(defaultValue!);
    const [open, setOpen] = useState(false);
    const nodeRef = useRef(null);
    const ref = useRef(null);

    useClickOutside(ref, () => setOpen(false));
    useEffect(() => {
        if (callback) callback(state);
    }, [callback,state]);

    return (
        <div className={classes} style={style} ref={ref}>
            <div
                className="yanbrick-select-display"
                onClick={() => {
                    if (!disabled) setOpen(!open)
                }}
            >
                <div className="yanbrick-select-displaytext" style={innerStyle}>{state}</div>
                {icon ? <div className="yanbrick-select-icon">{icon}</div> : null}
            </div>
            <Transition nodeRef={nodeRef} in={open} animation="zoom-in-top" timeout={timeout!}>
                <div ref={nodeRef} className="yanbrick-select-options">
                    {data.map((item, index) => {
                        let renderRes = renderTemplate ? (
                            renderTemplate(item, index, setState, setOpen)
                        ) : (
                            <div
                                onClick={() => {
                                    setState(item);
                                    setOpen(false);
                                }}
                                key={index}
                            >
                                {" "}
                                {item}
                            </div>
                        );
                        return renderRes;
                    })}
                </div>
            </Transition>
        </div>
    )
}

Select.defaultProps = {
    icon: <Icon icon="angle-down"/>,
    defaultValue: "",
    timeout: 300,
    data: [],
    disabled: false
}
export default Select;