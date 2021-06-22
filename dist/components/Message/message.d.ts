import { FC, ReactNode } from 'react';
import { AlertProps } from '../Alert/alert';
export declare type DirectionType = 'top' | 'lt' | 'lb' | 'rt' | 'rb';
export interface MessageProps extends Omit<AlertProps, 'directions'> {
    /** 标题内容 */
    title?: string;
    /** 容器: 默认不传，使用内部默认container*/
    container?: Element | null;
    /** 类型 */
    type?: 'primary' | 'default' | 'danger' | 'secondary' | 'success' | 'info' | 'light' | 'warning' | 'dark';
    /** 位于container的方向 */
    directions?: 'top' | 'lt' | 'lb' | 'rt' | 'rb';
    /** 自动关闭延迟 */
    autoclosedelay?: number;
    /** 图标 */
    icon?: ReactNode;
    /** 额外类名 */
    className?: string;
    /** 参考alert: 默认为不传，使用内部默认的回调 */
    closeCallback?: () => void;
    /** 文本内容 */
    description?: string;
    /** 关闭按钮 */
    close?: boolean;
    /** 动画时间 */
    timeout?: number;
}
export declare const Message: FC<MessageProps>;
interface DefaultOptionsType {
    /** 方向 */
    directions?: DirectionType;
    /** 描述 */
    description?: string | undefined;
    /** icon图标 */
    icon?: ReactNode;
    /** 自动关闭延时 */
    autoclosedelay?: number;
    /** 是否显示关闭按钮 */
    close?: boolean;
    /** 手动关闭回调函数 */
    initiativeCloseCallback?: () => void;
}
export declare const message: {
    default: (str: string, options?: DefaultOptionsType) => void;
    primary: (str: string, options?: DefaultOptionsType) => void;
    danger: (str: string, options?: DefaultOptionsType) => void;
    warning: (str: string, options?: DefaultOptionsType) => void;
    info: (str: string, options?: DefaultOptionsType) => void;
    secondary: (str: string, options?: DefaultOptionsType) => void;
    success: (str: string, options?: DefaultOptionsType) => void;
    light: (str: string, options?: DefaultOptionsType) => void;
    dark: (str: string, options?: DefaultOptionsType) => void;
};
export default Message;
