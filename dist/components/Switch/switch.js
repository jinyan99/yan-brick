import React, { useState } from "react";
import classNames from "classnames";
export function Switch(props) {
    var _a, _b, _c;
    var bottomType = props.bottomType, btnType = props.btnType, switchSize = props.switchSize, disabled = props.disabled, defaultState = props.defaultState, callback = props.callback, beforeChange = props.beforeChange;
    var _d = useState(defaultState), checked = _d[0], setChecked = _d[1];
    var labelClassName = classNames("bigbear-switch-label", (_a = {},
        _a["bigbear-switch-label-" + bottomType] = bottomType,
        _a["bigbear-switch-label-size-" + switchSize] = switchSize,
        _a["bigbear-switch-label-disabled"] = disabled,
        _a));
    var switchCheckName = classNames("bigbear-switch-check", (_b = {},
        _b["bigbear-switch-check-" + bottomType] = bottomType,
        _b["bigbear-switch-check-size-" + switchSize] = switchSize,
        _b));
    var btnClassName = classNames("bigbear-switch-btn", (_c = {},
        _c["bigbear-switch-btn-" + btnType] = btnType,
        _c["bigbear-switch-btn-size-" + switchSize] = switchSize,
        _c));
    return (React.createElement("label", { className: labelClassName },
        React.createElement("input", { type: "checkbox", checked: checked, disabled: disabled, onChange: function () {
                var value = !checked;
                if (beforeChange)
                    value = beforeChange(value);
                setChecked(value);
                if (callback)
                    callback(value);
            } }),
        React.createElement("span", { className: switchCheckName }),
        React.createElement("span", { className: btnClassName })));
}
Switch.defaultProps = {
    bottomType: "default",
    btnType: "default",
    switchSize: "default",
    disabled: false,
    defaultState: false
};
export default Switch;
