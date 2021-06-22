import { FC, ReactNode } from 'react';
import { ModalType } from '../Modal/modal';
export declare type PopDirections = 'TL' | 'TOP' | 'TR' | 'LT' | 'LEFT' | 'LB' | 'BL' | 'BOTTOM' | 'BR' | 'RT' | 'RIGHT' | 'RB';
export interface PopconfirmProps extends Partial<ModalType> {
    /** 使用wrapperNode来传递，显示开关元素功能 */
    wrapperNode: ReactNode;
    /** 显示包裹元素方位 */
    directions?: PopDirections;
    /** 是否点击触发 */
    click?: boolean;
    /** 是否hover触发 */
    hover?: boolean;
    className?: string;
}
export declare const Popconfirm: FC<PopconfirmProps>;
export default Popconfirm;
