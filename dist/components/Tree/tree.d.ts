import * as React from 'react';
import { DataNode, IconType, Key, NodeElement, Entity } from './interface';
import { TreeNodeProps } from './treeNode';
interface CheckInfo {
    event: 'check';
    node: NodeElement;
    checked: boolean;
    nativeEvent: MouseEvent;
    checkedNodes: NodeElement[];
    checkedNodesPositions?: {
        node: NodeElement;
        pos: string;
    }[];
    halfCheckedKeys?: Key[];
}
export interface TreeProps {
    prefixCls: string;
    className?: string;
    style?: React.CSSProperties;
    tabIndex?: number;
    children?: React.ReactNode;
    treeData?: DataNode[];
    showLine?: boolean;
    showIcon?: boolean;
    icon?: IconType;
    focusable?: boolean;
    selectable?: boolean;
    disabled?: boolean;
    multiple?: boolean;
    checkable?: boolean | React.ReactNode;
    checkStrictly?: boolean;
    draggable?: boolean;
    defaultExpandParent?: boolean;
    autoExpandParent?: boolean;
    defaultExpandAll?: boolean;
    defaultExpandedKeys?: Key[];
    expandedKeys?: Key[];
    defaultCheckedKeys?: Key[];
    checkedKeys?: (Key)[] | {
        checked: (Key)[];
        halfChecked: Key[];
    };
    defaultSelectedKeys?: Key[];
    selectedKeys?: Key[];
    onClick?: (e: React.MouseEvent, treeNode: DataNode) => void;
    onDoubleClick?: (e: React.MouseEvent, treeNode: DataNode) => void;
    onExpand?: (expandedKeys: Key[], info: {
        node: NodeElement;
        expanded: boolean;
        nativeEvent: MouseEvent;
    }) => void;
    onCheck?: (checked: {
        checked: Key[];
        halfChecked: Key[];
    } | Key[], info: CheckInfo) => void;
    onSelect?: (// 点击中集合
    selectedKeys: Key[], info: {
        event: 'select';
        selected: boolean;
        node: NodeElement;
        selectedNodes: NodeElement[];
        nativeEvent: MouseEvent;
    }) => void;
    onLoad?: (loadedKeys: Key[], info: {
        event: 'load';
        node: NodeElement;
    }) => void;
    loadData: (treeNode: NodeElement) => Promise<void>;
    loadedKeys?: Key[];
    onMouseEnter?: (info: {
        event: React.MouseEvent;
        node: NodeElement;
    }) => void;
    onMouseLeave?: (info: {
        event: React.MouseEvent;
        node: NodeElement;
    }) => void;
    onRightClick?: (info: {
        event: React.MouseEvent;
        node: NodeElement;
    }) => void;
    onDragStart?: (info: {
        event: React.MouseEvent;
        node: NodeElement;
    }) => void;
    onDragEnter?: (info: {
        event: React.MouseEvent;
        node: NodeElement;
        expandedKeys: Key[];
    }) => void;
    onDragOver?: (info: {
        event: React.MouseEvent;
        node: NodeElement;
    }) => void;
    onDragLeave?: (info: {
        event: React.MouseEvent;
        node: NodeElement;
    }) => void;
    onDragEnd?: (info: {
        event: React.MouseEvent;
        node: NodeElement;
    }) => void;
    onDrop?: (info: {
        event: React.MouseEvent;
        node: NodeElement;
        dragNode: NodeElement;
        dragNodesKeys: Key[];
        dropPosition: number;
        dropToGap: boolean;
    }) => void;
    filterTreeNode: (treeNode: React.Component<TreeNodeProps>) => boolean;
    motion?: any;
    switcherIcon?: IconType;
}
interface TreeState {
    keyEntities: Record<Key, Entity>;
    selectedKeys: Key[];
    checkedKeys: Key[];
    halfCheckedKeys: Key[];
    loadedKeys: Key[];
    loadingKeys: Key[];
    expandedKeys: Key[];
    dragNodesKeys: Key[];
    dragOverNodeKey: Key;
    dropPosition: number;
    treeNode: React.ReactNode;
    prevProps?: Partial<TreeProps>;
}
declare class Tree extends React.Component<TreeProps, TreeState> {
    static propTypes: {};
    static defaultProps: {
        prefixCls: string;
        showLine: boolean;
        showIcon: boolean;
        selectable: boolean;
        multiple: boolean;
        checkable: boolean;
        disabled: boolean;
        checkStrictly: boolean;
        draggable: boolean;
        defaultExpandParent: boolean;
        autoExpandParent: boolean;
        defaultExpandKeys: any[];
        defaultCheckedKeys: any[];
        defaultSelectedKeys: any[];
    };
    state: {
        keyEntities: {};
        selectedKeys: any[];
        checkedKeys: any[];
        halfCheckedKeys: any[];
        loadedKeys: any[];
        loadingKeys: any[];
        expandedKeys: any[];
        dragNodesKeys: any[];
        dragOverNodeKey: string;
        dropPosition: number;
        treeNode: any[];
        prevProps: {};
    };
    /** 内部用法用在rc-tree-select的 */
    domTreeNodes: Record<string | number, HTMLElement>;
    delayedDragEnterLogic: Record<Key, number> | undefined;
    dragNode: NodeElement | undefined;
    isKeyChecked: (key: unknown) => boolean;
    static getDerivedStateFromProps(props: any, prevState: any): Partial<TreeState>;
    onNodeClick: (e: React.MouseEvent, treeNode: DataNode) => void;
    onNodeDoubleClick: (e: React.MouseEvent<Element, MouseEvent>, treeNode: DataNode) => void;
    onNodeExpand: (e: any, treeNode: any) => void;
    onNodeSelect: (e: any, treeNode: any) => void;
    onNodeCheck: (e: any, treeNode: any, checked: any) => void;
    onNodeLoad: (treeNode: any) => void;
    onNodeMouseEnter: (event: any, node: any) => void;
    onNodeMouseLeave: (event: any, node: any) => void;
    onNodeContextMenu: (event: any, node: any) => void;
    /**
     * 该模版主要将用户原始节点增添第一次内部计算所需属性
     *
     * [Legacy] 这里改进使用了level+index的新追踪线索，给每个children
     * 中每个节点加上level-index做位置的唯一标示。(level默认是从0开始0层级)
     *
     * 遗留问题还在使用的是key来做判断使用key就得额外通过cloneElement来辅助使用，
     */
    renderTreeNode: (child: React.FunctionComponentElement<{
        key: any;
        eventKey: any;
        expanded: boolean;
        selected: boolean;
        loaded: boolean;
        loading: boolean;
        checked: boolean;
        halfChecked: boolean;
        pos: string;
        dragOver: boolean;
        dragOverGapTop: boolean;
        dragOverGapBottom: boolean;
    }>, index: number, level?: number) => React.FunctionComponentElement<{
        key: any;
        eventKey: any;
        expanded: boolean;
        selected: boolean;
        loaded: boolean;
        loading: boolean;
        checked: boolean;
        halfChecked: boolean;
        pos: string;
        dragOver: boolean;
        dragOverGapTop: boolean;
        dragOverGapBottom: boolean;
    }>;
    registerTreeNode: (key: Key, node: any) => void;
    render(): JSX.Element;
}
export default Tree;
