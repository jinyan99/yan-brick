import { CSSProperties, FC } from 'react';
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
    style?: CSSProperties;
}
export declare const Checkbox: FC<CheckboxProps>;
export default Checkbox;
