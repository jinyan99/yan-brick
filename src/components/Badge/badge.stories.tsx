import React,{useState} from 'react';
import {storiesOf} from '@storybook/react';
import {Badge} from './badge';
import {Button} from '../Button/button';
import {Icon} from '../Icon/icon';


const BasicComplete = () => {
	return (<>
		<Badge count={100} ><Button>count100</Button></Badge>
        <Badge count={99}></Badge>
         <Badge count={1} type={'primary'}></Badge>
         <Badge count={1000} type={'info'}></Badge>
         <Badge count={<Icon theme='danger' icon ={'coffee'}></Icon>} type={'dark'}></Badge>
          <Badge count={'99+'} type={'danger'}></Badge>
          <Badge dot={true}><Button >只显示圆点</Button></Badge>
        <Badge count={<Icon theme='primary' icon ={'spinner'} pulse></Icon>} type={'danger'}><div className='yanbrick-list-item' style={{height:'100px',width:'200px'}}></div></Badge>
	</>);
};
const sizeComplete = () => {
    const [numberObj,setNumber]=useState({
        trueNumber:0,
        displayNumber:'0'
    })
    const [visible,setVisible]=useState(false)
    const addValidate=(number:number)=>{
        if(!visible)setVisible(true)
        if(number+1>99){
            setNumber({
                trueNumber:numberObj.trueNumber+1,
                displayNumber:'99+'
            })
        }else{
            setNumber({
                trueNumber:numberObj.trueNumber+1,
                displayNumber:numberObj.trueNumber+1+''
            })
        }
    }
    const minusValidate=(number:number)=>{
        if(number-1<=0){
            setVisible(false)
            setNumber({trueNumber:0,displayNumber:'0'})
        }else if(number>0&&number-1<=99){
            setNumber({
                trueNumber:numberObj.trueNumber-1,
                displayNumber:numberObj.trueNumber-1+''
            })
        }else{
            setNumber({
                trueNumber:numberObj.trueNumber-1,
                displayNumber:'99+'
            })
        }
    }
    return(
        <div>
            <Badge count={numberObj.displayNumber} visible={visible} type='danger'>
            <Button size='lg'><Icon icon='user' theme='dark' /></Button>
            </Badge>
            <hr></hr>
            <div>点击按钮控制角标数字增减，99以上会变成99+：</div>
            <Button onClick={()=>addValidate(numberObj.trueNumber)}>数字加一</Button>
            &nbsp;
            <Button onClick={()=>minusValidate(numberObj.trueNumber)}>数字减一</Button>
        </div>
    )
};

storiesOf('Display/Badge 徽章', module)
    .add('基本使用', BasicComplete,{info:{text:'badge可以单独使用，也可以包裹元素使用，包裹元素会移动到元素右上角。'}})
    .add('大小配置', sizeComplete,{info:{
      text:`
- 控制上下限等行为需要自行封装，封装示例:👇

~~~js
<BadgeExample></BadgeExample>

export function BadgeExample(){
  const [numberObj,setNumber]=useState({
      trueNumber:0,
      displayNumber:'0'
  })
  const [visible,setVisible]=useState(false)
  const addValidate=(number:number)=>{
      if(!visible)setVisible(true)
      if(number+1>99){
          setNumber({
              trueNumber:numberObj.trueNumber+1,
              displayNumber:'99+'
          })
      }else{
          setNumber({
              trueNumber:numberObj.trueNumber+1,
              displayNumber:numberObj.trueNumber+1+''
          })
      }
  }
  const minusValidate=(number:number)=>{
      if(number-1<=0){
          setVisible(false)
          setNumber({trueNumber:0,displayNumber:'0'})
      }else if(number>0&&number-1<=99){
          setNumber({
              trueNumber:numberObj.trueNumber-1,
              displayNumber:numberObj.trueNumber-1+''
          })
      }else{
          setNumber({
              trueNumber:numberObj.trueNumber-1,
              displayNumber:'99+'
          })
      }
  }
  return(
      <div>
          <Badge count={numberObj.displayNumber} visible={visible} type='danger'>
          <Button size='lg'><Icon icon='user' theme='dark' /></Button>
          </Badge>
          <hr></hr>
          <div>点击按钮控制角标数字增减，99以上会变成99+：</div>
          <Button onClick={()=>addValidate(numberObj.trueNumber)}>数字加一</Button>
          &nbsp;
          <Button onClick={()=>minusValidate(numberObj.trueNumber)}>数字减一</Button>
      </div>
  )
}
~~~
      `,source: false
    }})