import React, { CSSProperties, DOMAttributes, PropsWithChildren } from 'react';
export interface LayoutItemProps extends DOMAttributes<HTMLElement> {
    /** 样式 */
    style?: CSSProperties;
    /** 类名 */
    className?: string;
}
export interface LayoutProps extends LayoutItemProps {
    /** 子元素是否横向排列 */
    row?: boolean;
}
export declare const Layout: {
    (props: PropsWithChildren<LayoutProps>): JSX.Element;
    Header: React.FC<LayoutItemProps>;
    Content: React.FC<LayoutItemProps>;
    Sider: React.FC<LayoutItemProps>;
    Footer: React.FC<LayoutItemProps>;
};
export default Layout;
