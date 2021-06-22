var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
// @ts-ignore
import CSSMotion from 'rc-animate/lib/CSSMotion';
import toArray from 'rc-util/lib/Children/toArray';
import { polyfill } from 'react-lifecycles-compat';
import { TreeContext } from './contextTypes';
import { getNodeChildren, getDataAndAria, mapChildren, warnOnlyTreeNode } from './util';
var ICON_OPEN = 'open';
var ICON_CLOSE = 'close';
var defaultTitle = '---';
var TreeNode = /** @class */ (function (_super) {
    __extends(TreeNode, _super);
    function TreeNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dragNodeHighlight: false
        };
        // ======== 节点上回调总的 START =========
        // 判断状态相关
        _this.isDisabled = function () {
            var disabled = _this.props.disabled; // 用户user传的
            var treeDisabled = _this.props.context.disabled;
            // Follow the logic of Selectable
            if (disabled === false) {
                return false;
            }
            return !!(treeDisabled || disabled);
        };
        _this.isCheckable = function () {
            var checkable = _this.props.checkable;
            var treeCheckable = _this.props.context.checkable;
            // Return false if tree or treeNode is not checkable
            if (!treeCheckable || checkable === false)
                return false;
            return treeCheckable;
        };
        _this.isLeaf = function () {
            var _a = _this.props, isLeaf = _a.isLeaf, loaded = _a.loaded;
            var loadData = _this.props.context.loadData;
            var hasChildren = _this.getNodeChildren().length !== 0;
            if (isLeaf === false) {
                return false;
            }
            return isLeaf || (!loadData && !hasChildren) || (loadData && loaded && !hasChildren);
        };
        // A模版相关回调
        _this.onSelectorClick = function (e) {
            // Click trigger before select/check operation
            var onNodeClick = _this.props.context.onNodeClick;
            onNodeClick(e, _this);
            // 仅可点击下拉模式
            if (_this.isSelectable()) {
                _this.onSelect(e);
            }
            else { // 含多选框模式
                _this.onCheck(e);
            }
        };
        _this.onSelect = function (e) {
            if (_this.isDisabled())
                return;
            var onNodeSelect = _this.props.context.onNodeSelect;
            e.preventDefault();
            onNodeSelect(e, _this);
        };
        _this.onCheck = function (e) {
            if (_this.isDisabled())
                return;
            var _a = _this.props, disableCheckbox = _a.disableCheckbox, checked = _a.checked;
            var onNodeCheck = _this.props.context.onNodeCheck;
            if (!_this.isCheckable() || disableCheckbox)
                return;
            e.preventDefault();
            // 选中后把当前选中状态取反，传给属于Tree的事件回调
            var targetChecked = !checked;
            onNodeCheck(e, _this, targetChecked);
        };
        _this.onSelectorDoubleClick = function (e) {
            var onNodeDoubleClick = _this.props.context.onNodeDoubleClick;
            onNodeDoubleClick(e, _this);
        };
        _this.onContextMenu = function (e) {
            var onNodeContextMenu = _this.props.context.onNodeContextMenu;
            onNodeContextMenu(e, _this);
        };
        // ======== 节点上回调总的 END ===========
        // ======== 其他内用执行方法 ================
        // Load data to avoid default expanded tree without data
        _this.syncLoadData = function (props) {
            var expanded = props.expanded, loading = props.loading, loaded = props.loaded;
            var _a = _this.props.context, loadData = _a.loadData, onNodeLoad = _a.onNodeLoad;
            if (loading)
                return;
            // read from state to avoid loadData at same time
            if (loadData && expanded && !_this.isLeaf()) {
                // We needn‘t reload data when has children in sync logic
                // It’s only needed in node expanded
                var hasChildren = _this.getNodeChildren().length !== 0;
                if (!hasChildren && !loaded) {
                    onNodeLoad(_this);
                }
            }
        };
        // ======== jsx中渲染模板 ===============
        // A: 渲染Icon+Title(控制下拉的)的A模版
        _this.renderSelector = function () {
            //const {dragNodeHighlight} = this.state;
            var _a = _this.props, title = _a.title, selected = _a.selected, icon = _a.icon, loading = _a.loading;
            var _b = _this.props.context, prefixCls = _b.prefixCls, showIcon = _b.showIcon, treeIcon = _b.icon, draggable = _b.draggable, loadData = _b.loadData;
            var disabled = _this.isDisabled();
            var wrapClass = prefixCls + "-node-content-wrapper";
            // Icon 部分
            var $icon;
            if (showIcon) {
                var currentIcon = icon || treeIcon;
                $icon = currentIcon ? (React.createElement("span", { className: classNames(prefixCls + "-iconEle", prefixCls + "-icon__customize") }, typeof currentIcon === 'function' ? currentIcon(_this.props) : currentIcon)) : (_this.renderIcon());
            }
            else if (loadData && loading) {
                $icon = _this.renderIcon();
            }
            // Title 部分
            var $title = React.createElement("span", { className: prefixCls + "-title" }, title);
            return (React.createElement("span", { 
                //ref={this.setSelectHandle}
                title: typeof title === 'string' ? title : '', className: classNames("" + wrapClass, wrapClass + "-" + (_this.getNodeState() || 'normal'), 
                //!disabled && (selected || dragNodeHighlight) && `${prefixCls}-node-selected`,
                !disabled && draggable && 'draggable'), "aria-grabbed": (!disabled && draggable) || undefined, 
                //onMouseEnter={this.onMouseEnter}
                //onMouseLeave={this.onMouseLeave}
                onContextMenu: _this.onContextMenu, onClick: _this.onSelectorClick, onDoubleClick: _this.onSelectorDoubleClick },
                $icon,
                $title));
        };
        // 若用户不传icon，默认自己内部渲染Icon方法
        _this.renderIcon = function () {
            var loading = _this.props.loading;
            var prefixCls = _this.props.context.prefixCls;
            return (React.createElement("span", { className: classNames(prefixCls + "-iconEle", 
                // 函数获取当前节点状态，expanded为开状态就加图标开时的类名 否则关时类名
                prefixCls + "-icon__" + (_this.getNodeState() || 'docu'), loading && prefixCls + "-icon_loading") }));
        };
        // 获取当前节点是否展开状态
        _this.getNodeState = function () {
            var expanded = _this.props.expanded;
            // if (this.isLeaf()) {
            //   return null;
            // }
            return expanded ? ICON_OPEN : ICON_CLOSE;
        };
        // B: 渲染A板下拉显示 子树的B模版 Children list renderTemplate with `Animation`
        _this.renderChildren = function () {
            var _a = _this.props, expanded = _a.expanded, pos = _a.pos;
            var 
            // 取出渲染tree子树节点的上下文相关值
            _b = _this.props.context, prefixCls = _b.prefixCls, // 子树节点前缀
            motion = _b.motion, // 子树节点动画参数
            renderTreeNode = _b.renderTreeNode // 自定义渲染子树节点方法
            ;
            // 默认渲染子树节点方法 过滤children得到nodeList
            var nodeList = _this.getNodeChildren();
            if (nodeList.length === 0) {
                return null;
            }
            return (React.createElement(CSSMotion, __assign({ visible: expanded }, motion), function (_a) {
                var style = _a.style, className = _a.className;
                return (React.createElement("ul", { className: classNames(className, prefixCls + "-child-tree", expanded && prefixCls + "-child-tree-open"), style: style, "data-expanded": expanded, role: "group" }, mapChildren(nodeList, function (node, index) { return renderTreeNode(node, index, pos); })));
            }));
        };
        _this.getNodeChildren = function () {
            var children = _this.props.children;
            // 过滤存在的节点
            var originList = toArray(children).filter(function (node) { return node; });
            // 只是同名方法，不冲突，直接调用import引进的方法(也是过滤isTreeNode节点的)
            var targetList = getNodeChildren(originList);
            if (originList.length !== targetList.length) {
                warnOnlyTreeNode();
            }
            return targetList;
        };
        return _this;
    }
    TreeNode.prototype.componentDidMount = function () {
        var _a = this.props, eventKey = _a.eventKey, registerTreeNode = _a.context.registerTreeNode;
        this.syncLoadData(this.props);
        // 每打开一个节点就把该节点存入容器tree里的集合domTreeNodes中
        registerTreeNode(eventKey, this);
    };
    TreeNode.prototype.componentDidUpdate = function () {
        this.syncLoadData(this.props);
    };
    TreeNode.prototype.componentWillUnmount = function () {
        var _a = this.props, eventKey = _a.eventKey, registerTreeNode = _a.context.registerTreeNode;
        registerTreeNode(eventKey, null);
    };
    TreeNode.prototype.isSelectable = function () {
        var selectable = this.props.selectable;
        var treeSelectable = this.props.context.selectable;
        // 当用户级传入该属性则直接返回该属性可选择状态，若没传则沿用父级上下文传的该默认值
        // Ignore when selectable is undefined or null
        if (typeof selectable === 'boolean') {
            return selectable;
        }
        return treeSelectable;
    };
    TreeNode.prototype.render = function () {
        var _a;
        var loading = this.props.loading;
        var _b = this.props, className = _b.className, style = _b.style, dragOver = _b.dragOver, dragOverGapTop = _b.dragOverGapTop, dragOverGapBottom = _b.dragOverGapBottom, 
        // 是否树叶
        isLeaf = _b.isLeaf, expanded = _b.expanded, selected = _b.selected, checked = _b.checked, halfChecked = _b.halfChecked, otherProps = __rest(_b, ["className", "style", "dragOver", "dragOverGapTop", "dragOverGapBottom", "isLeaf", "expanded", "selected", "checked", "halfChecked"]);
        var _c = this.props.context, prefixCls = _c.prefixCls, 
        // @TODO 支持的过滤节点的高级功能方法 目前先不做
        filterTreeNode = _c.filterTreeNode, 
        // 是否支持拖拽(Tree用户传入的，用context跨层级传入TreeNode)
        draggable = _c.draggable;
        var disabled = this.isDisabled();
        // 返回剩下所有属性中过滤出dataaria前缀的属性对象
        var dataOrAriaAttributeProps = getDataAndAria(otherProps);
        return (React.createElement("li", __assign({ className: classNames(className, (_a = {},
                _a[prefixCls + "-treenode-disabled"] = disabled,
                _a[prefixCls + "-treenode-switcher-" + (expanded ? 'open' : 'close')] = !isLeaf,
                _a[prefixCls + "-treenode-checkbox-checked"] = checked,
                _a[prefixCls + "-treenode-checkbox-indeterminate"] = halfChecked,
                _a[prefixCls + "-treenode-selected"] = selected,
                _a[prefixCls + "-treenode-loading"] = loading,
                _a['drag-over'] = !disabled && dragOver,
                _a['drag-over-gap-top'] = !disabled && dragOverGapTop,
                _a['drag-over-gap-bottom'] = !disabled && dragOverGapBottom,
                _a['filter-node'] = filterTreeNode && filterTreeNode(this),
                _a)), style: style, role: "treeitem" }, dataOrAriaAttributeProps),
            this.renderSelector() /*A*/,
            this.renderChildren() /*B*/));
    };
    TreeNode.propTypes = {};
    return TreeNode;
}(React.Component));
polyfill(TreeNode);
var ContextTreeNode = function (props) { return (React.createElement(TreeContext.Consumer, null, function (context) { return React.createElement(TreeNode, __assign({}, props, { context: context })); })); };
ContextTreeNode.defaultProps = {
    title: defaultTitle
};
ContextTreeNode.isTreeNode = 1;
export { TreeNode as InternalTreeNode };
export default ContextTreeNode;
