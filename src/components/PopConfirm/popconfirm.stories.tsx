import React,{useState} from 'react';
import {storiesOf} from '@storybook/react';
import {Popconfirm} from './popconfirm';
import Icon from '../Icon';
import Button from '../Button';


const BasicComplete = () => {
	return (
    <div style={{paddingTop: 100}}>
      <Popconfirm
        title={'传包裹元素，标题即可工作'}
        callback={(v)=>console.log(v)}
        wrapperNode={<Button>基本使用</Button>}
      />
    </div>
	);
};
const MaskComplete = () => {
  const [state, setState] = useState(false);
	return (
    <div>
      <div style={{display:'flex',justifyContent:'center'}}>
            <div style={{display:'flex',alignItems:'center'}}>
                <div>
                    <div>
                    <Popconfirm 
                    directions='LT'
                    wrapperNode={ <Button>LT</Button>}
                    title={'Are you sure to do this?'} >
                    </Popconfirm>
                    </div>
                    <div>
                    <Popconfirm 
                    directions='LEFT'
                    wrapperNode={ <Button>LEFT</Button>}
                    title={'Are you sure to do this?'} >
                    </Popconfirm>
                    </div>
                    <div>
                    <Popconfirm 
                    directions='LB'
                    wrapperNode={ <Button>LB</Button>}
                    title={'Are you sure to do this?'} >
                    </Popconfirm>
                    </div>
                </div>  
                <div>
                    <div style={{height:'150px',width:'150px',display:'flex',justifyContent:'center'}}>
                    <Popconfirm 
                    directions='TL'
                    wrapperNode={ <Button>TL</Button>}
                    title={'Are you sure to do this?'} >
                    </Popconfirm>
                    <Popconfirm 
                    wrapperNode={ <Button>TOP</Button>}
                    title={'Are you sure to do this?'} >
                    </Popconfirm>
                    <Popconfirm 
                    directions='TR'
                    wrapperNode={ <Button>TR</Button>}
                    title={'Are you sure to do this?'} >
                    </Popconfirm>
                    </div>
                    <div>
                    <Popconfirm 
                    directions='BL'
                    wrapperNode={ <Button>BL</Button>}
                    title={'Are you sure to do this?'} >
                    </Popconfirm>
                    <Popconfirm 
                    directions='BOTTOM'
                    wrapperNode={ <Button>BOTTOM</Button>}
                    title={'Are you sure to do this?'} >
                    </Popconfirm>
                    <Popconfirm 
                    directions='BR'
                    wrapperNode={ <Button>BR</Button>}
                    title={'Are you sure to do this?'} >
                    </Popconfirm>
                    </div>
                </div>  
                <div>
                    <div>
                    <Popconfirm 
                    directions='RT'
                    wrapperNode={ <Button>RT</Button>}
                    title={'Are you sure to do this?'} >
                    </Popconfirm>
                    </div>
                    <div>
                    <Popconfirm 
                    directions='RIGHT'
                    wrapperNode={ <Button>RIGHT</Button>}
                    title={'Are you sure to do this?'} >
                    </Popconfirm>
                    </div>
                    <div>
                    <Popconfirm 
                    directions='RB'
                    wrapperNode={ <Button>RB</Button>}
                    title={'Are you sure to do this?'} >
                    </Popconfirm>
                    </div>
                </div>
            </div>
      </div>
    </div>
	);
};
const ConfirmComplete = () => {
    const [state,setState]=useState(false);
    return (
        <div style={{paddingTop: 100}}>
            <Popconfirm
                wrapperNode={<Button onClick={()=>setState(!state)}>父组件控制状态</Button>}
             title='balabalabalabala' visible={state} setState={setState}></Popconfirm>
        </div>
    )
};
const CustomComplete = () => {
	return (
    <div style={{paddingTop: 100}}>
      <Popconfirm
        click={false}
        hover={true}
        closeButton={false}
        confirm={false}
        wrapperNode={<Button>hover</Button>}
        title='jinyan标题'
      >
        jinyan
      </Popconfirm>
    </div>
	);
};

storiesOf('REACTION/Popconfirm 气泡弹出框', module)
    .add('基本使用', BasicComplete, {
      info: {
        text: `传包裹元素，标题即可工作。callback可拿回调。

        此组件基于modal进行封装，modal的属性都可以配置。

        由于拟物风格使用modal时加上气泡不美观，所以放弃了气泡样式。气泡样式另外再做。`
      }
    })
    .add('方位directions', MaskComplete, {info:{text:'传入对应字母即可定位于对应位置,默认是TOP'}})
    .add('状态转移', ConfirmComplete, {info:{text:'必传visible和setState使得状态由父组件控制\n状态不再由组件自己维护，可以适用于更多复杂环境'}})
    .add('hover', CustomComplete, {
      info: {
        text: `组件内控制状态时，默认只进行开关操作。click跟hover有冲突，如果要更复杂的定制，使用状态转移。将hover只绑于需要hover的元素会是个好选择。`
      }
    })