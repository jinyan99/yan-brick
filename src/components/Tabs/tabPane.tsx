import React, {FC, ReactNode} from 'react';

export interface TabPaneProps {
    [x: string]: ReactNode;
    /** 分配当前tabPane下标 */
    index: string;
    /** 标题 */
    title?: string;
    /** 禁用状态 */
    disabled?: boolean
}
export const TabPane:FC<TabPaneProps> = (props) => {
    const {
        index,
        title,
        disabled
    } = props;
	return (
		<div>
			<div>{props.children}</div>
		</div>
	);
};

export default TabPane;
