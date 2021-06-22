import { FC, CSSProperties } from 'react';
export interface VirtualListProps {
    /** 每个元素高度 */
    itemHeight: number;
    /** 一行几个元素 */
    rowNumber?: number;
    /** 可视范围里有几个元素 */
    insightNumber: number;
    /** 滚动到第一个元素的高度(滚动到第一个元素的高度startHeight一般为0即滑第一个元素是挨着顶的具体看样式需求)*/
    startHeight?: number;
    /** 有滚动条的dom(leftbar的由用户提供的固定高度的父元素dom)*/
    scrollDom: HTMLDivElement | null;
    /** 扩展行数 */
    scaleRow?: number;
    /** 加载完成回调函数 */
    onloadFunc?: () => void;
    /** 节流函数的延迟 */
    delay?: number;
    /** virtual-custom-item的额外样式 */
    style?: CSSProperties;
    /** 设置滚动条高度的误差调整 */
    scrollbar?: number;
    /** 类名 */
    className?: string;
}
export declare const VirtualList: FC<VirtualListProps>;
export default VirtualList;
