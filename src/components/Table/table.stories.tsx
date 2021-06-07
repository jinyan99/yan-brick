import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Table, SourceDataType } from './table';
import Button from '../Button';
import Checkbox from '../Checkbox/checkbox';
import PopConfirm from '../PopConfirm';

export const columns = [
	{
		title: 'Name',
		dataIndex: 'name'
	},
	{
		title: 'Chinese Score',
		dataIndex: 'chinese',
		sorter: {
			compare: (a: SourceDataType, b: SourceDataType) => b.chinese - a.chinese
		}
	},
	{
		title: 'Math Score',
		dataIndex: 'math',
		sorter: {
			compare: (a: SourceDataType, b: SourceDataType) => b.math - a.math
		}
	},
	{
		title: 'English Score',
		dataIndex: 'english',
		sorter: {
			compare: (a: SourceDataType, b: SourceDataType) => b.english - a.english
		}
	}
];
export const data = [
	{
		key: '1',
		name: 'John Brown',
		chinese: 55,
		math: 60,
		english: 70
	},
	{
		key: '2',
		name: 'Jim Green',
		chinese: 98,
		math: 66,
		english: 89
	},
	{
		key: '3',
		name: 'Joe Black',
		chinese: 78,
		math: 90,
		english: 70
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89
	}
];
export const columnsRender = [
	{
		title: 'Name',
		dataIndex: 'name'
	},
	{
		title: 'Chinese Score',
		dataIndex: 'chinese',
		sorter: {
			compare: (a: SourceDataType, b: SourceDataType) => b.chinese - a.chinese
		},
		render: (data: number) => <a href="/">{data}</a>
	},
	{
		title: 'Math Score',
		dataIndex: 'math',
		sorter: {
			compare: (a: SourceDataType, b: SourceDataType) => b.math - a.math
		},
		render: (data: number) => <h5>{data}</h5>
	},
	{
		title: 'English Score',
		dataIndex: 'english',
		sorter: {
			compare: (a: SourceDataType, b: SourceDataType) => b.english - a.english
		},
		render: (data: number) => <Button>{data}</Button>
	}
];

const BasicComplete = () => {
	return <Table data={data} columns={columns} />;
};
const sortComplete = () => {
	return <Table data={data} columns={columns} sorted />;
};
const paginationComplete = () => {
	return <Table data={data} columns={columns} pagination />;
};
const pageSortComplete = () => {
	return <Table data={data} columns={columns} pagination sorted />;
};
const renderTemplateComplete = () => {
	return <Table data={data} columns={columnsRender} sorted />;
};
const checkboxComplete = () => {
	const data = [
		{
			key: '1',
			lesson: 'react',
			checked: true
		},
		{
			key: '2',
			lesson: 'vue',
			checked: false
		},
		{
			key: '3',
			lesson: 'math',
			checked: false
		},
		{
			key: '4',
			lesson: 'english',
			checked: false
		}
	];
	const [state, setState] = useState<SourceDataType[]>(data);
	const columns = [
		{
			title: (
				<div>
					<Checkbox
						data={['']}
						parentState={
							state.filter((v) => v.checked === true).length === data.length
								? [true]
								: [false]
						}
						style={{ boxShadow: 'none', background: 'none' }}
						text={false}
						parentSetStateCallback={(e: boolean[], i: number) => {
							let tmp = state.map((v) => {
								v.checked = !e[0];
								return v;
							});
							setState([...tmp]);
						}}
					/>
				</div>
			),
			dataIndex: 'count',
			render: (_val: number, row: SourceDataType) => (
				<Checkbox
					data={['']}
					parentState={[state.find((v) => v.key === row.key)!.checked]}
					style={{ boxShadow: 'none', background: 'none' }}
					text={false}
					parentSetStateCallback={(e: boolean[]) => {
						let tmp = state;
						tmp.find((v) => v.key === row.key)!.checked = !e[0];
						setState([...tmp]);
					}}
				/>
			)
		},
		{
			title: '商品',
			dataIndex: 'lesson',
			render: (val: string) => (
				<>
					<p>{val}</p>
				</>
			)
		},
		{
			title: '操作',
			dataIndex: 'option',
			render: () => (
				<PopConfirm
					title="是否要删除商品?"
					directions="LEFT"
					callback={(v: boolean) => {}}
					okText="是"
					cancelText="否"
					wrapperNode={
						<Button size="sm" btnType="danger">
							删除
						</Button>
					}
				></PopConfirm>
			)
		}
	];
	return <Table columns={columns} data={data}></Table>;
};

storiesOf('Display/Table 表格', module)
	.add('基本使用', BasicComplete, {
		info: {
			text: `
## 基本使用
传表头和数据即可使用

## 数据格式

~~~js
export const columns = [
  {
      title: 'Name',
      dataIndex: 'name',
  },
  {
      title: 'Chinese Score',
      dataIndex: 'chinese',
      sorter: {
      compare: (a:SourceDataType, b:SourceDataType) => b.chinese-a.chinese ,
      },
  },
  {
      title: 'Math Score',
      dataIndex: 'math',
      sorter: {
      compare: (a:SourceDataType, b:SourceDataType) =>b.math- a.math ,
      },
  },
  {
      title: 'English Score',
      dataIndex: 'english',
      sorter: {
      compare: (a:SourceDataType, b:SourceDataType) => b.english-a.english ,
      },
  },
];
export const data = [
  {
      key: '1',
      name: 'John Brown',
      chinese: 55,
      math: 60,
      english: 70,
  },
  {
      key: '2',
      name: 'Jim Green',
      chinese: 98,
      math: 66,
      english: 89,
  },
  {
      key: '3',
      name: 'Joe Black',
      chinese: 78,
      math: 90,
      english: 70,
  },
  {
      key: '4',
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89,
  },
];
~~~

## 组件使用

~~~js
<Table data={data} columns={columns}/>
~~~
        `,
			source: false
		}
	})
	.add('排序功能', sortComplete, {
		info: {
			text: `
## 排序功能 [sorted]

需要表头数据传sorter对象(含compare函数)

## 组件使用

~~~js
<Table data={data} columns={columns} sorted/>
~~~
        `,
			source: false
		}
	})
	.add('分页功能', paginationComplete, {
		info: {
			text: `
## 分页功能

传pagination属性为true即可

## 组件使用

~~~js
<Table data={data} columns={columns} pagination/>
~~~
        `,
			source: false
		}
	})
	.add('分页+排序功能', pageSortComplete, {
		info: {
			text: `
## 分页排序功能

传pagination属性为true，sorted属性为true即可

## 组件使用

~~~js
<Table data={data} columns={columns} pagination sorted/>
~~~
        `,
			source: false
		}
	})
	.add('使用模版render', renderTemplateComplete, {
		info: {
			text: `
## 使用模版render

表头字段加入render即可使用自定义模板渲染

## 组件使用

~~~js
const columnsRender = [
  {
      title: 'Name',
      dataIndex: 'name',
  },
  {
      title: 'Chinese Score',
      dataIndex: 'chinese',
      sorter: {
      compare: (a:SourceDataType, b:SourceDataType) => b.chinese-a.chinese ,
      },
      render:(data:number)=><a href='/'>{data}</a>
  },
  {
      title: 'Math Score',
      dataIndex: 'math',
      sorter: {
      compare: (a:SourceDataType, b:SourceDataType) =>b.math- a.math ,
      },
      render:(data:number)=><h5>{data}</h5>
  },
  {
      title: 'English Score',
      dataIndex: 'english',
      sorter: {
      compare: (a:SourceDataType, b:SourceDataType) => b.english-a.english ,
      },
      render:(data:number)=><Button>{data}</Button>
  },
];

<Table data={data} columns={columnsRender} sorted/>
~~~
        `,
			source: false
		}
	})
	.add('checkbox封装Demo', checkboxComplete, {
		info: {
			text: `
## 结合Checkbox，Table 自定义渲染的demo

## 组件使用

~~~js
<TableCheckbox />
\n
function TableCheckbox() {
	const data = [
		{
			key: "1",
			lesson: "react",
			checked: true
		},
		{
			key: "2",
			lesson: "vue",
			checked: false
		},
		{
			key: "3",
			lesson: "math",
			checked: false
		},
		{
			key: "4",
			lesson: "english",
			checked: false
		}
	];
	const [state, setState] = useState<SourceDataType[]>(data);
	const columns = [
		{
			title: (
				<div>
					<Checkbox
						data={[""]}
						parentState={
							state.filter((v) => v.checked === true).length === data.length
								? [true]
								: [false]
						}
						style={{ boxShadow: "none", background: "none" }}
						text={false}
						parentSetStateCallback={(e: boolean[], i: number) => {
							let tmp = state.map((v) => {
								v.checked = !e[0];
								return v;
							});
							setState([...tmp]);
						}}
					/>
				</div>
			),
			dataIndex: "count",
			render: (_val: number, row: SourceDataType) => (
				<Checkbox
					data={[""]}
					parentState={[state.find((v) => v.key === row.key)!.checked]}
					style={{ boxShadow: "none", background: "none" }}
					text={false}
					parentSetStateCallback={(e: boolean[]) => {
						let tmp = state;
						tmp.find((v) => v.key === row.key)!.checked = !e[0];
						setState([...tmp]);
					}}
				/>
			)
		},
		{
			title: "商品",
			dataIndex: "lesson",
			render: (val: string) => (
				<>
					<p>{val}</p>
				</>
			)
		},
		{
			title: "操作",
			dataIndex: "option",
			render: () => (
				<PopConfirm
					title="是否要删除商品?"
					directions="LEFT"
					callback={(v: boolean) => {}}
					okText="是"
					cancelText="否"
					wrapperNode={
						<Button size="sm" btnType="danger">
							删除
						</Button>
					}
				></PopConfirm>
			)
		}
	];
	return <Table columns={columns} data={data}></Table>;
}
~~~
        `,
			source: false
		}
	});
