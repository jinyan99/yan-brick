import React, { CSSProperties, DOMAttributes, FC, ReactNode } from 'react';
export interface AlertProps extends DOMAttributes<HTMLDivElement> {
    /** 标题 */
    title?: string;
    /** 类型 */
    type?: 'primary' | 'default' | 'danger' | 'secondary' | 'success' | 'info' | 'light' | 'warning' | 'dark';
    /** 是否有关闭按钮 */
    close?: boolean;
    /** 内容 */
    description?: ReactNode;
    /** 动画方向 */
    directions?: 'left' | 'top' | 'right' | 'bottom' | 'allscale';
    /** 自动关闭延时时间 0为忽略 */
    autoclosedelay?: number;
    /** 额外类名 */
    className?: string;
    /** 图标 */
    icon?: ReactNode;
    /** 启用开场动画 */
    initAnimate?: boolean;
    /** 是否套一层div */
    wrapper?: boolean;
    /** 主动关闭回调函数，若需要主动消失，需操作setState，或使用上层组件的state */
    initiativeCloseCallback?: (setState: React.Dispatch<React.SetStateAction<boolean>>, e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    /** 自动关闭后的回调函数 */
    closeCallback?: () => void;
    /** 自定义动画类名 */
    animateClassName?: string;
    /** 动画持续时间 */
    timeout?: number;
    /** 孩子 */
    children?: ReactNode;
    /** 外层样式 */
    style?: CSSProperties;
}
export declare const Alert: FC<AlertProps>;
export default Alert;
