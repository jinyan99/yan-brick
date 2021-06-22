import React, { FC } from 'react';
export interface TabsProps {
    /** 默认激活下标 */
    defaultIndex?: string;
    /** 自定义类名 */
    className?: string;
    /** 模式选择 */
    mode?: 'horizontal' | 'vertical';
    /** 自定义整体样式 */
    style?: React.CSSProperties;
    /** 选中回调 */
    onSelect?: (selectIndex: string) => void;
}
export declare const Tabs: FC<TabsProps>;
export default Tabs;
