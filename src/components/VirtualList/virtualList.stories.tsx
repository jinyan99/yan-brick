import React,{useRef, useState, useEffect} from 'react';
import {storiesOf} from '@storybook/react';
import {VirtualList} from './virtualList';


const BasicComplete = () => {
		const cRef = useRef(null)
    const [state,setState]=useState(null)
    useEffect(()=>{
        setState(cRef.current)
    },[]);

    return (
    <div  style={{overflow:'scroll',height:'500px'}} ref={cRef}>
        <VirtualList itemHeight={39} insightNumber={13} scrollDom={state}>
        { new Array(100).fill(1).map((x,y)=>(
            <div className={'yanbrick-list-item'} key={y} >{y}</div>
        ))}
        </VirtualList>
    </div>
	);
};
const multiComplete = () => {
  const cRef = useRef(null)
    const [state,setState]=useState(null)
    useEffect(()=>{
        setState(cRef.current)
    },[])

    return (
    <div  style={{overflow:'scroll',height:'500px'}} ref={cRef}>
        <VirtualList itemHeight={44} insightNumber={22} scrollDom={state} scrollbar={14} rowNumber={2} style={{display:'flex',flexWrap:'wrap'}}>
        { new Array(100).fill(1).map((x,y)=>(
            <div style={{width:'50%'}} key={y}>
            <div className={'yanbrick-list-item'} >{y}</div>
            </div>
        ))}
        </VirtualList>
    </div>
    )
};


storiesOf('Display/VirtualList 虚拟列表', module)
    .add('基本使用', BasicComplete, {
      info: {
        text:`
## 基本使用

- 固定高度的设置 = itemHeight * insightNumber，应符合这个等式。

- scrollDom使用ref或者document.querySelector选择都行，注意获取顺序问题。

- children必须是数组类型的虚拟dom，而不是封装成单一的虚拟dom(比如组件库里List封装方式)，否则无效

- 可视范围可能需要传动态的值，效果不好都可以传大一点。

- 监听scroll做了节流，节流期间停止滚动就会停止渲染，可以设置节流时间。

- 如果有误差想调整滚动条高度，可以设置scrollbar，增大或者减少滚动条高度。

~~~js
function MyVirtualList(){
    const cRef = useRef(null)
    const [state,setState]=useState(null)
    useEffect(()=>{
        setState(cRef.current)
    },[])
    return (
    <div  style={{overflow:'scroll',height:'500px'}} ref={cRef}>
        <VirtualList itemHeight={39} insightNumber={12} scrollDom={state}>
        { new Array(100).fill(1).map((x,y)=>(
            <div className={'bigbear-list-item'} key={y} >{y}</div>
        ))}
        </VirtualList>
    </div>
    )
}
~~~
        `, source: false
      }
    })
    .add('多行元素', multiComplete, {
      info: {
        text: `
        ~~~js
        function DoubleVirtual(){
            const cRef = useRef(null)
            const [state,setState]=useState(null)
            useEffect(()=>{
                setState(cRef.current)
            },[])

            return (
            <div  style={{overflow:'scroll',height:'500px'}} ref={cRef}>
                <VirtualList itemHeight={44} insightNumber={22} scrollDom={state} scrollbar={14} rowNumber={2} style={{display:'flex',flexWrap:'wrap'}}>
                { new Array(100).fill(1).map((x,y)=>(
                    <div style={{width:'50%'}} key={y}>
                    <div className={'bigbear-list-item'} >{y}</div>
                    </div>
                ))}
                </VirtualList>
            </div>
            )
        }
        ~~~
        `, source: false
      }
    })