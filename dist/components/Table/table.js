var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Pagination from '../Pagination';
/**
 * table body 的主要jsx标签渲染函数
 * @param data 具体某页的data数据，遍历它生成data.length行的tr标签
 * @param columnData 恒定的表头数据，遍历它在每一行tr中生成对应表头的td格子
 */
var MapData = function (data, columnData) {
    return data.map(function (v) { return (React.createElement("tr", { key: v.key, className: "yanbrick-table-data-row" }, columnData.map(function (value, index) { return (React.createElement("td", { key: index, className: "yanbrick-table-data-item" },
        React.createElement("span", null, value.render
            ? value.render(v[value.dataIndex], v, value)
            : v[value.dataIndex]))); }))); });
};
export var Table = function (props) {
    var data = props.data, columns = props.columns, sorted = props.sorted, pagination = props.pagination, pageSize = props.pageSize, className = props.className, style = props.style;
    var classes = classNames('yanbrick-table-container', className);
    // 源数据组
    var _a = useState([]), sourceData = _a[0], setSourceData = _a[1];
    // 列数据组
    var _b = useState([]), columnData = _b[0], setColumnData = _b[1];
    // 排序后的数据组
    var _c = useState([]), sortedData = _c[0], setSortedData = _c[1];
    // 筛选状态数据组
    var _d = useState([]), filterState = _d[0], setFilterState = _d[1];
    // 分页数据组(二维数组格式)，当前table体中要展示的对应页的数据，这是分页组件与table组件的关键接口
    var _e = useState([]), paginationData = _e[0], setPaginationData = _e[1];
    // 分页组件中当前第几页(下标格式从0开始)
    var _f = useState(0), current = _f[0], setCurrent = _f[1];
    // ❤️ 将data数据初始化为分页数据的格式
    var originPagination = useCallback(function (data) {
        var tmp = [];
        var len = data.length;
        var pageSum = Math.ceil(len / pageSize);
        for (var i = 0; i < pageSum; i++) {
            tmp[i] = data.slice(0 + i * pageSize, pageSize + i * pageSize);
        }
        setPaginationData(tmp);
    }, [pageSize]);
    var totalLen = useMemo(function () {
        setSourceData(data);
        // 副作用应该移出
        if (pagination)
            originPagination(data);
        return data.length;
    }, [data, originPagination, pagination]);
    var totalColumn = useMemo(function () {
        setColumnData(columns);
        // 副作用应该移出
        setFilterState(new Array(columns.length).fill(false));
        return columns.length;
    }, [columns]);
    var renderData = useMemo(function () {
        var render;
        if (pagination && paginationData.length) {
            render = MapData(paginationData[current], columnData);
        }
        else {
            if (sortedData.length) {
                render = MapData(sortedData, columnData);
            }
            else {
                render = MapData(sourceData, columnData);
            }
        }
        return render;
    }, [columnData, current, pagination, paginationData, sortedData, sourceData]);
    // 该副作用保证每次渲染都会检查是否有排序好的数据，若有则按排序好的数据显示，若无则初始显示
    useEffect(function () {
        if (sortedData.length) {
            originPagination(sortedData);
        }
    }, [originPagination, sortedData]);
    return (React.createElement("div", { className: classes, style: style },
        React.createElement("div", { className: "yanbrick-table-wrapper" },
            React.createElement("table", { className: "yanbrick-table-table" },
                React.createElement("thead", { className: "yanbrick-table-head" }, columns.map(function (v, i) { return (React.createElement("th", { className: "yanbrick-table-title", key: i },
                    React.createElement("span", null, v.title),
                    v.sorter && sorted && (React.createElement("span", { className: "yanbrick-table-icon", onClick: function () {
                            var _a;
                            // 当前激活再点应为恢复操作
                            if (filterState[i]) {
                                setSortedData([]);
                                if (pagination)
                                    originPagination(data);
                                filterState[i] = false;
                                setFilterState(__spreadArrays(filterState));
                            }
                            // 当前未激活再点应为激活操作
                            else {
                                var res = sourceData.slice().sort((_a = v.sorter) === null || _a === void 0 ? void 0 : _a.compare);
                                // 保证表头的各个图标是单选单亮的
                                var newfilter = new Array(totalColumn).fill(false);
                                newfilter[i] = true;
                                setSortedData(res);
                                setFilterState(newfilter);
                            }
                        } },
                        React.createElement(Icon, { icon: "filter", theme: filterState[i] === false ? 'dark' : 'primary' }))))); })),
                React.createElement("tbody", { className: "yanbrick-table-data" }, renderData))),
        pagination && (React.createElement(Pagination, { total: totalLen, pageSize: pageSize, callback: function (v) { return setCurrent(v - 1); } }))));
};
Table.defaultProps = {
    sorted: false,
    pagination: false,
    pageSize: 10
};
export default Table;
