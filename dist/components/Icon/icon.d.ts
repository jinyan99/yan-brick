import React from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export declare type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'danger' | 'dark' | 'warning';
export interface IconProps extends FontAwesomeIconProps {
    /** 主题设定 */
    theme?: ThemeProps;
}
export declare const Icon: React.FC<IconProps>;
export default Icon;
