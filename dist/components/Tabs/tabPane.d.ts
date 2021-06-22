import { FC, ReactNode } from 'react';
export interface TabPaneProps {
    [x: string]: ReactNode;
    /** 分配当前tabPane下标 */
    index: string;
    /** 标题 */
    title?: string;
    /** 禁用状态 */
    disabled?: boolean;
}
export declare const TabPane: FC<TabPaneProps>;
export default TabPane;
