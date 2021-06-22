import React from 'react';
export var TabPane = function (props) {
    var index = props.index, title = props.title, disabled = props.disabled;
    return (React.createElement("div", null,
        React.createElement("div", null, props.children)));
};
export default TabPane;
