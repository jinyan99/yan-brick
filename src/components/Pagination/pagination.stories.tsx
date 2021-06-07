import React from 'react';
import {storiesOf} from '@storybook/react';
import {Pagination} from './pagination';


const BasicComplete = () => {
	return (
    <Pagination total={70}></Pagination>
	);
};
const defaultComplete = () => {
	return (
		<Pagination total={200} defaultCurrent={19}></Pagination>
	);
};
const setLengthComplete = () => {
	return (
		<Pagination
          total={2000}
          pageSize={100}
          barMaxSize={10}
          callback={(v)=>console.log(v)}
        />
	);
};

storiesOf('Display/Pagination 分页', module)
    .add('基本使用', BasicComplete,{
      info: {
        text: `
        ## 基本使用

        传入总数即可使用，组件会除以每页条数得到需要展示的分页数，callback获取用户选了第几页。

        <Preview>
        <Story name='pagination'>
            <Pagination total={70}></Pagination>
        </Story>
        </Preview>
        `, source: false
      }
    })
    .add('默认页', defaultComplete,{
      info: {
        text: `
        ## 默认页

        传入总数即可使用，组件会除以每页条数得到需要展示的分页数，callback获取用户选了第几页。

~~~js
        <Pagination total={200} defaultCurrent={19}></Pagination>
~~~
        `, source: false
      }
    })
    .add('设置长度', setLengthComplete,{
      info: {
        text: `
        ## 设置长度

        传入总数即可使用，组件会除以每页条数得到需要展示的分页数，callback获取用户选了第几页。
~~~js
        <Pagination
          total={2000}
          pageSize={100}
          barMaxSize={10}
          callback={(v)=>console.log(v)}
        />
~~~
        `, source: false
      }
    })