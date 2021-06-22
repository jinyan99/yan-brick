import { FC, DOMAttributes } from 'react';
interface FormProps extends DOMAttributes<HTMLDivElement> {
    /** 额外类名 */
    className?: string;
}
export declare const Form: FC<FormProps>;
export default Form;
