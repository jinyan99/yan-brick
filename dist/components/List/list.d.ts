import { FC, CSSProperties, MouseEvent, ReactNode, DOMAttributes } from 'react';
export interface ListProps extends DOMAttributes<HTMLUListElement> {
    /** 水平或垂直 */
    mode?: 'horizontal' | 'vertical';
    /** 是否加上hover与active */
    withHoverActive?: boolean;
    /** ul样式 */
    style?: CSSProperties;
    /** li样式 */
    listyle?: CSSProperties;
    /** ul额外类名 */
    className?: string;
    /** li额外类名 */
    liClassName?: string;
    /** ul的click回调 */
    onSelect?: (e: MouseEvent<HTMLUListElement, globalThis.MouseEvent>) => void;
    /** 模版进行渲染 */
    renderTemplate?: (child: ReactNode, index: number) => ReactNode;
    /** ref回调 */
    refCallback?: (e: HTMLUListElement | null) => void;
}
export declare const List: FC<ListProps>;
export default List;
