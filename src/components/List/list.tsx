import React, {
	FC,
	CSSProperties,
	MouseEvent,
	ReactNode,
	useRef,
	useEffect,
	useCallback,
	DOMAttributes
} from 'react';
import classNames from 'classnames';

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
	onSelect?: (e: MouseEvent<HTMLUListElement, globalThis.MouseEvent>) => void; // 牢记鼠标事件ts类型范型传参
	/** 模版进行渲染 */
	renderTemplate?: (child: ReactNode, index: number) => ReactNode;
	/** ref回调 */
	refCallback?: (e: HTMLUListElement | null) => void;
}

export const List: FC<ListProps> = (props) => {
	const {
		className,
		mode,
		style,
		children,
		listyle,
		liClassName,
    withHoverActive,
    onSelect,
		renderTemplate,
		refCallback,
		...restProps
	} = props;
	const classes = classNames('yanbrick-list', className, {
		[`list-${mode}`]: mode
	});
	const liclasses = classNames('yanbrick-list-item', liClassName, {
		[`list-withHoverActive`]: withHoverActive
	});

	const ulref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (refCallback && ulref.current) {
      refCallback(ulref.current);
    }
  }, [refCallback])

  const handleClick = (
		e: MouseEvent<HTMLUListElement, globalThis.MouseEvent>
	) => {
		if (onSelect) onSelect(e);
	};

	const renderLiTemplate = useCallback(() => {
		return React.Children.map(children, (child, index) => (
			<li key={index} style={style} className={liclasses}>
				{renderTemplate ? renderTemplate(child, index) : child}
			</li>
		));
	}, [renderTemplate, children, style, liclasses]);

	return (
		<ul
			className={classes}
			style={style}
			onClick={(e) => handleClick(e)}
			ref={ulref}
			{...restProps}
		>
			{renderLiTemplate()}
		</ul>
	);
};

List.defaultProps = {
  mode: 'vertical',
  withHoverActive: false
}

export default List;
