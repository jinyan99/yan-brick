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
import React, { useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';
export var List = function (props) {
    var _a, _b;
    var className = props.className, mode = props.mode, style = props.style, children = props.children, listyle = props.listyle, liClassName = props.liClassName, withHoverActive = props.withHoverActive, onSelect = props.onSelect, renderTemplate = props.renderTemplate, refCallback = props.refCallback, restProps = __rest(props, ["className", "mode", "style", "children", "listyle", "liClassName", "withHoverActive", "onSelect", "renderTemplate", "refCallback"]);
    var classes = classNames('yanbrick-list', className, (_a = {},
        _a["list-" + mode] = mode,
        _a));
    var liclasses = classNames('yanbrick-list-item', liClassName, (_b = {},
        _b["list-withHoverActive"] = withHoverActive,
        _b));
    var ulref = useRef(null);
    useEffect(function () {
        if (refCallback && ulref.current) {
            refCallback(ulref.current);
        }
    }, [refCallback]);
    var handleClick = function (e) {
        if (onSelect)
            onSelect(e);
    };
    var renderLiTemplate = useCallback(function () {
        return React.Children.map(children, function (child, index) { return (React.createElement("li", { key: index, style: style, className: liclasses }, renderTemplate ? renderTemplate(child, index) : child)); });
    }, [renderTemplate, children, style, liclasses]);
    return (React.createElement("ul", __assign({ className: classes, style: style, onClick: function (e) { return handleClick(e); }, ref: ulref }, restProps), renderLiTemplate()));
};
List.defaultProps = {
    mode: 'vertical',
    withHoverActive: false
};
export default List;
