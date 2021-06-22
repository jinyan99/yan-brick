import { FC, ReactNode, DOMAttributes } from "react";
export interface BadgeProps extends DOMAttributes<HTMLDivElement> {
    /** 颜色*/
    type?: "primary" | "default" | "danger" | "secondary" | "success" | "info" | "light" | "warning" | "dark";
    /**最外层元素的额外类名*/
    className?: string;
    /**ref回调*/
    refCallback?: (e: HTMLDivElement | null) => void;
    /** 数字，文本，图标都可以传*/
    count?: ReactNode;
    /** 控制是否显示*/
    visible?: boolean;
    /** 是否只显示小点 */
    dot?: boolean;
}
export declare const Badge: FC<BadgeProps>;
export default Badge;
