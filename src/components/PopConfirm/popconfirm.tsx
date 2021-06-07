import React,{FC, ReactNode, useEffect, useRef, useState, CSSProperties} from 'react';
import {ModalType, Modal} from '../Modal/modal';
//import classNames from 'classnames';

export type PopDirections =
  | 'TL'
  | 'TOP'
  | 'TR'
  | 'LT'
  | 'LEFT'
  | 'LB'
  | 'BL'
  | 'BOTTOM'
  | 'BR'
  | 'RT'
  | 'RIGHT'
  | 'RB';
interface DefaultParameter {
  mask: boolean;
	className: string;
	stopScroll: false;
	btnSize: 'sm';
}
export interface PopconfirmProps extends Partial<ModalType> {
  /** 使用wrapperNode来传递，显示开关元素功能 */
  wrapperNode: ReactNode;
  /** 显示包裹元素方位 */
  directions?: PopDirections;
  /** 是否点击触发 */
  click?: boolean;
  /** 是否hover触发 */
  hover?: boolean;
  className?: string
}

//转化定位属性
function switchPosition(
  sign: PopDirections,
  modalrect: DOMRect,
  popconfirmrect: DOMRect,
  scroll: number
): CSSProperties {
  // 小三角高度
  const triangle = 5;
  switch(sign) {
    case 'TL':
      return {
        top: popconfirmrect.top + scroll - modalrect.height - triangle,
        left: popconfirmrect.left
      }
    case 'TOP':
      return {
        top: popconfirmrect.top + scroll - modalrect.height - triangle,
        left: popconfirmrect.left - modalrect.width / 2 + popconfirmrect.width / 2
      }
    case 'TR':
      return {
        top: popconfirmrect.top + scroll - modalrect.height - triangle,
        left: popconfirmrect.left - modalrect.width + popconfirmrect.width
      }
    case 'LT':
      return {
        top: popconfirmrect.top + scroll,
        left: popconfirmrect.left - modalrect.width - triangle
      }
    case 'LEFT':
      return {
        top: popconfirmrect.top + scroll + popconfirmrect.height / 2 - modalrect.height / 2,
        left: popconfirmrect.left - modalrect.width - triangle
      }
    case 'LB':
      return {
        top: popconfirmrect.top + scroll + popconfirmrect.height - modalrect.height,
        left: popconfirmrect.left - modalrect.width - triangle
      }
    case 'BL':
      return {
        top: popconfirmrect.top + scroll + popconfirmrect.height + triangle,
				left: popconfirmrect.left
      }
    case 'BOTTOM':
      return {
        top: popconfirmrect.top + scroll + popconfirmrect.height + triangle,
        left: popconfirmrect.left + popconfirmrect.width / 2 - modalrect.width / 2
      };
    case 'BR':
      return {
        top: popconfirmrect.top + scroll + popconfirmrect.height + triangle,
        left: popconfirmrect.left + popconfirmrect.width - modalrect.width
      };
    case 'RT':
      return {
        top: popconfirmrect.top + scroll,
        left: popconfirmrect.left + popconfirmrect.width + triangle
      };
    case 'RIGHT':
      return {
        top: popconfirmrect.top + scroll + popconfirmrect.height / 2 - modalrect.height / 2,
        left: popconfirmrect.left + popconfirmrect.width + triangle
      };
    case 'RB':
      return {
        top: popconfirmrect.top + scroll + popconfirmrect.height - modalrect.height,
        left: popconfirmrect.left + popconfirmrect.width + triangle
      };
    default:
      console.error('you may pass error directions' + sign)
      return {}
  }
}

export const Popconfirm:FC<PopconfirmProps> = (props) => {
  const {
    wrapperNode,
    directions,
    click,
    hover,
    className,
    visible,
    setState,
    ...restProps
  } = props;
  // 用于综合计算返回Modal组件的可传props
  const defaultPropsConfirmParameter: DefaultParameter = {
    mask: false,
    className: `yanbrick-popconfirm popconfirm-${directions}`,
    stopScroll: false,
    btnSize: 'sm'
  }
  const mergeOption = {...defaultPropsConfirmParameter, ...restProps};

  // 组件内部控制modal开关的切换状态，当外界传setState和visible时--该值失效
  const [innerstate, setInnerState] = useState(false);
  const [style, setStyle] = useState<CSSProperties>({});
  const ref = useRef<HTMLDivElement>(null);
  const [modalRef, setModalRef] = useState<HTMLDivElement>();

  const refcallback = (ref: HTMLDivElement) => {
    setModalRef(ref);
  }

  useEffect(() => {
    if (ref.current && modalRef) {
      // 获取网页正文滚去的高度
      const scroll = document.documentElement.scrollTop + document.body.scrollTop;// 移动端可能取不到
      const res = switchPosition(
        directions!,
        modalRef.getBoundingClientRect(),
        ref.current.getBoundingClientRect(),
        scroll
      );
      setStyle(res);
    }
  }, [directions, modalRef])

  return (
    <div
      className="yanbrick-popconfirm-wrapper"
      ref={ref}
      onClick={click ? () => setInnerState(!innerstate) : undefined}
      onMouseEnter={hover ? () => setInnerState(true) : undefined}
      onMouseLeave={hover ? () => setInnerState(false) : undefined}
    >
      {wrapperNode}
      <Modal
        visible={setState ? visible! : innerstate}
        setState={setState ? setState : setInnerState}
        {...mergeOption}
        portalStyle={style}
        refCallback={refcallback}
      />
    </div>
  )
}

Popconfirm.defaultProps = {
  directions: 'TOP',
  click: true,
  hover: false
}

export default Popconfirm;