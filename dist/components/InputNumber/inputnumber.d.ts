import React, { FC } from 'react';
import { ButtonProps } from '../Button/button';
import { InputProps } from '../Input/input';
export interface InputNumberProps extends Omit<InputProps, 'defaultValue'> {
    /** 容器宽度 */
    width?: number;
    /** 输入框宽度 */
    inputWidth?: number;
    /** 选中后变化宽度 */
    extraWidth?: number;
    /** 左右2边按钮的步长 */
    step?: number;
    /** 回调取值 */
    inputNumberCallback?: (e: string) => void;
    /** 最大上限 */
    maxNumber?: number;
    /** 最小上限 */
    minNumber?: number;
    /** 初始值 */
    defaultValue?: number;
    /** 控制2个按钮的初始状态 */
    initialVisible?: boolean;
    /** 外层容器名 */
    className?: string;
    /** 两边按钮配置属性 */
    btnProps?: ButtonProps;
    /** 父组件接管的input值。注意: 传的是string */
    parentValue?: string;
    /** 父组件接管的setState值，注意：dispatch的是string */
    parentSetState?: React.Dispatch<React.SetStateAction<string>>;
    /** input的高 */
    height?: string;
    /** 不使用内部验证器，自定义验证器 */
    customValidate?: (e: string, setState: React.Dispatch<React.SetStateAction<string>>) => string;
}
export declare const InputNumber: FC<InputNumberProps>;
export default InputNumber;
