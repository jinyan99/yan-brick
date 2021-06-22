import { FC } from 'react';
interface PaginationProps {
    /** 每页显示多少条 */
    pageSize?: number;
    /** 默认显示第几页 */
    defaultCurrent?: number;
    /** 总共条数 */
    total: number;
    /** 分页条目最大显示长度 */
    barMaxSize?: number;
    /** 回调页数 */
    callback?: (v: number) => void;
}
export declare const Pagination: FC<PaginationProps>;
export default Pagination;
