import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import toArray from 'rc-util/lib/Children/toArray';
import {polyfill} from 'react-lifecycles-compat';

import {TreeContext} from './contextTypes';
import {
  convertTreeToEntities,
  convertDataToTree,
  getDataAndAria,
  getPosition,
  // getDragNodesKeys,
  parseCheckedKeys,
  conductExpandParent,
  calcSelectedKeys,
  // calcDropPosition,
  // arrAdd,
  // arrDel,
  // posToArr,
  mapChildren,
  conductCheck,
  warnOnlyTreeNode,
} from './util';
import {DataNode, IconType, Key, NodeElement, Entity} from './interface';
import TreeNode, {TreeNodeProps} from './treeNode';

interface CheckInfo {
  event: 'check';
  node: NodeElement;
  checked: boolean;
  nativeEvent: MouseEvent;
  checkedNodes: NodeElement[];// 选中节点集合
  checkedNodesPositions?: {node: NodeElement; pos: string}[];// 选中节点位置集合
  halfCheckedKeys?: Key[];// 半选节点Key集合即可，不用节点元素
}

export interface TreeProps {
  prefixCls: string;
  className?: string;
  style?: React.CSSProperties;
  tabIndex?: number;
  children?: React.ReactNode;
  treeData?: DataNode[];// 用户传入数据格式，尽量少而精，其他不需暴漏的属性由组件内部封装
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
  checkedKeys?: (Key)[] | {checked: (Key)[]; halfChecked: Key[]};
  defaultSelectedKeys?: Key[];
  selectedKeys?: Key[];

  onClick?: (e: React.MouseEvent, treeNode: DataNode) => void;
  onDoubleClick?: (e: React.MouseEvent, treeNode: DataNode) => void;
  onExpand?: (
    expandedKeys: Key[],
    info: {
      node: NodeElement;
      expanded: boolean;
      nativeEvent: MouseEvent;
    }
  ) => void;
  onCheck?: (checked: {checked: Key[]; halfChecked: Key[]} | Key[], info: CheckInfo) => void;
  onSelect?: (// 点击中集合
    selectedKeys: Key[],
    info: {
      event: 'select';
      selected: boolean;
      node: NodeElement;
      selectedNodes: NodeElement[];
      nativeEvent: MouseEvent;
    }
  ) => void;
  onLoad?: (
    loadedKeys: Key[],
    info: {
      event: 'load';
      node: NodeElement;
    }
  ) => void;
  loadData: (treeNode: NodeElement) => Promise<void>;
  loadedKeys?: Key[];
  onMouseEnter?: (info: {event: React.MouseEvent; node: NodeElement}) => void;
  onMouseLeave?: (info: { event: React.MouseEvent; node: NodeElement }) => void;
  onRightClick?: (info: {event: React.MouseEvent; node: NodeElement}) => void;

  onDragStart?: (info: { event: React.MouseEvent; node: NodeElement }) => void;
  onDragEnter?: (info: { event: React.MouseEvent; node: NodeElement; expandedKeys: Key[] }) => void;
  onDragOver?: (info: { event: React.MouseEvent; node: NodeElement }) => void;
  onDragLeave?: (info: { event: React.MouseEvent; node: NodeElement }) => void;
  onDragEnd?: (info: { event: React.MouseEvent; node: NodeElement }) => void;
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
  keyEntities: Record<Key, Entity>;// Record内置类型

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

class Tree extends React.Component<TreeProps, TreeState> {
  // ======= 定义基础属性 ===========
  static propTypes = {};

  static defaultProps = {
    prefixCls: 'rc-tree',
    showLine: false,
    showIcon: true,
    selectable: true,
    multiple: false,
    checkable: false,
    disabled: false,
    checkStrictly: false,
    draggable: false,

    defaultExpandParent: true,
    autoExpandParent: false,

    defaultExpandKeys: [],
    defaultCheckedKeys: [],
    defaultSelectedKeys: []
  }

  state = {
    keyEntities: {},

    selectedKeys: [],
    checkedKeys: [],
    halfCheckedKeys: [],
    loadedKeys: [],
    loadingKeys: [],
    expandedKeys: [],
    dragNodesKeys: [],
    dragOverNodeKey: '',
    dropPosition: 0,

    treeNode: [],
    prevProps: {}
  }
  /** 内部用法用在rc-tree-select的 */
  domTreeNodes: Record<string | number, HTMLElement> = {};

  delayedDragEnterLogic: Record<Key, number> | undefined;

  dragNode: NodeElement | undefined;

  // ======== 状态判断 ============
  isKeyChecked = (key: unknown) => {
    const { checkedKeys = [] as Array<unknown>} = this.state;
    return checkedKeys.indexOf(key) !== -1;
  }

  // ======== 生命周期 ============
  static getDerivedStateFromProps(props: any, prevState: any) {
    console.log('要挂载tree层了')
    const {prevProps} = prevState;
    const newState: Partial<TreeState> = {
      prevProps: props
    };

    // 比对props中值决定是否rerender
    function needSync(name: string) {
      return (!prevState && name in props) || (prevProps && prevProps[name] !== props[name]);
    }

    // ===== Tree Node =====
    let treeNode:any = null;

    // Check if 'treeData' or 'children' changed and save into the state
    // 因为treeData属性与chidlren是两种使用方式，同时只能出现其中一种
    if (needSync('treeData')) {
      // 处理用户原生NodeData，转化成ReactNode类型的 TreeNode组件组成的数组
      treeNode = convertDataToTree(props.treeData);
    }
    else if (needSync('children')) {
      treeNode = toArray(props.children);
    }

    // 缓存treeNodes 以便我们在事件触发时得到treeNodes
    if (treeNode) {
      newState.treeNode = treeNode;

      // 再把treeNode组件数组 进一步转化为实体entities数据  用于高效映射
      const entitiesMap = convertTreeToEntities(treeNode);
      newState.keyEntities = entitiesMap.keyEntities;
    }

    const keyEntities = newState.keyEntities || prevState.keyEntities;

    // ===== expandedKeys =====
    if (needSync('expandedKeys') || (prevProps && needSync('autoExpandedParent'))) {
      newState.expandedKeys =
        props.autoExpandedParent || (!prevProps && props.defaultExpandParent)
          ? conductExpandParent(props.expandedKeys, keyEntities)
          : props.expandedKeys;
    }
    else if (!prevProps && props.defaultExpandAll) {
      newState.expandedKeys = Object.keys(keyEntities);
    }
    else if (!prevProps && props.defaultExpandedKeys) {
      newState.expandedKeys =
        props.autoExpandParent || props.defaultExpandParent
          ? conductExpandParent(props.defaultExpandedKeys, keyEntities)
          : props.defaultExpandedKeys;
    }
    // ===== selectedKeys =====
    if (props.selectable) {
      if (needSync('selectedKeys')) {
        newState.selectedKeys = calcSelectedKeys(props.selectedKeys, props);
      } else if (!prevProps && props.defaultSelectedKeys) {
        newState.selectedKeys = calcSelectedKeys(props.defaultSelectedKeys, props);
      }
    }
    // ===== checkedKeys ======
    if (props.checkable) {
      let checkedKeyEntity;

      if (needSync('checkedKeys')) {
        checkedKeyEntity = parseCheckedKeys(props.checkedKeys) || {};
      } else if (!prevProps && props.defaultCheckedKeys) {
        checkedKeyEntity = parseCheckedKeys(props.defaultCheckedKeys) || {};
      } else if (treeNode) {
        // If treeNode changed, we also need check it
        checkedKeyEntity = parseCheckedKeys(props.checkedKeys) || {
          checkedKeys: prevState.checkedKeys,
          halfCheckedKeys: prevState.halfCheckedKeys,
        };
      }

      if (checkedKeyEntity) {
        let { checkedKeys = [], halfCheckedKeys = [] } = checkedKeyEntity;

        if (!props.checkStrictly) {
          const conductKeys = conductCheck(checkedKeys, true, keyEntities);
          ({ checkedKeys, halfCheckedKeys } = conductKeys);
        }

        newState.checkedKeys = checkedKeys;
        newState.halfCheckedKeys = halfCheckedKeys;
      }
    }
    // ===== loadedKeys =======
    if (needSync('loadedKeys')) {
      newState.loadedKeys = props.loadedKeys;
    }

    return newState;
  }

  // ========== 回调相关 ============
  onNodeClick = (e: React.MouseEvent, treeNode: DataNode) => {
    console.log('节点点击',treeNode)
    const {onClick} = this.props;
    if (onClick) onClick(e, treeNode);
  }

  onNodeDoubleClick = (e: React.MouseEvent<Element, MouseEvent>, treeNode: DataNode) => {
    console.log('节点双击', treeNode)
    const {onDoubleClick} = this.props;
    if (onDoubleClick) onDoubleClick(e, treeNode);
  }

  onNodeExpand = (e: any, treeNode: any) => {
    console.log('要展开节点了',treeNode)
  }

  onNodeSelect = (e: any, treeNode: any) => {
    console.log('节点选中', treeNode)
  }

  onNodeCheck = (e: any, treeNode: any, checked: any) => {
    console.log('节点多选框选中', treeNode, checked);
  }

  onNodeLoad = (treeNode: any) => {
    console.log('节点加载---返promise实例', treeNode)
  };

  onNodeMouseEnter = (event: any, node: any) => {
    console.log('节点滑入', node)
  };

  onNodeMouseLeave = (event: any, node: any) => {
    console.log('节点离开',node)
  }

  onNodeContextMenu = (event: any, node: any) => {
    console.log('节点唤起右键菜单', node);
  }

  // ======= 渲染模版相关 ============
  /**
   * 该模版主要将用户原始节点增添第一次内部计算所需属性
   *
   * [Legacy] 这里改进使用了level+index的新追踪线索，给每个children
   * 中每个节点加上level-index做位置的唯一标示。(level默认是从0开始0层级)
   *
   * 遗留问题还在使用的是key来做判断使用key就得额外通过cloneElement来辅助使用，
   */
  renderTreeNode = (child: React.FunctionComponentElement<{ key: any; eventKey: any; expanded: boolean; selected: boolean; loaded: boolean; loading: boolean; checked: boolean; halfChecked: boolean; pos: string; dragOver: boolean; dragOverGapTop: boolean; dragOverGapBottom: boolean; }>, index: number, level = 0) => {
    const {
      keyEntities,
      expandedKeys = [] as Key[],
      selectedKeys = [] as Key[],
      halfCheckedKeys = [] as Key[],
      loadedKeys = [] as Key[],
      loadingKeys = [] as Key[],
      dragOverNodeKey,
      dropPosition
    } = this.state;
    // pos 为节点标示位置
    const pos = getPosition(level, index);
    const key = child.key || pos;
    // @ts-ignore
    if (!keyEntities[key]) {
      warnOnlyTreeNode();
      return null;
    }
    // 遍历每个用户原始节点 加 第一次 内部计算所需属性
    return React.cloneElement(child, {
      key,
      eventKey: key,
      expanded: expandedKeys.indexOf(key) !== -1,
      selected: selectedKeys.indexOf(key) !== -1,
      loaded: loadedKeys.indexOf(key) !== -1,
      loading: loadingKeys.indexOf(key) !== -1,
      checked: this.isKeyChecked(key),
      halfChecked: halfCheckedKeys.indexOf(key) !== -1,
      pos,

      // [legacy] Drag Props
      dragOver: dragOverNodeKey === key && dropPosition === 0,
      dragOverGapTop: dragOverNodeKey === key && dropPosition === -1,
      dragOverGapBottom: dragOverNodeKey === key && dropPosition === 1
    })
  }

  // ======= 其他执行函数 ============
  // 注册tree节点方法
  registerTreeNode = (key: Key, node:any) => {
    if (node) {
      this.domTreeNodes[key] = node;
    }
    else {
      delete this.domTreeNodes[key];
    }
  }

  render() {
    const { treeNode} = this.state;
    const {
      prefixCls,
      className,
      focusable,
      style,
      showLine,
      tabIndex = 0,
      selectable,
      showIcon,
      icon,
      switcherIcon,
      draggable,
      checkable,
      checkStrictly,
      disabled,
      motion,
      loadData,
      filterTreeNode
    } = this.props;
    // 过滤出DOM的辅助性属性 {}
    const domProps: React.HTMLAttributes<HTMLUListElement> = getDataAndAria(this.props);

    if (focusable) {
      domProps.tabIndex = tabIndex;
    }

    return (
      <TreeContext.Provider
        value={{
          // TreeNode中A模版所需值
          prefixCls,
          showIcon: showIcon!,
          icon,
          selectable: selectable!, // TreeNode节点的可选状态
          draggable: draggable!,
          loadData,

          switcherIcon,
          checkable,
          checkStrictly: checkStrictly!,
          disabled: disabled!,
          // TreeNode中B模版所需值renderTreeNode+motion+prefixCls
          motion,

          filterTreeNode,
          // @ts-ignore
          renderTreeNode: this.renderTreeNode,
          isKeyChecked: this.isKeyChecked,

          onNodeClick: this.onNodeClick,
          onNodeDoubleClick: this.onNodeDoubleClick,
          onNodeExpand: this.onNodeExpand,
          onNodeSelect: this.onNodeSelect,
          onNodeCheck: this.onNodeCheck,
          onNodeLoad: this.onNodeLoad,
          onNodeMouseEnter: this.onNodeMouseEnter,
          onNodeMouseLeave: this.onNodeMouseLeave,
          onNodeContextMenu: this.onNodeContextMenu,
          // onNodeDragStart: this.onNodeDragStart,
          // onNodeDragEnter: this.onNodeDragEnter,
          // onNodeDragOver: this.onNodeDragOver,
          // onNodeDragLeave: this.onNodeDragLeave,
          // onNodeDragEnd: this.onNodeDragEnd,
          // onNodeDrop: this.onNodeDrop,

          registerTreeNode: this.registerTreeNode,//每激活个子节点就给它存入本容器tree里的集合domTreeNodes中
        }}
      >
        <ul
          {...domProps}
          className={classNames(prefixCls, className, {
            [`${prefixCls}-show-line`]: showLine
          })}
          style={style}
          role="tree"
          unselectable="on"// 当前ul内容不能选中属性
        >
          {// @ts-ignore
          mapChildren(treeNode, (node, index) => this.renderTreeNode(node, index))}
        </ul>
      </TreeContext.Provider>
    )
  }
}

polyfill(Tree)

export default Tree;