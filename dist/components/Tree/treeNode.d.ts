import * as React from 'react';
import { TreeContextProps } from './contextTypes';
import { IconType } from './interface';
export interface TreeNodeProps {
    eventKey?: string;
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    onSelect?: React.MouseEventHandler<HTMLSpanElement>;
    expanded?: boolean;
    selected?: boolean;
    checked?: boolean;
    loaded?: boolean;
    loading?: boolean;
    halfChecked?: boolean;
    children?: React.ReactNode;
    title?: React.ReactNode;
    pos?: string;
    dragOver?: boolean;
    dragOverGapTop?: boolean;
    dragOverGapBottom?: boolean;
    isLeaf?: boolean;
    checkable?: boolean;
    selectable?: boolean;
    disabled?: boolean;
    disableCheckbox?: boolean;
    icon?: IconType;
    switcherIcon?: IconType;
}
export interface InternalTreeNodeProps extends TreeNodeProps {
    context: TreeContextProps;
}
declare class TreeNode extends React.Component<InternalTreeNodeProps> {
    static propTypes: {};
    state: {
        dragNodeHighlight: boolean;
    };
    selectHandle: HTMLSpanElement | undefined;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    isDisabled: () => boolean;
    isSelectable(): boolean;
    isCheckable: () => {};
    isLeaf: () => boolean;
    onSelectorClick: (e: any) => void;
    onSelect: (e: any) => void;
    onCheck: (e: any) => void;
    onSelectorDoubleClick: (e: any) => void;
    onContextMenu: (e: any) => void;
    syncLoadData: (props: any) => void;
    renderSelector: () => JSX.Element;
    renderIcon: () => JSX.Element;
    getNodeState: () => "open" | "close";
    renderChildren: () => JSX.Element;
    getNodeChildren: () => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>[];
    render(): JSX.Element;
}
declare const ContextTreeNode: React.FC<TreeNodeProps>;
export { TreeNode as InternalTreeNode };
export default ContextTreeNode;
