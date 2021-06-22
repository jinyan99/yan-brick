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
import React, { useRef, useEffect } from "react";
import classNames from "classnames";
export var Badge = function (props) {
    var refCallback = props.refCallback, className = props.className, type = props.type, count = props.count, visible = props.visible, dot = props.dot, children = props.children, restProps = __rest(props, ["refCallback", "className", "type", "count", "visible", "dot", "children"]);
    var classes = classNames("bigbear-badge", "bigbear-type-" + type, className);
    var divref = useRef(null);
    useEffect(function () {
        if (refCallback && divref.current) {
            refCallback(divref.current);
        }
    }, [refCallback]);
    return (React.createElement("div", __assign({ className: classes, ref: divref }, restProps),
        count || dot ? (React.createElement("div", { className: "bigbear-badge-count bigbear-count-" + type + "\n            " + (children ? "" : "nochildren") + " " + (visible ? "" : "badge-hide") + " " + (dot ? "badge-dot" : "") },
            React.createElement("span", null, count))) : null,
        children ? children : null));
};
Badge.defaultProps = {
    type: "danger",
    visible: true,
    dot: false,
    count: ""
};
export default Badge;
