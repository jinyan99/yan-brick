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
import React, { Children } from 'react';
import warning from 'warning';
import toArray from 'rc-util/lib/Children/toArray';
import TreeNode from './treeNode';
var onlyTreeNodeWarned = false;
/**
 * Returns only the data- and aria- key/value pairs
 */
export function getDataAndAria(props /*Partial<TreeProps | TreeNodeProps>*/) {
    return Object.keys(props).reduce(function (prev, key) {
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
export function mapChildren(children, func) {
    var list = toArray(children).map(func);
    if (list.length === 1) {
        return list[0];
    }
    return list;
}
// =========== 小工具方法 START =============
export function warnOnlyTreeNode() {
    if (onlyTreeNodeWarned)
        return;
    onlyTreeNodeWarned = true;
    warning(false, 'Tree only accept TreeNode as children');
}
export function getNodeChildren(children) {
    return toArray(children).filter(isTreeNode);
}
export function isTreeNode(node) {
    return node && node.type && node.type.isTreeNode;
}
export function getPosition(level, index) {
    return level + "-" + index;
}
export function isCheckDisabled(node) {
    var _a = (node.props || {}), disabled = _a.disabled, disableCheckbox = _a.disableCheckbox, checkable = _a.checkable;
    return !!(disabled || disableCheckbox) || checkable === false;
}
/**
 * Since React internal will convert key to string,
 * we need do this to avoid `checkStrictly` use number match
 */
function keyListToString(keyList) {
    if (!keyList)
        return keyList;
    return keyList.map(function (key) { return String(key); });
}
// ========== 小工具方法 END ==============
/**
 * 处理用户原生NodeData，转化成待渲染的[<TreeNode/>,...] :ReactNode类型 元素---成children通用结构
 * @param treeData
 * @param processor
 */
// 输入props返回props只不过变了下类型约束
var internalProcessProps = function (props) { return props; };
export function convertDataToTree(treeData, processor) {
    if (!treeData)
        return [];
    var _a = (processor || {}).processProps, processProps = _a === void 0 ? internalProcessProps : _a;
    var list = Array.isArray(treeData) ? treeData : [treeData];
    return list.map(function (_a) {
        var children = _a.children, props = __rest(_a, ["children"]);
        var childrenNodes = convertDataToTree(children, processor);
        return React.createElement(TreeNode, __assign({}, processProps(props)), childrenNodes);
    });
}
export function convertTreeToEntities(treeNodes, _a) {
    var _b = _a === void 0 ? {} : _a, initWrapper = _b.initWrapper, processEntity = _b.processEntity, onProcessFinished = _b.onProcessFinished;
    var posEntities = {}; // 关于位置的实体对象数据
    var keyEntities = {}; // 关于key映射的实体对象数据
    var wrapper = {
        posEntities: posEntities,
        keyEntities: keyEntities
    };
    if (initWrapper) {
        wrapper = initWrapper(wrapper) || wrapper;
    }
    traverseTreeNodes(treeNodes, function (item) {
        var node = item.node, index = item.index, pos = item.pos, key = item.key, parentPos = item.parentPos;
        var entity = { node: node, index: index, key: key, pos: pos };
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
    return wrapper;
}
export function traverseTreeNodes(treeNodes, callback) {
    function processNode(node, index, parent) {
        var children = node ? node.props.children : treeNodes;
        var pos = node ? getPosition(parent.pos, index) : 0;
        // Filter children which isTreeNode
        var childList = getNodeChildren(children);
        // Process node if is not root
        if (node) {
            var data = {
                node: node,
                index: index,
                pos: pos,
                key: node.key || pos,
                parentPos: parent.node ? parent.pos : null,
            };
            callback(data);
        }
        // Process children node
        Children.forEach(childList, function (subNode, subIndex) {
            processNode(subNode, subIndex, { node: node, pos: pos });
        });
    }
    processNode(null);
}
/**
 * 若用户使用 `autoExpandParent` we should get the list of parent node
 * @param keyList
 * @param keyEntities
 */
export function conductExpandParent(keyList, keyEntities) {
    var expandedKeys = {};
    function conductUp(key) {
        if (expandedKeys[key])
            return;
        var entity = keyEntities[key];
        if (!entity)
            return;
        expandedKeys[key] = true;
        var parent = entity.parent, node = entity.node;
        if (isCheckDisabled(node))
            return;
        if (parent) {
            conductUp(parent.key);
        }
    }
    (keyList || []).forEach(function (key) {
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
export function calcSelectedKeys(selectedKeys, props) {
    if (!selectedKeys)
        return undefined;
    var multiple = props.multiple;
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
export function parseCheckedKeys(keys) {
    if (!keys) {
        return null;
    }
    // Convert keys to object format
    var keyProps;
    if (Array.isArray(keys)) {
        // [Legacy] Follow the api doc
        keyProps = {
            checkedKeys: keys,
            halfCheckedKeys: undefined,
        };
    }
    else if (typeof keys === 'object') {
        keyProps = {
            checkedKeys: keys.checked || undefined,
            halfCheckedKeys: keys.halfChecked || undefined,
        };
    }
    else {
        warning(false, '`checkedKeys` is not an array or an object');
        return null;
    }
    keyProps.checkedKeys = keyListToString(keyProps.checkedKeys);
    keyProps.halfCheckedKeys = keyListToString(keyProps.halfCheckedKeys);
    return keyProps;
}
/**
 * 执行状态检查(通过keyList)
 * Conduct check state by the keyList. It will conduct up & from the provided key.
 * If the conduct path reach the disabled or already checked / unchecked node will stop conduct.
 */
export function conductCheck(
/** list of keys */
keyList, 
/** is check the node or not */
isCheck, 
/** parsed by `convertTreeToEntities` function in Tree */
keyEntities, 
/** Can pass current checked status for process (usually for uncheck operation) */
checkStatus) {
    if (checkStatus === void 0) { checkStatus = {}; }
    var checkedKeys = {};
    var halfCheckedKeys = {}; // Record the key has some child checked (include child half checked)
    (checkStatus.checkedKeys || []).forEach(function (key) {
        checkedKeys[key] = true;
    });
    (checkStatus.halfCheckedKeys || []).forEach(function (key) {
        halfCheckedKeys[key] = true;
    });
    // Conduct up
    function conductUp(key) {
        if (checkedKeys[key] === isCheck)
            return;
        var entity = keyEntities[key];
        if (!entity)
            return;
        var children = entity.children, parent = entity.parent, node = entity.node;
        if (isCheckDisabled(node))
            return;
        // Check child node checked status
        var everyChildChecked = true;
        var someChildChecked = false; // Child checked or half checked
        (children || [])
            .filter(function (child) { return !isCheckDisabled(child.node); })
            .forEach(function (_a) {
            var childKey = _a.key;
            var childChecked = checkedKeys[childKey];
            var childHalfChecked = halfCheckedKeys[childKey];
            if (childChecked || childHalfChecked)
                someChildChecked = true;
            if (!childChecked)
                everyChildChecked = false;
        });
        // Update checked status
        if (isCheck) {
            checkedKeys[key] = everyChildChecked;
        }
        else {
            checkedKeys[key] = false;
        }
        halfCheckedKeys[key] = someChildChecked;
        if (parent) {
            conductUp(parent.key);
        }
    }
    // Conduct down
    function conductDown(key) {
        if (checkedKeys[key] === isCheck)
            return;
        var entity = keyEntities[key];
        if (!entity)
            return;
        var children = entity.children, node = entity.node;
        if (isCheckDisabled(node))
            return;
        checkedKeys[key] = isCheck;
        (children || []).forEach(function (child) {
            conductDown(child.key);
        });
    }
    function conduct(key) {
        var entity = keyEntities[key];
        if (!entity) {
            warning(false, "'" + key + "' does not exist in the tree.");
            return;
        }
        var children = entity.children, parent = entity.parent, node = entity.node;
        checkedKeys[key] = isCheck;
        if (isCheckDisabled(node))
            return;
        // Conduct down
        (children || [])
            .filter(function (child) { return !isCheckDisabled(child.node); })
            .forEach(function (child) {
            conductDown(child.key);
        });
        // Conduct up
        if (parent) {
            conductUp(parent.key);
        }
    }
    (keyList || []).forEach(function (key) {
        conduct(key);
    });
    var checkedKeyList = [];
    var halfCheckedKeyList = [];
    // Fill checked list
    Object.keys(checkedKeys).forEach(function (key) {
        if (checkedKeys[key]) {
            checkedKeyList.push(key);
        }
    });
    // Fill half checked list
    Object.keys(halfCheckedKeys).forEach(function (key) {
        if (!checkedKeys[key] && halfCheckedKeys[key]) {
            halfCheckedKeyList.push(key);
        }
    });
    return {
        checkedKeys: checkedKeyList,
        halfCheckedKeys: halfCheckedKeyList,
    };
}
