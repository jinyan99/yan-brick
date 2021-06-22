import { FC } from 'react';
export interface RadioProps {
    /** 数据 */
    data: Array<string>;
    /** 默认选中索引 */
    defaultIndex: number;
    /** 选中回调 */
    selectCallback?: (arr: Array<boolean>) => void;
    /** 额外类名 */
    className?: string;
    /** 禁用索引 */
    disableIndex?: Array<number>;
}
export declare const Radio: FC<RadioProps>;
export default Radio;
