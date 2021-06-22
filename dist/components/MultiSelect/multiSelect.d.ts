import { FC, ReactNode, CSSProperties } from 'react';
export interface MultiSelectProps {
    /** 选框中数据 */
    data: Array<string>;
    /** 默认选中索引 */
    defaultIndex?: Array<number>;
    /** 展示右侧图标 */
    icon?: ReactNode;
    /** 主题类型设定 */
    displayType?: 'primary' | 'default' | 'danger' | 'secondary' | 'success' | 'info' | 'light' | 'warning' | 'dark';
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
export declare const MultiSelect: FC<MultiSelectProps>;
export default MultiSelect;
