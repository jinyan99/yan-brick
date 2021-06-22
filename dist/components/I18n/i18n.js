import React, { useState, useCallback } from 'react';
export var Context = React.createContext({
    // 初始值是空对象
    state: {},
    toggle: function () { }
});
export var I18n = function (props) {
    var defaultLang = props.defaultLang, library = props.library, children = props.children;
    // state作为某个语言包的数据资源对象形式，其包括视图中出现的所有字段其对应的中文值
    var _a = useState(library[defaultLang] || {}), state = _a[0], setState = _a[1];
    var toggle = useCallback(function (str) {
        if (library[str]) {
            setState(library[str]);
        }
    }, [library]);
    // 将state具体的语言包作为context上下文跨层级传递给包含的所有子组件，子组件中获取上下文得到其对应语言映射
    // 还将toggle切换函数通过context传下去，可以让任意层级子组件中手动切换语言
    // 利用context上下文的动态更新功能来实现语言包的切换
    return (React.createElement(Context.Provider, { value: { state: state, toggle: toggle } }, children));
};
export default I18n;
