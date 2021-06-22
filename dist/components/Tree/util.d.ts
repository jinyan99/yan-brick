import React from 'react';
import { NodeElement, Key, DataNode, Entity } from './interface';
import { TreeProps } from './tree';
/**
 * Returns only the data- and aria- key/value pairs
 */
export declare function getDataAndAria(props: any): any;
/**
 * Use `rc-util` `toArray` to get the children list which keeps the key.
 * And return single node if children is only one(This can avoid `key` missing check).
 * 作了兼容处理，多个子节点就返回数组，数组长度为1就一个节点则只返回一个节点即可，有点像React.Children
 */
export declare function mapChildren(children: React.ReactNode, func: (node: NodeElement, index: number) => React.ReactElement): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)> | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>[];
export declare function warnOnlyTreeNode(): void;
export declare function getNodeChildren(children: React.ReactNode): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>[];
export declare function isTreeNode(node: NodeElement): boolean;
export declare function getPosition(level: string | number, index: number): string;
export declare function isCheckDisabled(node: NodeElement): boolean;
export declare function convertDataToTree(treeData: DataNode[], processor?: {
    processProps: (prop: DataNode) => any;
}): React.ReactNode;
/**
 * 计算treeNodes entities，‘processTreeEntity’ 将被用于‘rc-tree-select’
 * @param treeNodes Tree组件过来的通用数据结构 组件对象型数组结构
 * @param processTreeEntity 用户自定义entity实体的接口
 *
 */
interface Wrapper {
    posEntities: Record<string, Entity>;
    keyEntities: Record<Key, Entity>;
}
export declare function convertTreeToEntities(treeNodes: NodeElement[], { initWrapper, processEntity, onProcessFinished }?: {
    initWrapper?: (wrapper: Wrapper) => Wrapper;
    processEntity?: (entity: Entity, wrapper: Wrapper) => void;
    onProcessFinished?: (wrapper: Wrapper) => void;
}): {
    posEntities: {};
    keyEntities: {};
};
export declare function traverseTreeNodes(treeNodes: NodeElement[], callback: (data: {
    node: NodeElement;
    index: number;
    pos: string | number;
    key: Key;
    parentPos: string | number;
}) => void): void;
/**
 * 若用户使用 `autoExpandParent` we should get the list of parent node
 * @param keyList
 * @param keyEntities
 */
export declare function conductExpandParent(keyList: Key[], keyEntities: Record<Key, Entity>): string[];
/**
 * Return selectedKeys according with multiple prop
 * @param selectedKeys
 * @param props
 * @returns [string]
 */
export declare function calcSelectedKeys(selectedKeys: Key[], props: TreeProps): (string | number)[];
/**
 * Parse `checkedKeys` to { checkedKeys, halfCheckedKeys } style
 */
export declare function parseCheckedKeys(keys: Key[] | {
    checked: Key[];
    halfChecked: Key[];
}): any;
/**
 * 执行状态检查(通过keyList)
 * Conduct check state by the keyList. It will conduct up & from the provided key.
 * If the conduct path reach the disabled or already checked / unchecked node will stop conduct.
 */
export declare function conductCheck(
/** list of keys */
keyList: Key[], 
/** is check the node or not */
isCheck: boolean, 
/** parsed by `convertTreeToEntities` function in Tree */
keyEntities: Record<Key, Entity>, 
/** Can pass current checked status for process (usually for uncheck operation) */
checkStatus?: {
    checkedKeys?: Key[];
    halfCheckedKeys?: Key[];
}): {
    checkedKeys: any[];
    halfCheckedKeys: any[];
};
export {};
