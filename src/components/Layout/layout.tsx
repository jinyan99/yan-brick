import React, {FC, CSSProperties, DOMAttributes, ReactNode, PropsWithChildren} from 'react';
import classNames from 'classnames';

export interface LayoutItemProps extends DOMAttributes<HTMLElement>{
  /** 样式 */
  style?: CSSProperties;
  /** 类名 */
  className?: string;
}

export interface LayoutProps extends LayoutItemProps {
  /** 子元素是否横向排列 */
  row?: boolean;
}

export const Layout = (props:PropsWithChildren<LayoutProps>) => {
  const {
    style,
    className,
    row,
    children,
    ...restProps
  } = props;
  const classes = classNames('yanbrick-layout', className, {
    'yanbrick-layout-row': row
  })

  return (
    <section className={classes} style={style} {...restProps}>
      {children}
    </section>
  )
}

const Header:FC<LayoutItemProps> = (props) => {
  const {
    style,
    className,
    children,
    ...restProps
  } = props;
  const classes = classNames('yanbrick-layout-header', className);

  return (
    <header className={classes} style={style} {...restProps}>
      {children}
    </header>
  )
}

const Content:FC<LayoutItemProps> = (props) => {
  const {
    style,
    className,
    children,
    ...restProps
  } = props;
  const classes = classNames('yanbrick-layout-content', className);

  return (
    <main className={classes} style={style} {...restProps}>
      {children}
    </main>
  )
}

const Sider:FC<LayoutItemProps> = (props) => {
  const {
    style,
    className,
    children,
    ...restProps
  } = props;
  const classes = classNames('yanbrick-layout-sider', className);

  return (
    <aside className={classes} style={style} {...restProps}>
      {children}
    </aside>
  )
}

const Footer:FC<LayoutItemProps> = (props) => {
  const {
    style,
    className,
    children,
    ...restProps
  } = props;
  const classes = classNames('yanbrick-layout-footer', className);

  return (
    <footer className={classes} style={style} {...restProps}>
      {children}
    </footer>
  )
}

Layout.Header = Header;
Layout.Content = Content;
Layout.Sider = Sider;
Layout.Footer = Footer;

export default Layout;