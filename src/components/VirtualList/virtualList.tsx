import React,{FC, CSSProperties, useState, ReactNode, useEffect} from 'react';
import classNames from 'classnames';
import useThrottle from '../../hooks/useThrottle';

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
  className?: string
}

export const VirtualList:FC<VirtualListProps> = (props) => {
  const {
    children,
    itemHeight,
    rowNumber,
    insightNumber,
    startHeight,
    scrollDom,
    scaleRow,
    onloadFunc,
    delay,
    style,
    scrollbar,
    className
  } = props;
  const classes = classNames('yanbrick-virtual-container');

  // virtual的leftbar的高度的动态设置
  const [costomHeight, setCostomHeight] = useState<number>();
  // virtual的customItem区域虚拟列表的高度动态设置
  const [visbleHeight, setVisibleHeight] = useState<number>();
  // 虚拟列表总列表节点的渲染
  const [renderChildren, setRenderChildren] = useState<Array<ReactNode>>();
  // 用于动态截取列表children数组展现在可视区域的开始结尾下标
  const [indexNumber, setIndexNumber] = useState({
    startIndex: 0,
    endIndex: insightNumber,
    // 这个overscroll高度要设给custom-item元素对应往上移动的高度，否则会随着leftbar的滚动而滚动，应当固定
    overScroll: 0
  });

  // 专门用来解决costomHeight，visbleHeight，renderChildren的更新的副作用
  useEffect(() => {
    if (children instanceof Array) {
      let childrenLen = children.length;
      if (childrenLen % rowNumber! !== 0) {
        // 说明最后一行没满
        const remain = childrenLen % rowNumber!;
        // @TODO ？？？为什么要加要是为了下面fullheight的赋值能整除的话应该+(x-remain)
        childrenLen = childrenLen + remain;
      }

      // 1 costom高度更新
      const fullheight = (childrenLen / rowNumber!) * itemHeight;
      if (scrollbar) {//滚动条误差容错
        setCostomHeight(fullheight + scrollbar);
      } else {
        setCostomHeight(fullheight);
      }

      // 2 visble高度更新
      let insightHeight;
      if (childrenLen < insightNumber) {
        // 传来长度小于可视长度情况
        insightHeight = fullheight;
      } else {
        insightHeight = (insightNumber / rowNumber!) * itemHeight;
      }
      setVisibleHeight(insightHeight);

      // 3 renderChildren更新
      const scuRender = children.slice(indexNumber.startIndex, indexNumber.endIndex);
      setRenderChildren(scuRender);
    }
  }, [
    children,
    indexNumber,
    rowNumber,
    itemHeight,
    insightNumber,
    scrollbar
  ])

  // 滚动监听的副作用
  useEffect(() => {
    const scrollFunc = (e: WheelEvent) => {
      const target = e.target as HTMLDivElement;
      // 卷曲高度
      let overScroll = target.scrollTop - startHeight!;
      // 由滚去高度算出此时页面上应该滑过的list item总个数 (但此时页面上还是状态控制的暂时无变化，得等待setIndexNumber更新及renderChildren更新
      let timer = (overScroll / itemHeight) * rowNumber!;
      // 若初始滑时，scrollTop是为0，所以起始索引从0开始
      let startIndex = Math.floor(timer);

      startIndex = startIndex < 0 ? 0 : startIndex;
      timer = (timer % rowNumber!) / rowNumber!; // 滚去的最后一行的(余个数/一行总个数)比例
      if (timer < 0) timer = 0;
      if (overScroll < 0) overScroll = 0;
      if (startIndex % rowNumber! !== 0) {
        // 滑去的上一行没补满时，自动减满，给startIndex往前移几个，保证每滑去的上一行是满行的
        startIndex = startIndex - (startIndex % rowNumber!);
      }
      const endIndex = startIndex + insightNumber + (scaleRow! * rowNumber!);

      // 当划去的上一行不满时不仅要处理startIndex自动减满，还要同步处理overscroll的随startIndex自动减慢的卷去高度
      overScroll = overScroll - timer * itemHeight;

      setTimeout(() => {
        setIndexNumber({
          startIndex,
          endIndex,
          overScroll
        })
      });
    };
    // 节流产物事件执行类函数
    const combinedFunc = useThrottle(scrollFunc, delay!);

    // 下面监听滚动事件再连续滚动都会在delay时间内只执行一次scrollFunc回调
    if (scrollDom) {
      scrollDom.addEventListener('scroll', combinedFunc)
    }
    if (onloadFunc) {
      onloadFunc();
    }

    return () => {
      if (scrollDom) {
        scrollDom.removeEventListener('scroll', combinedFunc);
      }
    }
  }, [props])

  return (
    <>
      <div className={classes}>
        <div
          className="virtual-custom-leftbar"
          style={{
            height: costomHeight || 0
          }}
        />
        <div
          className="virtual-custom-item"
          style={{
            height: visbleHeight || 0,
            position: "relative",
            transform: `translateY(${indexNumber.overScroll}px)`,
            ...style
          }}
        >
          {renderChildren}
        </div>
      </div>
    </>
  )
}

VirtualList.defaultProps = {
  scaleRow: 2,
  delay: 20,
  rowNumber: 1,
  startHeight: 0
}
export default VirtualList;