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
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import useThrottle from '../../hooks/useThrottle';
export var VirtualList = function (props) {
    var children = props.children, itemHeight = props.itemHeight, rowNumber = props.rowNumber, insightNumber = props.insightNumber, startHeight = props.startHeight, scrollDom = props.scrollDom, scaleRow = props.scaleRow, onloadFunc = props.onloadFunc, delay = props.delay, style = props.style, scrollbar = props.scrollbar, className = props.className;
    var classes = classNames('yanbrick-virtual-container');
    // virtual的leftbar的高度的动态设置
    var _a = useState(), costomHeight = _a[0], setCostomHeight = _a[1];
    // virtual的customItem区域虚拟列表的高度动态设置
    var _b = useState(), visbleHeight = _b[0], setVisibleHeight = _b[1];
    // 虚拟列表总列表节点的渲染
    var _c = useState(), renderChildren = _c[0], setRenderChildren = _c[1];
    // 用于动态截取列表children数组展现在可视区域的开始结尾下标
    var _d = useState({
        startIndex: 0,
        endIndex: insightNumber,
        // 这个overscroll高度要设给custom-item元素对应往上移动的高度，否则会随着leftbar的滚动而滚动，应当固定
        overScroll: 0
    }), indexNumber = _d[0], setIndexNumber = _d[1];
    // 专门用来解决costomHeight，visbleHeight，renderChildren的更新的副作用
    useEffect(function () {
        if (children instanceof Array) {
            var childrenLen = children.length;
            if (childrenLen % rowNumber !== 0) {
                // 说明最后一行没满
                var remain = childrenLen % rowNumber;
                // @TODO ？？？为什么要加要是为了下面fullheight的赋值能整除的话应该+(x-remain)
                childrenLen = childrenLen + remain;
            }
            // 1 costom高度更新
            var fullheight = (childrenLen / rowNumber) * itemHeight;
            if (scrollbar) { //滚动条误差容错
                setCostomHeight(fullheight + scrollbar);
            }
            else {
                setCostomHeight(fullheight);
            }
            // 2 visble高度更新
            var insightHeight = void 0;
            if (childrenLen < insightNumber) {
                // 传来长度小于可视长度情况
                insightHeight = fullheight;
            }
            else {
                insightHeight = (insightNumber / rowNumber) * itemHeight;
            }
            setVisibleHeight(insightHeight);
            // 3 renderChildren更新
            var scuRender = children.slice(indexNumber.startIndex, indexNumber.endIndex);
            setRenderChildren(scuRender);
        }
    }, [
        children,
        indexNumber,
        rowNumber,
        itemHeight,
        insightNumber,
        scrollbar
    ]);
    // 滚动监听的副作用
    useEffect(function () {
        var scrollFunc = function (e) {
            var target = e.target;
            // 卷曲高度
            var overScroll = target.scrollTop - startHeight;
            // 由滚去高度算出此时页面上应该滑过的list item总个数 (但此时页面上还是状态控制的暂时无变化，得等待setIndexNumber更新及renderChildren更新
            var timer = (overScroll / itemHeight) * rowNumber;
            // 若初始滑时，scrollTop是为0，所以起始索引从0开始
            var startIndex = Math.floor(timer);
            startIndex = startIndex < 0 ? 0 : startIndex;
            timer = (timer % rowNumber) / rowNumber; // 滚去的最后一行的(余个数/一行总个数)比例
            if (timer < 0)
                timer = 0;
            if (overScroll < 0)
                overScroll = 0;
            if (startIndex % rowNumber !== 0) {
                // 滑去的上一行没补满时，自动减满，给startIndex往前移几个，保证每滑去的上一行是满行的
                startIndex = startIndex - (startIndex % rowNumber);
            }
            var endIndex = startIndex + insightNumber + (scaleRow * rowNumber);
            // 当划去的上一行不满时不仅要处理startIndex自动减满，还要同步处理overscroll的随startIndex自动减慢的卷去高度
            overScroll = overScroll - timer * itemHeight;
            setTimeout(function () {
                setIndexNumber({
                    startIndex: startIndex,
                    endIndex: endIndex,
                    overScroll: overScroll
                });
            });
        };
        // 节流产物事件执行类函数
        var combinedFunc = useThrottle(scrollFunc, delay);
        // 下面监听滚动事件再连续滚动都会在delay时间内只执行一次scrollFunc回调
        if (scrollDom) {
            scrollDom.addEventListener('scroll', combinedFunc);
        }
        if (onloadFunc) {
            onloadFunc();
        }
        return function () {
            if (scrollDom) {
                scrollDom.removeEventListener('scroll', combinedFunc);
            }
        };
    }, [props]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: classes },
            React.createElement("div", { className: "virtual-custom-leftbar", style: {
                    height: costomHeight || 0
                } }),
            React.createElement("div", { className: "virtual-custom-item", style: __assign({ height: visbleHeight || 0, position: "relative", transform: "translateY(" + indexNumber.overScroll + "px)" }, style) }, renderChildren))));
};
VirtualList.defaultProps = {
    scaleRow: 2,
    delay: 20,
    rowNumber: 1,
    startHeight: 0
};
export default VirtualList;
