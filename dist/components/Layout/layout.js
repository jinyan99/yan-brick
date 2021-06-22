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
import React from 'react';
import classNames from 'classnames';
export var Layout = function (props) {
    var style = props.style, className = props.className, row = props.row, children = props.children, restProps = __rest(props, ["style", "className", "row", "children"]);
    var classes = classNames('yanbrick-layout', className, {
        'yanbrick-layout-row': row
    });
    return (React.createElement("section", __assign({ className: classes, style: style }, restProps), children));
};
var Header = function (props) {
    var style = props.style, className = props.className, children = props.children, restProps = __rest(props, ["style", "className", "children"]);
    var classes = classNames('yanbrick-layout-header', className);
    return (React.createElement("header", __assign({ className: classes, style: style }, restProps), children));
};
var Content = function (props) {
    var style = props.style, className = props.className, children = props.children, restProps = __rest(props, ["style", "className", "children"]);
    var classes = classNames('yanbrick-layout-content', className);
    return (React.createElement("main", __assign({ className: classes, style: style }, restProps), children));
};
var Sider = function (props) {
    var style = props.style, className = props.className, children = props.children, restProps = __rest(props, ["style", "className", "children"]);
    var classes = classNames('yanbrick-layout-sider', className);
    return (React.createElement("aside", __assign({ className: classes, style: style }, restProps), children));
};
var Footer = function (props) {
    var style = props.style, className = props.className, children = props.children, restProps = __rest(props, ["style", "className", "children"]);
    var classes = classNames('yanbrick-layout-footer', className);
    return (React.createElement("footer", __assign({ className: classes, style: style }, restProps), children));
};
Layout.Header = Header;
Layout.Content = Content;
Layout.Sider = Sider;
Layout.Footer = Footer;
export default Layout;
