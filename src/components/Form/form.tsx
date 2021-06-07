import React, {FC,DOMAttributes} from 'react';
import classNames from 'classnames';

interface FormProps extends DOMAttributes<HTMLDivElement> {
    /** 额外类名 */
    className?: string;
}

export const Form:FC<FormProps> = (props) =>{
    const {
        children,
        className,
        ...restProps
    } = props;
    const classes = classNames('yanbrick-form', className);

    return (
        <div className={classes} {...restProps}>
            {children!}
        </div>
    )
}

export default Form;