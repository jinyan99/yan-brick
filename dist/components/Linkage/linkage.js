var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useState, useEffect } from 'react';
import Button from '../Button';
export var Domain = function (_a) {
    var arr = _a.arr, onItemClick = _a.onItemClick;
    // arr一定传的是个数组
    if (!Array.isArray(arr))
        return null;
    return (React.createElement("div", { className: "items" }, arr.map(function (item, index) { return (React.createElement("div", { className: item.current ? "current item" : "item", key: index, onClick: function (e) { return onItemClick(item, index); } }, item.domain)); })));
};
export var Linkage = function (props) {
    var dataSource = props.dataSource;
    // data数组存的是各层级对应的数组
    var _a = useState(dataSource), data = _a[0], setData = _a[1];
    // 该数组存的是各层级选中过的domain标题组成的数组
    var _b = useState([]), selectItems = _b[0], setSelectItems = _b[1];
    var _c = useState(false), isShow = _c[0], setIsShow = _c[1];
    // ======= 周期相关 ========
    useEffect(function () {
        onInit();
    }, []);
    // ======= 回调相关 ========
    var onStartClick = function (e) {
        console.log('点击选择');
        setIsShow(function (s) { return !s; });
    };
    var onInit = function () {
        console.log('点击全部--初始化');
        setData([__spreadArrays(dataSource)]);
        setSelectItems([]);
    };
    /**
     * 核心计算方法 (主要是处理data和selectItems数据的更新计算)
     * 大致逻辑就是: 当点击一项后，交由该函数处理，根据传入的value判断，若value有children数组的话，则需要将这个chidren放到
     * data[level+1]中，同时将value中的当前标题放入selectItems[level]中；若没有children数组则不用动data数组，只改变current标示即可
     * @param value 当前点击的对象
     * @param index 第几位
     * @param level 层级(一个数组对应一级)---这个层级的意思是级联的级数，当前默认是0级，当点击0级中A项展开A项的一对
     * 数组，则此时这对数组是1级，再点开1级中就会出现第2级数组
     */
    var onItemClick = function (value, index, level) {
        console.log('点击某一项', value, index, level); //如valueA项，index：0，level：0级
        var _data = __spreadArrays(data);
        var _selectItems = __spreadArrays(selectItems);
        // 当该对象的children存在时
        if (value.children) {
            var child = value.children;
            _data.forEach(function (items, i) {
                if (i > level) {
                    markCurrent(items, null);
                }
            });
            // 改变原数组，返回删除当前level级元素组的数组,原数组就会变成删后剩下的数据组成的数组，则下行的_data就只变成[level]单项数组
            _data.splice(level + 1);
            // 改变原选中项标题数组，原数组变成删掉level项及以后的各项的 剩下组成数组
            _selectItems.splice(level);
            // 先将level+1项删掉清空后，再将level+1级数组项置为最新数据即 A项的chidlren展开的数组
            _data[level + 1] = child;
            markCurrent(_data[level], index);
            // 先将selectItems数组的level项及以后的项都清空后，然后将level项置为当前value新值
            _selectItems[level] = value.domain;
            setData(_data);
            setSelectItems(_selectItems);
        }
        else {
            markCurrent(_data[level], index);
        }
    };
    // ======= 状态判断 ========
    // ======= 工具函数 ========
    /**
     * 标记current的方法
     * @param arr，为data多级二维数组中的某一级数组如arr = data[0]
     * @param index 是level级的data数组中的某一level级项数组中的index下标，给index项加current标示
     */
    var markCurrent = function (arr, index) {
        if (index === null) {
            // 若传了null，遍历arr数组，给里面的每一项current置为false
            arr.forEach(function (item) {
                item.current = false;
            });
            return;
        }
        arr.forEach(function (item, i) {
            if (i === index) {
                item.current = true;
                return;
            }
            item.current = false;
        });
    };
    // ======= 其他执行函数 =====
    return (React.createElement("div", { className: "domain" },
        React.createElement("div", { className: "select" },
            React.createElement("input", { type: "text", className: "input", placeholder: "\u8BF7\u9009\u62E9\u57DF" }),
            React.createElement(Button, { size: "sm", onClick: onStartClick }, "\u9009\u62E9")),
        React.createElement("div", { className: "menu", style: { display: isShow ? 'block' : 'none' } },
            React.createElement("div", { className: "all", onClick: onInit }, "\u5168\u90E8"),
            data.map(function (item, level) {
                console.log(item, '看渲染数据');
                return (React.createElement("div", { key: level, className: "domainArr" },
                    React.createElement(Domain, { arr: item, onItemClick: function (value, index) {
                            onItemClick(value, index, level);
                        } }),
                    selectItems[level] ? (React.createElement("div", { className: "selectItem" }, selectItems[level])) : null));
            }))));
};
export default Linkage;
