import React from 'react';
import {storiesOf} from '@storybook/react';
import Linkage from './linkage';

const DataSource = [
	{
		id: 1,
		domain: '一级域1',
		children: [
			{
				id: 11,
				domain: '二级域11',
				children: [{ id: 111, domain: '三级域111' }]
			},
			{
				id: 12,
				domain: '二级域12',
				children: [
					{
						id: 112,
						domain: '三级域112',
						children: [{ id: 1111, domain: '四级域1111' }]
					}
				]
			}
		]
	},
	{
		id: 2,
		domain: '一级域2',
		children: [
			{
				id: 21,
				domain: '二级域21',
				children: [{ id: 211, domain: '三级域211' }]
			},
			{
				id: 22,
				domain: '二级域22',
				children: [{ id: 212, domain: '三级域212' }]
			}
		]
	},
	{
		id: 3,
		domain: '一级域3',
		children: [
			{
				id: 31,
				domain: '二级域31',
				children: [{ id: 311, domain: '三级域311' }]
			},
			{
				id: 32,
				domain: '二级域32',
				children: [{ id: 312, domain: '三级域312' }]
			}
		]
	},
	{
		id: 4,
		domain: '一级域4',
		children: [
			{
				id: 41,
				domain: '二级域41',
				children: [{ id: 411, domain: '三级域411' }]
			},
			{
				id: 42,
				domain: '二级域42',
				children: [{ id: 412, domain: '三级域412' }]
			}
		]
	},
	{
		id: 5,
		domain: '一级域5',
		children: [
			{
				id: 51,
				domain: '二级域51',
				children: [{ id: 511, domain: '三级域511' }]
			},
			{
				id: 52,
				domain: '二级域52',
				children: [{ id: 512, domain: '三级域512' }]
			}
		]
	}
];
const BasicComplete = () => {
	return (
		<Linkage dataSource={DataSource}/>
	);
};


storiesOf('Display/Linkage 级联组件', module)
    .add('基本使用', BasicComplete, {
      info: {
        text: `
        ~~~js
        const DataSource = [
          {
            id: 1,
            domain: '一级域1',
            children: [
              {
                id: 11,
                domain: '二级域11',
                children: [{ id: 111, domain: '三级域111' }]
              },
              {
                id: 12,
                domain: '二级域12',
                children: [
                  {
                    id: 112,
                    domain: '三级域112',
                    children: [{ id: 1111, domain: '四级域1111' }]
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            domain: '一级域2',
            children: [
              {
                id: 21,
                domain: '二级域21',
                children: [{ id: 211, domain: '三级域211' }]
              },
              {
                id: 22,
                domain: '二级域22',
                children: [{ id: 212, domain: '三级域212' }]
              }
            ]
          },
          {
            id: 3,
            domain: '一级域3',
            children: [
              {
                id: 31,
                domain: '二级域31',
                children: [{ id: 311, domain: '三级域311' }]
              },
              {
                id: 32,
                domain: '二级域32',
                children: [{ id: 312, domain: '三级域312' }]
              }
            ]
          },
          {
            id: 4,
            domain: '一级域4',
            children: [
              {
                id: 41,
                domain: '二级域41',
                children: [{ id: 411, domain: '三级域411' }]
              },
              {
                id: 42,
                domain: '二级域42',
                children: [{ id: 412, domain: '三级域412' }]
              }
            ]
          },
          {
            id: 5,
            domain: '一级域5',
            children: [
              {
                id: 51,
                domain: '二级域51',
                children: [{ id: 511, domain: '三级域511' }]
              },
              {
                id: 52,
                domain: '二级域52',
                children: [{ id: 512, domain: '三级域512' }]
              }
            ]
          }
        ];
        const BasicComplete = () => {
          return (
            <Linkage dataSource={DataSource}/>
          );
        };
        ~~~
        `, source: false
      }
    })