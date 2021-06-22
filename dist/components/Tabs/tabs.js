import React, { useState } from 'react';
import classNames from 'classnames';
export var Tabs = function (props) {
    var _a;
    var defaultIndex = props.defaultIndex, className = props.className, mode = props.mode, style = props.style, children = props.children, onSelect = props.onSelect;
    var _b = useState(defaultIndex), activeKey = _b[0], setActiveKey = _b[1];
    var classes = classNames('yanbrick-tabs', className, (_a = {},
        _a["tabs-" + mode] = mode,
        _a));
    var renderHeader = function () {
        return React.Children.map(children, function (element, index) {
            var childElement = element;
            var name = childElement.type.name;
            if (name === 'TabPane') {
                return (React.createElement("span", { onClick: function () {
                        setActiveKey(childElement.props.index);
                        if (onSelect)
                            onSelect(childElement.props.index);
                    }, className: classNames('tabs-title', {
                        'is-active': childElement.props.index === activeKey,
                        'is-disabled': childElement.props.disabled
                    }) }, childElement.props.title));
            }
            else {
                console.warn('Warning: Tabs children must be type of TabPane');
            }
        });
    };
    var renderContent = function () {
        return React.Children.map(children, function (element, index) {
            var childElement = element;
            if (activeKey === childElement.props.index) {
                return React.createElement("div", null, childElement.props.children);
            }
        });
    };
    return (React.createElement("div", { className: classes, style: style },
        React.createElement("div", { className: "tabs-header" }, renderHeader()),
        React.createElement("div", { className: "tabs-content" }, renderContent())));
};
Tabs.defaultProps = {
    mode: 'horizontal',
    defaultIndex: '1'
};
export default Tabs;
