import { FC } from 'react';
export interface ItemProps {
    id: number;
    domain: string;
    children?: ItemProps[];
}
export interface LinkageProps {
    /** 联动数据源 */
    dataSource: Array<ItemProps>;
}
export declare const Domain: ({ arr, onItemClick }: any) => JSX.Element;
export declare const Linkage: FC<LinkageProps>;
export default Linkage;
