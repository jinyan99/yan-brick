import React, { CSSProperties, FC, ReactNode } from 'react';
export interface SelectProps {
    /** 选项数据 */
    data: Array<string>;
    /** 模版渲染，setState设置展示元素的方法，setOpen控制开关 */
    renderTemplate?: (item: string, index: number, setState: React.Dispatch<React.SetStateAction<string>>, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => ReactNode;
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
    className?: string;
}
/**
 * Select组件用法
 * ## Select引入
 * ~~~js
 * import {Select} from 'yan-brick'
 * ~~~
 */
export declare const Select: FC<SelectProps>;
export default Select;
