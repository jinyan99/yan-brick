import { FC, ReactNode, CSSProperties } from 'react';
export interface SourceDataType {
    key: string;
    [key: string]: any;
}
export interface ColumnType {
    title: ReactNode;
    /**排序等操作用来代替这列的 */
    dataIndex: string;
    sorter?: {
        compare: (a: SourceDataType, b: SourceDataType) => number;
    };
    render?: (v: any, value: SourceDataType, rowData: ColumnType) => ReactNode;
}
export interface TableProps {
    /** 表内数据部分 */
    data: SourceDataType[];
    /** 表头部分 */
    columns: ColumnType[];
    /** 是否开启筛选 */
    sorted?: boolean;
    /** 是否开启页码 */
    pagination?: boolean;
    /** 开启页码时才有效，设置每页显示几个 */
    pageSize?: number;
    /** 外层容器类名 */
    className?: string;
    /** 外层容器样式 */
    style?: CSSProperties;
}
export declare const Table: FC<TableProps>;
export default Table;
