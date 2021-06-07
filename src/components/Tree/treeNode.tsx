import * as React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
// @ts-ignore
import CSSMotion from 'rc-animate/lib/CSSMotion';
import toArray from 'rc-util/lib/Children/toArray';
import {polyfill} from 'react-lifecycles-compat';
import {TreeContext, TreeContextProps} from './contextTypes';
import {getNodeChildren, getDataAndAria, mapChildren, warnOnlyTreeNode} from './util';
import {IconType} from './interface';

const ICON_OPEN = 'open';
const ICON_CLOSE = 'close';

const defaultTitle = '---';

export interface TreeNodeProps {
  eventKey?: string;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  onSelect?: React.MouseEventHandler<HTMLSpanElement>;

  //  ==== By parent 自己父元素传的 =====
  expanded?: boolean;// 加在CSSMotion上的控制隐藏即可达到是否展开子树节点
  selected?: boolean;
  checked?: boolean;// (父传)当前选中状态
  loaded?: boolean;
  loading?: boolean;
  halfChecked?: boolean;
  children?: React.ReactNode;
  title?: React.ReactNode;
  pos?: string;// 每个节点的标示位置，如0-1-1-1第0层下第1个节点下第一个孩子
  dragOver?: boolean;
  dragOverGapTop?: boolean;
  dragOverGapBottom?: boolean;

  // ====== By user 用户层传的 =======
  isLeaf?: boolean;
  // 是否开启多选
  checkable?: boolean;
  // 当前节点是否可点
  selectable?: boolean;
  disabled?: boolean;
  // 是否禁用多选框
  disableCheckbox?: boolean;
  icon?: IconType;
  switcherIcon?: IconType
}

export interface InternalTreeNodeProps extends TreeNodeProps {
  context: TreeContextProps
}

class TreeNode extends React.Component<InternalTreeNodeProps> {
  static propTypes = {}

  public state = {
    dragNodeHighlight: false
  };

  public selectHandle: HTMLSpanElement | undefined;

  componentDidMount() {
    const {
      eventKey,
      context: {registerTreeNode}
    } = this.props;

    this.syncLoadData(this.props);
    // 每打开一个节点就把该节点存入容器tree里的集合domTreeNodes中
    registerTreeNode(eventKey, this);
  }

  componentDidUpdate() {
    this.syncLoadData(this.props);
  }

  componentWillUnmount() {
    const {
      eventKey,
      context: {registerTreeNode}
    } = this.props;

    registerTreeNode(eventKey, null);
  }

  // ======== 节点上回调总的 START =========
  // 判断状态相关
  isDisabled = () => {
    const {disabled} = this.props;// 用户user传的
    const {// 上下文的控制属性
      context: {disabled: treeDisabled}
    } = this.props;

    // Follow the logic of Selectable
    if (disabled === false) {
      return false;
    }

    return !!(treeDisabled || disabled);
  }
  isSelectable() {
    const {selectable} = this.props;
    const {
      context: {selectable: treeSelectable}
    } = this.props;

    // 当用户级传入该属性则直接返回该属性可选择状态，若没传则沿用父级上下文传的该默认值
    // Ignore when selectable is undefined or null
    if (typeof selectable === 'boolean') {
      return selectable;
    }

    return treeSelectable;
  }
  isCheckable = () => {
    const {checkable} = this.props;
    const {
      context: {checkable: treeCheckable}
    } = this.props;

    // Return false if tree or treeNode is not checkable
    if (!treeCheckable || checkable === false) return false;
    return treeCheckable;
  }
  isLeaf = () => {
    const {isLeaf, loaded} = this.props;
    const {
      context: {loadData}
    } = this.props;

    const hasChildren = this.getNodeChildren().length !== 0;

    if (isLeaf === false) {
      return false;
    }

    return isLeaf || (!loadData && !hasChildren) || (loadData && loaded && !hasChildren)
  }

  // A模版相关回调
  onSelectorClick = (e) => {
    // Click trigger before select/check operation
    const {
      context: {onNodeClick}// 上下文拿到点击回调
    } = this.props;
    onNodeClick(e, this);

    // 仅可点击下拉模式
    if (this.isSelectable()) {
      this.onSelect(e);
    }
    else {// 含多选框模式
      this.onCheck(e);
    }
  };
  onSelect = (e) => {
    if (this.isDisabled()) return;

    const {// 实际执行回调都是由父级容器组件负责收发，该节点组件就制作展示组件用，更关注点分离
      context: {onNodeSelect}
    } = this.props;
    e.preventDefault();
    onNodeSelect(e, this);
  };
  onCheck = e => {
    if (this.isDisabled()) return;

    const {disableCheckbox, checked} = this.props;
    const {
      context: {onNodeCheck}
    } = this.props;

    if (!this.isCheckable() || disableCheckbox) return;

    e.preventDefault();
    // 选中后把当前选中状态取反，传给属于Tree的事件回调
    const targetChecked = !checked;
    onNodeCheck(e, this,targetChecked);
  };

  onSelectorDoubleClick = (e) => {
    const {
      context: {onNodeDoubleClick}
    } = this.props;
    onNodeDoubleClick(e, this);
  }

  onContextMenu = e => {// Menu上下文
    const {
      context: {onNodeContextMenu}
    } = this.props;
    onNodeContextMenu(e, this);
  }
  // ======== 节点上回调总的 END ===========

  // ======== 其他内用执行方法 ================
  // Load data to avoid default expanded tree without data
  syncLoadData = props => {
    const {expanded, loading, loaded} = props;
    const {
      context: {loadData, onNodeLoad}
    } = this.props;

    if (loading) return;

    // read from state to avoid loadData at same time
    if (loadData && expanded && !this.isLeaf()) {
      // We needn‘t reload data when has children in sync logic
      // It’s only needed in node expanded
      const hasChildren = this.getNodeChildren().length !== 0;
      if (!hasChildren && !loaded) {
        onNodeLoad(this);
      }
    }
  }

  // ======== jsx中渲染模板 ===============

  // A: 渲染Icon+Title(控制下拉的)的A模版
  renderSelector = () => {
    //const {dragNodeHighlight} = this.state;
    const {title, selected, icon, loading} = this.props;
    const {
      context: {prefixCls, showIcon, icon: treeIcon, draggable, loadData}
    } = this.props;
    const disabled = this.isDisabled();

    const wrapClass = `${prefixCls}-node-content-wrapper`;

    // Icon 部分
    let $icon;

    if (showIcon) {
      const currentIcon = icon || treeIcon;

      $icon = currentIcon ? (
        <span className={classNames(`${prefixCls}-iconEle`, `${prefixCls}-icon__customize`)}>
          {typeof currentIcon === 'function' ? currentIcon(this.props) : currentIcon}
        </span>
      ) : (
        this.renderIcon()
      )
    }
    else if (loadData && loading) {
      $icon = this.renderIcon();
    }

    // Title 部分
    const $title = <span className={`${prefixCls}-title`}>{title}</span>;

    return (
      <span
        //ref={this.setSelectHandle}
        title={typeof title === 'string' ? title : ''}
        className={classNames(
          `${wrapClass}`,
          `${wrapClass}-${this.getNodeState() || 'normal'}`,
          //!disabled && (selected || dragNodeHighlight) && `${prefixCls}-node-selected`,
          !disabled && draggable && 'draggable'
        )}
        //draggable={(!disabled && draggable) || undefined}
        aria-grabbed={(!disabled && draggable) || undefined}
        //onMouseEnter={this.onMouseEnter}
        //onMouseLeave={this.onMouseLeave}
        onContextMenu={this.onContextMenu}
        onClick={this.onSelectorClick}
        onDoubleClick={this.onSelectorDoubleClick}
        //onDragStart={draggable ? this.onDragStart : undefined}
      >
        {$icon}
        {$title}
      </span>
    )
  }
  // 若用户不传icon，默认自己内部渲染Icon方法
  renderIcon = () => {
    const {loading} = this.props;
    const {
      context: {prefixCls}
    } = this.props;

    return (
      <span
        className={classNames(
          `${prefixCls}-iconEle`,
          // 函数获取当前节点状态，expanded为开状态就加图标开时的类名 否则关时类名
          `${prefixCls}-icon__${this.getNodeState() || 'docu'}`,
          loading && `${prefixCls}-icon_loading`
        )}
      />
    )
  }
  // 获取当前节点是否展开状态
  getNodeState = () => {
    const {expanded} = this.props;

    // if (this.isLeaf()) {
    //   return null;
    // }

    return expanded ? ICON_OPEN : ICON_CLOSE;
  }

  // B: 渲染A板下拉显示 子树的B模版 Children list renderTemplate with `Animation`
  renderChildren = () => {
    const {expanded, pos} = this.props;
    const {
      // 取出渲染tree子树节点的上下文相关值
      context: {
        prefixCls, // 子树节点前缀
        motion, // 子树节点动画参数
        renderTreeNode// 自定义渲染子树节点方法
      }
    } = this.props;

    // 默认渲染子树节点方法 过滤children得到nodeList
    const nodeList = this.getNodeChildren();

    if (nodeList.length === 0) {
      return null;
    }
    return (
      <CSSMotion visible={expanded} {...motion}>
        {({style, className}) => (
          <ul
            className={classNames(
              className,
              `${prefixCls}-child-tree`,
              expanded && `${prefixCls}-child-tree-open`
            )}
            style={style}
            data-expanded={expanded} // 标签辅助信息当前子树是否展开，可随标签获得被读取
            role="group"
          >
            {mapChildren(nodeList, (node: any, index: any) => renderTreeNode(node, index, pos))}
          </ul>
        )}
      </CSSMotion>
    )
  }
  getNodeChildren = () => {
    const {children} = this.props;
    // 过滤存在的节点
    const originList = toArray(children).filter(node => node);
    // 只是同名方法，不冲突，直接调用import引进的方法(也是过滤isTreeNode节点的)
    const targetList = getNodeChildren(originList);

    if (originList.length !== targetList.length) {
      warnOnlyTreeNode();
    }

    return targetList;
  }

  render() {
    const {loading} = this.props;
    const {
      className,
      style,
      dragOver,
      dragOverGapTop,
      dragOverGapBottom,
      // 是否树叶
      isLeaf,
      expanded,
      selected,
      checked,
      halfChecked,
      ...otherProps
    } = this.props;
    const {
      context: {
        prefixCls,
        // @TODO 支持的过滤节点的高级功能方法 目前先不做
        filterTreeNode,
        // 是否支持拖拽(Tree用户传入的，用context跨层级传入TreeNode)
        draggable}
    } = this.props;
    const disabled = this.isDisabled();
    // 返回剩下所有属性中过滤出dataaria前缀的属性对象
    const dataOrAriaAttributeProps = getDataAndAria(otherProps);

    return (
      <li
        className={classNames(className, {
          [`${prefixCls}-treenode-disabled`]: disabled,
          [`${prefixCls}-treenode-switcher-${expanded ? 'open' : 'close'}`]: !isLeaf,
          [`${prefixCls}-treenode-checkbox-checked`]: checked,
          [`${prefixCls}-treenode-checkbox-indeterminate`]: halfChecked,
          [`${prefixCls}-treenode-selected`]: selected,
          [`${prefixCls}-treenode-loading`]: loading,

          'drag-over': !disabled && dragOver,
          'drag-over-gap-top': !disabled && dragOverGapTop,
          'drag-over-gap-bottom': !disabled && dragOverGapBottom,
          'filter-node': filterTreeNode && filterTreeNode(this)
        })}
        style={style}
        role="treeitem"
        // onDragEnter={draggable && this.onDragEnter}
        // onDragOver={draggable ? this.onDragOver : undefined}
        // onDragLeave={draggable ? this.onDragLeave: undefined}
        // onDrop={draggable ? this.onDrop : undefined}
        // onDragEnd={draggable ? this.onDragEnd : undefined}
        {...dataOrAriaAttributeProps}
      >
        {this.renderSelector()/*A*/}
        {this.renderChildren()/*B*/}
        {/*@TODO 其他渲染模版*/}
      </li>
    )
  }
}

polyfill(TreeNode);

const ContextTreeNode: React.FC<TreeNodeProps> = props => (
  <TreeContext.Consumer>
    {(context:any) => <TreeNode {...props} context={context}/>}
  </TreeContext.Consumer>
);

ContextTreeNode.defaultProps = {
  title: defaultTitle
};

(ContextTreeNode as any).isTreeNode = 1;

export {TreeNode as InternalTreeNode};

export default ContextTreeNode;