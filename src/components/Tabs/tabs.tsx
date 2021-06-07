import React, {FC, useState} from 'react';
import classNames from 'classnames';
import {TabPaneProps} from './tabPane';


export interface TabsProps {
    /** 默认激活下标 */
    defaultIndex?: string;
    /** 自定义类名 */
    className?: string;
    /** 模式选择 */
    mode?: 'horizontal' | 'vertical';
    /** 自定义整体样式 */
    style?: React.CSSProperties;
    /** 选中回调 */
    onSelect?: (selectIndex: string) => void;
}

export const Tabs: FC<TabsProps> = (props) => {
    const {
        defaultIndex,
        className,
        mode,
        style,
        children,
        onSelect
    } = props;
    const [activeKey, setActiveKey] = useState(defaultIndex)
    const classes = classNames('yanbrick-tabs', className, {
        [`tabs-${mode}`]: mode
    })

    const renderHeader = () => {
        return React.Children.map(children, (element, index) => {
            const childElement = element as React.FunctionComponentElement<TabPaneProps>
            const {name} = childElement.type;
            if (name === 'TabPane') {
                return (
                    <span
                        onClick={() => {
                            setActiveKey(childElement.props.index);
                            if (onSelect) onSelect(childElement.props.index);
                        }}
                        className={classNames('tabs-title', {
                            'is-active': childElement.props.index === activeKey,
                            'is-disabled': childElement.props.disabled
                        })}
                    >
                        {childElement.props.title}
                    </span>
                )
            }
            else {
                console.warn('Warning: Tabs children must be type of TabPane')
            }
        })
    }
    const renderContent = () => {
        return React.Children.map(children, (element, index) => {
            const childElement = element as React.FunctionComponentElement<TabPaneProps>
            if (activeKey === childElement.props.index) {
            return <div>{childElement.props.children}</div>
            }
        })
    }

    return (
        <div className={classes} style={style}>
            <div className="tabs-header">{renderHeader()}</div>
            <div className="tabs-content">{renderContent()}</div>
        </div>
    )
}
Tabs.defaultProps = {
    mode: 'horizontal',
    defaultIndex: '1'
}

export default Tabs;