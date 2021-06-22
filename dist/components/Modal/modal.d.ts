import React, { FC, ReactNode, CSSProperties } from 'react';
export interface ModalType {
    /** 父组件用来控制的状态 */
    visible: boolean;
    /** 容器位置 */
    container?: Element;
    /** 父组件用来改变显示状态的setState */
    setState: React.Dispatch<React.SetStateAction<boolean>>;
    /** 弹出框标题 */
    title?: ReactNode;
    /** 是否有确认按钮 */
    confirm?: boolean;
    /** 确认按钮文本 */
    okText?: string;
    /** 取消按钮文本 */
    cancelText?: string;
    /** 确认回调，需自行处理关闭 */
    onOk?: () => void;
    /** 取消回调，需自行处理关闭 */
    onCancel?: () => void;
    /** 显示状态改变回调 */
    callback?: (b: boolean) => void;
    /** 点击mask是否关闭模态框 */
    maskClose?: boolean;
    /** 是否有mask */
    mask?: boolean;
    /** 自定义模态框位置 */
    style?: CSSProperties;
    /** 是否展现右上角关闭按钮 */
    closeButton?: boolean;
    /** 动画时间 */
    delay?: number;
    /** 额外类名 */
    className?: string;
    /** 是否停止滚动 */
    stopScroll?: boolean;
    /** portal-style */
    portalStyle?: CSSProperties;
    /** 默认确认按钮大小 */
    btnSize?: 'sm' | 'lg';
    /** portal元素的回调，接受元素要portal的标签 */
    refCallback?: (ref: HTMLDivElement) => void;
    /** 点关闭icon的回调 */
    closeCallback?: () => void;
}
export declare const Modal: FC<ModalType>;
export default Modal;
