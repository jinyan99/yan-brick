import React, {
	FC,
	useState,
	useMemo,
	useEffect,
	ReactNode,
	CSSProperties,
	useCallback
} from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Pagination from '../Pagination';

export interface SourceDataType {
	key: string;
	[key: string]: any;
}
export interface ColumnType {
	title: ReactNode;
	/**排序等操作用来代替这列的 */
	dataIndex: string;
	sorter?: {
		// 这个函数的格式对应排序sort里的回调函数
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

/**
 * table body 的主要jsx标签渲染函数
 * @param data 具体某页的data数据，遍历它生成data.length行的tr标签
 * @param columnData 恒定的表头数据，遍历它在每一行tr中生成对应表头的td格子
 */
const MapData = (data: SourceDataType[], columnData: ColumnType[]) => {
	return data.map((v) => (
		<tr key={v.key} className="yanbrick-table-data-row">
			{columnData.map((value, index) => (
				<td key={index} className="yanbrick-table-data-item">
					<span>
						{value.render
							? value.render(v[value.dataIndex], v, value)
							: v[value.dataIndex]}
					</span>
				</td>
			))}
		</tr>
	));
};

export const Table: FC<TableProps> = (props) => {
	const {
		data,
		columns,
		sorted,
		pagination,
		pageSize,
		className,
		style
	} = props;
	const classes = classNames('yanbrick-table-container', className);

	// 源数据组
	const [sourceData, setSourceData] = useState<SourceDataType[]>([]);
	// 列数据组
	const [columnData, setColumnData] = useState<ColumnType[]>([]);
	// 排序后的数据组
	const [sortedData, setSortedData] = useState<SourceDataType[]>([]);
	// 筛选状态数据组
	const [filterState, setFilterState] = useState<boolean[]>([]);
	// 分页数据组(二维数组格式)，当前table体中要展示的对应页的数据，这是分页组件与table组件的关键接口
	const [paginationData, setPaginationData] = useState<SourceDataType[][]>([]);
	// 分页组件中当前第几页(下标格式从0开始)
	const [current, setCurrent] = useState<number>(0);

	// ❤️ 将data数据初始化为分页数据的格式
	const originPagination = useCallback(
		(data: SourceDataType[]) => {
			const tmp: SourceDataType[][] = [];
			const len = data.length;
			const pageSum = Math.ceil(len / pageSize!);

			for (let i = 0; i < pageSum; i++) {
				tmp[i] = data.slice(0 + i * pageSize!, pageSize! + i * pageSize!);
			}
			setPaginationData(tmp);
		},
		[pageSize]
	);

	const totalLen = useMemo(() => {
		setSourceData(data);
		// 副作用应该移出
		if (pagination) originPagination(data);

		return data.length;
	}, [data, originPagination, pagination]);
	const totalColumn = useMemo(() => {
		setColumnData(columns);
		// 副作用应该移出
		setFilterState(new Array(columns.length).fill(false));

		return columns.length;
	}, [columns]);

	const renderData = useMemo(() => {
		let render;

		if (pagination && paginationData.length) {
			render = MapData(paginationData[current], columnData);
		} else {
			if (sortedData.length) {
				render = MapData(sortedData, columnData);
			} else {
				render = MapData(sourceData, columnData);
			}
		}

		return render;
	}, [columnData, current, pagination, paginationData, sortedData, sourceData]);

  // 该副作用保证每次渲染都会检查是否有排序好的数据，若有则按排序好的数据显示，若无则初始显示
	useEffect(() => {
    if (sortedData.length) {
      originPagination(sortedData)
    }
  }, [originPagination, sortedData]);

	return (
		<div className={classes} style={style}>
			<div className="yanbrick-table-wrapper">
				<table className="yanbrick-table-table">
					<thead className="yanbrick-table-head">
						{columns.map((v, i) => (
							<th className="yanbrick-table-title" key={i}>
								<span>{v.title}</span>
								{v.sorter && sorted && (
									<span
										className="yanbrick-table-icon"
										onClick={() => {
											// 当前激活再点应为恢复操作
											if (filterState[i]) {
												setSortedData([]);
												if (pagination) originPagination(data);
												filterState[i] = false;
												setFilterState([...filterState]);
											}
											// 当前未激活再点应为激活操作
											else {
                        const res = sourceData.slice().sort(v.sorter?.compare);
                        // 保证表头的各个图标是单选单亮的
												const newfilter = new Array(totalColumn).fill(false);
												newfilter[i] = true;
												setSortedData(res);
												setFilterState(newfilter);
											}
										}}
									>
										<Icon
											icon="filter"
											theme={filterState[i] === false ? 'dark' : 'primary'}
										/>
									</span>
								)}
							</th>
						))}
					</thead>
					<tbody className="yanbrick-table-data">{renderData}</tbody>
				</table>
			</div>
			{pagination && (
				<Pagination
					total={totalLen}
					pageSize={pageSize}
					callback={(v) => setCurrent(v - 1)}
				/>
			)}
		</div>
	);
};

Table.defaultProps = {
  sorted: false,
  pagination: false,
  pageSize: 10
}

export default Table;
