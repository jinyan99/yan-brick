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
import * as React from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import { polyfill } from 'react-lifecycles-compat';
import { TreeContext } from './contextTypes';
import { convertTreeToEntities, convertDataToTree, getDataAndAria, getPosition, 
// getDragNodesKeys,
parseCheckedKeys, conductExpandParent, calcSelectedKeys, 
// calcDropPosition,
// arrAdd,
// arrDel,
// posToArr,
mapChildren, conductCheck, warnOnlyTreeNode, } from './util';
var Tree = /** @class */ (function (_super) {
    __extends(Tree, _super);
    function Tree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
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
        };
        /** 内部用法用在rc-tree-select的 */
        _this.domTreeNodes = {};
        // ======== 状态判断 ============
        _this.isKeyChecked = function (key) {
            var _a = _this.state.checkedKeys, checkedKeys = _a === void 0 ? [] : _a;
            return checkedKeys.indexOf(key) !== -1;
        };
        // ========== 回调相关 ============
        _this.onNodeClick = function (e, treeNode) {
            console.log('节点点击', treeNode);
            var onClick = _this.props.onClick;
            if (onClick)
                onClick(e, treeNode);
        };
        _this.onNodeDoubleClick = function (e, treeNode) {
            console.log('节点双击', treeNode);
            var onDoubleClick = _this.props.onDoubleClick;
            if (onDoubleClick)
                onDoubleClick(e, treeNode);
        };
        _this.onNodeExpand = function (e, treeNode) {
            console.log('要展开节点了', treeNode);
        };
        _this.onNodeSelect = function (e, treeNode) {
            console.log('节点选中', treeNode);
        };
        _this.onNodeCheck = function (e, treeNode, checked) {
            console.log('节点多选框选中', treeNode, checked);
        };
        _this.onNodeLoad = function (treeNode) {
            console.log('节点加载---返promise实例', treeNode);
        };
        _this.onNodeMouseEnter = function (event, node) {
            console.log('节点滑入', node);
        };
        _this.onNodeMouseLeave = function (event, node) {
            console.log('节点离开', node);
        };
        _this.onNodeContextMenu = function (event, node) {
            console.log('节点唤起右键菜单', node);
        };
        // ======= 渲染模版相关 ============
        /**
         * 该模版主要将用户原始节点增添第一次内部计算所需属性
         *
         * [Legacy] 这里改进使用了level+index的新追踪线索，给每个children
         * 中每个节点加上level-index做位置的唯一标示。(level默认是从0开始0层级)
         *
         * 遗留问题还在使用的是key来做判断使用key就得额外通过cloneElement来辅助使用，
         */
        _this.renderTreeNode = function (child, index, level) {
            if (level === void 0) { level = 0; }
            var _a = _this.state, keyEntities = _a.keyEntities, _b = _a.expandedKeys, expandedKeys = _b === void 0 ? [] : _b, _c = _a.selectedKeys, selectedKeys = _c === void 0 ? [] : _c, _d = _a.halfCheckedKeys, halfCheckedKeys = _d === void 0 ? [] : _d, _e = _a.loadedKeys, loadedKeys = _e === void 0 ? [] : _e, _f = _a.loadingKeys, loadingKeys = _f === void 0 ? [] : _f, dragOverNodeKey = _a.dragOverNodeKey, dropPosition = _a.dropPosition;
            // pos 为节点标示位置
            var pos = getPosition(level, index);
            var key = child.key || pos;
            // @ts-ignore
            if (!keyEntities[key]) {
                warnOnlyTreeNode();
                return null;
            }
            // 遍历每个用户原始节点 加 第一次 内部计算所需属性
            return React.cloneElement(child, {
                key: key,
                eventKey: key,
                expanded: expandedKeys.indexOf(key) !== -1,
                selected: selectedKeys.indexOf(key) !== -1,
                loaded: loadedKeys.indexOf(key) !== -1,
                loading: loadingKeys.indexOf(key) !== -1,
                checked: _this.isKeyChecked(key),
                halfChecked: halfCheckedKeys.indexOf(key) !== -1,
                pos: pos,
                // [legacy] Drag Props
                dragOver: dragOverNodeKey === key && dropPosition === 0,
                dragOverGapTop: dragOverNodeKey === key && dropPosition === -1,
                dragOverGapBottom: dragOverNodeKey === key && dropPosition === 1
            });
        };
        // ======= 其他执行函数 ============
        // 注册tree节点方法
        _this.registerTreeNode = function (key, node) {
            if (node) {
                _this.domTreeNodes[key] = node;
            }
            else {
                delete _this.domTreeNodes[key];
            }
        };
        return _this;
    }
    // ======== 生命周期 ============
    Tree.getDerivedStateFromProps = function (props, prevState) {
        console.log('要挂载tree层了');
        var prevProps = prevState.prevProps;
        var newState = {
            prevProps: props
        };
        // 比对props中值决定是否rerender
        function needSync(name) {
            return (!prevState && name in props) || (prevProps && prevProps[name] !== props[name]);
        }
        // ===== Tree Node =====
        var treeNode = null;
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
            var entitiesMap = convertTreeToEntities(treeNode);
            newState.keyEntities = entitiesMap.keyEntities;
        }
        var keyEntities = newState.keyEntities || prevState.keyEntities;
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
            }
            else if (!prevProps && props.defaultSelectedKeys) {
                newState.selectedKeys = calcSelectedKeys(props.defaultSelectedKeys, props);
            }
        }
        // ===== checkedKeys ======
        if (props.checkable) {
            var checkedKeyEntity = void 0;
            if (needSync('checkedKeys')) {
                checkedKeyEntity = parseCheckedKeys(props.checkedKeys) || {};
            }
            else if (!prevProps && props.defaultCheckedKeys) {
                checkedKeyEntity = parseCheckedKeys(props.defaultCheckedKeys) || {};
            }
            else if (treeNode) {
                // If treeNode changed, we also need check it
                checkedKeyEntity = parseCheckedKeys(props.checkedKeys) || {
                    checkedKeys: prevState.checkedKeys,
                    halfCheckedKeys: prevState.halfCheckedKeys,
                };
            }
            if (checkedKeyEntity) {
                var _a = checkedKeyEntity.checkedKeys, checkedKeys = _a === void 0 ? [] : _a, _b = checkedKeyEntity.halfCheckedKeys, halfCheckedKeys = _b === void 0 ? [] : _b;
                if (!props.checkStrictly) {
                    var conductKeys = conductCheck(checkedKeys, true, keyEntities);
                    (checkedKeys = conductKeys.checkedKeys, halfCheckedKeys = conductKeys.halfCheckedKeys);
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
    };
    Tree.prototype.render = function () {
        var _a;
        var _this = this;
        var treeNode = this.state.treeNode;
        var _b = this.props, prefixCls = _b.prefixCls, className = _b.className, focusable = _b.focusable, style = _b.style, showLine = _b.showLine, _c = _b.tabIndex, tabIndex = _c === void 0 ? 0 : _c, selectable = _b.selectable, showIcon = _b.showIcon, icon = _b.icon, switcherIcon = _b.switcherIcon, draggable = _b.draggable, checkable = _b.checkable, checkStrictly = _b.checkStrictly, disabled = _b.disabled, motion = _b.motion, loadData = _b.loadData, filterTreeNode = _b.filterTreeNode;
        // 过滤出DOM的辅助性属性 {}
        var domProps = getDataAndAria(this.props);
        if (focusable) {
            domProps.tabIndex = tabIndex;
        }
        return (React.createElement(TreeContext.Provider, { value: {
                // TreeNode中A模版所需值
                prefixCls: prefixCls,
                showIcon: showIcon,
                icon: icon,
                selectable: selectable,
                draggable: draggable,
                loadData: loadData,
                switcherIcon: switcherIcon,
                checkable: checkable,
                checkStrictly: checkStrictly,
                disabled: disabled,
                // TreeNode中B模版所需值renderTreeNode+motion+prefixCls
                motion: motion,
                filterTreeNode: filterTreeNode,
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
                registerTreeNode: this.registerTreeNode,
            } },
            React.createElement("ul", __assign({}, domProps, { className: classNames(prefixCls, className, (_a = {},
                    _a[prefixCls + "-show-line"] = showLine,
                    _a)), style: style, role: "tree", unselectable: "on" // 当前ul内容不能选中属性
             }), // @ts-ignore
            mapChildren(treeNode, function (node, index) { return _this.renderTreeNode(node, index); }))));
    };
    // ======= 定义基础属性 ===========
    Tree.propTypes = {};
    Tree.defaultProps = {
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
    };
    return Tree;
}(React.Component));
polyfill(Tree);
export default Tree;
