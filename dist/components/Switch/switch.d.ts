import { PropsWithChildren } from "react";
export interface SwitchProps {
    /** 底座颜色*/
    bottomType?: "primary" | "default" | "danger" | "secondary" | "success" | "info" | "light" | "warning" | "dark";
    /** 按钮颜色*/
    btnType?: "primary" | "default" | "danger" | "secondary" | "success" | "info" | "light" | "warning" | "dark";
    /** 大小*/
    switchSize?: "default" | "sm" | "lg";
    /** 禁用*/
    disabled: boolean;
    /** 默认开关*/
    defaultState: boolean;
    /** 选择后回调 */
    callback?: (v: boolean) => void;
    /** 改变状态前回调,需要返回状态值 */
    beforeChange?: (v: boolean) => boolean;
}
export declare function Switch(props: PropsWithChildren<SwitchProps>): JSX.Element;
export declare namespace Switch {
    var defaultProps: {
        bottomType: string;
        btnType: string;
        switchSize: string;
        disabled: boolean;
        defaultState: boolean;
    };
}
export default Switch;
