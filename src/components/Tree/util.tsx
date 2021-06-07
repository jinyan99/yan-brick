import React, {Children} from 'react';
import warning from 'warning';
import toArray from 'rc-util/lib/Children/toArray';
import TreeNode, {TreeNodeProps } from './treeNode';
import { NodeElement, Key, DataNode, Entity } from './interface';
import { TreeProps } from './tree';

let onlyTreeNodeWarned = false;

/**
 * Returns only the data- and aria- key/value pairs
 */
export function getDataAndAria(props:any/*Partial<TreeProps | TreeNodeProps>*/) {
  return Object.keys(props).reduce((prev:any, key) => {
    if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-') {
      prev[key] = props[key];
    }
    return prev;
  }, {});
}

/**
 * Use `rc-util` `toArray` to get the children list which keeps the key.
 * And return single node if children is only one(This can avoid `key` missing check).
 * 作了兼容处理，多个子节点就返回数组，数组长度为1就一个节点则只返回一个节点即可，有点像React.Children
 */
export function mapChildren(
  children: React.ReactNode,
  func: (node: NodeElement, index: number) => React.ReactElement,
) {
  const list = toArray(children).map(func);
  if (list.length === 1) {
    return list[0];
  }
  return list;
}

// =========== 小工具方法 START =============
export function warnOnlyTreeNode() {
  if (onlyTreeNodeWarned) return;

  onlyTreeNodeWarned = true;
  warning(false, 'Tree only accept TreeNode as children')
}

export function getNodeChildren(children: React.ReactNode) {
  return toArray(children).filter(isTreeNode);
}

export function isTreeNode(node: NodeElement) {
  return node && node.type && node.type.isTreeNode;
}

export function getPosition(level: string | number, index: number) {
  return `${level}-${index}`
}

export function isCheckDisabled(node: NodeElement) {
  const { disabled, disableCheckbox, checkable } = (node.props || {}) as NodeElement['props'];
  return !!(disabled || disableCheckbox) || checkable === false;
}

/**
 * Since React internal will convert key to string,
 * we need do this to avoid `checkStrictly` use number match
 */
function keyListToString(keyList: Key[]) {
  if (!keyList) return keyList;
  return keyList.map(key => String(key));
}
// ========== 小工具方法 END ==============

/**
 * 处理用户原生NodeData，转化成待渲染的[<TreeNode/>,...] :ReactNode类型 元素---成children通用结构
 * @param treeData
 * @param processor
 */
// 输入props返回props只不过变了下类型约束
const internalProcessProps = (props: DataNode): Partial<TreeNodeProps> => props;
export function convertDataToTree(
  treeData: DataNode[],
  processor?: {processProps: (prop: DataNode) => any}
): React.ReactNode {
  if (!treeData) return [];

  const {processProps = internalProcessProps} = processor || {};
  const list = Array.isArray(treeData) ? treeData : [treeData];

  return list.map(({children, ...props}) => {
    const childrenNodes = convertDataToTree(children!, processor);

    return <TreeNode {...processProps(props)}>{childrenNodes}</TreeNode>
  })
}

/**
 * 计算treeNodes entities，‘processTreeEntity’ 将被用于‘rc-tree-select’
 * @param treeNodes Tree组件过来的通用数据结构 组件对象型数组结构
 * @param processTreeEntity 用户自定义entity实体的接口
 *
 */
interface Wrapper {
  posEntities: Record<string, Entity>;
  keyEntities: Record<Key, Entity>
}
export function convertTreeToEntities(
  treeNodes: NodeElement[],
  {
    initWrapper,
    processEntity,
    onProcessFinished
  }: {
    initWrapper?: (wrapper: Wrapper) => Wrapper;
    processEntity?: (entity: Entity, wrapper:Wrapper) => void;
    onProcessFinished?: (wrapper: Wrapper) => void;
  } = {}
) {

  const posEntities = {};// 关于位置的实体对象数据
  const keyEntities = {};// 关于key映射的实体对象数据

  let wrapper = {//最钟返回的对象
    posEntities,
    keyEntities
  };

  if (initWrapper) {
    wrapper = initWrapper(wrapper) || wrapper;
  }

  traverseTreeNodes(treeNodes, item => {
    const {node, index, pos, key, parentPos} = item;
    const entity: Entity = {node, index, key, pos};

    posEntities[pos] = entity;
    keyEntities[key] = entity;

    // 填满children
    entity.parent = posEntities[parentPos];
    if (entity.parent) {
      entity.parent.children = entity.parent.children || [];
      entity.parent.children.push(entity);
    }

    if (processEntity) {
      processEntity(entity, wrapper);
    }
  });

  if (onProcessFinished) {
    onProcessFinished(wrapper);
  }

  return wrapper
}

export function traverseTreeNodes(
  treeNodes: NodeElement[],
  callback: (data: {
    node: NodeElement;
    index: number;
    pos: string | number;
    key: Key;
    parentPos: string | number;
  }) => void,
) {
  function processNode(
    node: NodeElement,
    index?: number,
    parent?: { node: NodeElement; pos: string | number },
  ) {
    const children = node ? node.props.children : treeNodes;
    const pos = node ? getPosition(parent!.pos, index!) : 0;

    // Filter children which isTreeNode
    const childList = getNodeChildren(children);

    // Process node if is not root
    if (node) {
      const data = {
        node,
        index,
        pos,
        key: node.key || pos,
        parentPos: parent!.node ? parent!.pos : null,
      };

      callback(data);
    }

    // Process children node
    Children.forEach(childList, (subNode, subIndex) => {
      processNode(subNode, subIndex, { node, pos });
    });
  }

  processNode(null);
}

/**
 * 若用户使用 `autoExpandParent` we should get the list of parent node
 * @param keyList
 * @param keyEntities
 */
export function conductExpandParent(keyList: Key[], keyEntities: Record<Key, Entity>) {
  const expandedKeys = {};

  function conductUp(key: Key) {
    if (expandedKeys[key]) return;

    const entity = keyEntities[key];
    if (!entity) return;

    expandedKeys[key] = true;

    const { parent, node } = entity;

    if (isCheckDisabled(node)) return;

    if (parent) {
      conductUp(parent.key);
    }
  }

  (keyList || []).forEach(key => {
    conductUp(key);
  });

  return Object.keys(expandedKeys);
}

/**
 * Return selectedKeys according with multiple prop
 * @param selectedKeys
 * @param props
 * @returns [string]
 */
export function calcSelectedKeys(selectedKeys: Key[], props: TreeProps) {
  if (!selectedKeys) return undefined;

  const { multiple } = props;
  if (multiple) {
    return selectedKeys.slice();
  }

  if (selectedKeys.length) {
    return [selectedKeys[0]];
  }
  return selectedKeys;
}

/**
 * Parse `checkedKeys` to { checkedKeys, halfCheckedKeys } style
 */
export function parseCheckedKeys(keys: Key[] | { checked: Key[]; halfChecked: Key[] }) {
  if (!keys) {
    return null;
  }

  // Convert keys to object format
  let keyProps;
  if (Array.isArray(keys)) {
    // [Legacy] Follow the api doc
    keyProps = {
      checkedKeys: keys,
      halfCheckedKeys: undefined,
    };
  } else if (typeof keys === 'object') {
    keyProps = {
      checkedKeys: keys.checked || undefined,
      halfCheckedKeys: keys.halfChecked || undefined,
    };
  } else {
    warning(false, '`checkedKeys` is not an array or an object');
    return null;
  }

  keyProps.checkedKeys = keyListToString(keyProps.checkedKeys);
  keyProps.halfCheckedKeys = keyListToString(keyProps.halfCheckedKeys!);

  return keyProps;
}

/**
 * 执行状态检查(通过keyList)
 * Conduct check state by the keyList. It will conduct up & from the provided key.
 * If the conduct path reach the disabled or already checked / unchecked node will stop conduct.
 */
export function conductCheck(
  /** list of keys */
  keyList: Key[],
  /** is check the node or not */
  isCheck: boolean,
  /** parsed by `convertTreeToEntities` function in Tree */
  keyEntities: Record<Key, Entity>,
  /** Can pass current checked status for process (usually for uncheck operation) */
  checkStatus: { checkedKeys?: Key[]; halfCheckedKeys?: Key[] } = {},
) {
  const checkedKeys = {};
  const halfCheckedKeys = {}; // Record the key has some child checked (include child half checked)

  (checkStatus.checkedKeys || []).forEach(key => {
    checkedKeys[key] = true;
  });

  (checkStatus.halfCheckedKeys || []).forEach(key => {
    halfCheckedKeys[key] = true;
  });

  // Conduct up
  function conductUp(key: Key) {
    if (checkedKeys[key] === isCheck) return;

    const entity = keyEntities[key];
    if (!entity) return;

    const { children, parent, node } = entity;

    if (isCheckDisabled(node)) return;

    // Check child node checked status
    let everyChildChecked = true;
    let someChildChecked = false; // Child checked or half checked

    (children || [])
      .filter(child => !isCheckDisabled(child.node))
      .forEach(({ key: childKey }) => {
        const childChecked = checkedKeys[childKey];
        const childHalfChecked = halfCheckedKeys[childKey];

        if (childChecked || childHalfChecked) someChildChecked = true;
        if (!childChecked) everyChildChecked = false;
      });

    // Update checked status
    if (isCheck) {
      checkedKeys[key] = everyChildChecked;
    } else {
      checkedKeys[key] = false;
    }
    halfCheckedKeys[key] = someChildChecked;

    if (parent) {
      conductUp(parent.key);
    }
  }

  // Conduct down
  function conductDown(key: Key) {
    if (checkedKeys[key] === isCheck) return;

    const entity = keyEntities[key];
    if (!entity) return;

    const { children, node } = entity;

    if (isCheckDisabled(node)) return;

    checkedKeys[key] = isCheck;

    (children || []).forEach(child => {
      conductDown(child.key);
    });
  }

  function conduct(key: Key) {
    const entity = keyEntities[key];

    if (!entity) {
      warning(false, `'${key}' does not exist in the tree.`);
      return;
    }

    const { children, parent, node } = entity;
    checkedKeys[key] = isCheck;

    if (isCheckDisabled(node)) return;

    // Conduct down
    (children || [])
      .filter(child => !isCheckDisabled(child.node))
      .forEach(child => {
        conductDown(child.key);
      });

    // Conduct up
    if (parent) {
      conductUp(parent.key);
    }
  }

  (keyList || []).forEach(key => {
    conduct(key);
  });

  const checkedKeyList = [];
  const halfCheckedKeyList = [];

  // Fill checked list
  Object.keys(checkedKeys).forEach(key => {
    if (checkedKeys[key]) {
      checkedKeyList.push(key);
    }
  });

  // Fill half checked list
  Object.keys(halfCheckedKeys).forEach(key => {
    if (!checkedKeys[key] && halfCheckedKeys[key]) {
      halfCheckedKeyList.push(key);
    }
  });

  return {
    checkedKeys: checkedKeyList,
    halfCheckedKeys: halfCheckedKeyList,
  };
}