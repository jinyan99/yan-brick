import React,{useState} from 'react';
import {storiesOf} from '@storybook/react';
import Button from '../Button';
import {Modal} from './modal';
import Icon from '../Icon';


const BasicComplete = () => {
  const [state, setState] = useState(false);
	return (
    <div>
      <Modal
        setState={setState}
        visible={state}
        callback={v=>console.log(v)}
      >
        <p>这块是一些表单内容</p>
      </Modal>
      <Button onClick={()=>setState(!state)}>基本使用</Button>
    </div>
	);
};
const MaskComplete = () => {
  const [state, setState] = useState(false);
	return (
    <div>
      <Modal
        setState={setState}
        visible={state}
        callback={v=>console.log(v)}
        maskClose={false}
      >
        <p>这块是一些表单内容</p>
      </Modal>
      <Button onClick={()=>setState(!state)}>点击mask不关闭</Button>
    </div>
	);
};
const ConfirmComplete = () => {
  const [state, setState] = useState(false);
	return (
    <div>
      <Modal
        setState={setState}
        visible={state}
        callback={v=>console.log(v)}
        okText="ok"
        cancelText="cancel"
      >
        <p>这块是一些表单内容</p>
      </Modal>
      <Button onClick={()=>setState(!state)}>改变confirm文本</Button>
    </div>
	);
};
const CustomComplete = () => {
  const [state, setState] = useState(false);
	return (
    <div>
      <Modal
        setState={setState}
        visible={state}
        callback={v=>console.log(v)}
        okText="ok"
        cancelText="cancel"

      >
        <p>这块是一些表单内容</p>
        <div style={{display:'flex', justifyContent:'flex-end'}}>
          <Button btnType={"primary"}>自定义ok</Button>
          <Button btnType="default">自定义取消</Button>
        </div>
      </Modal>
      <Button onClick={()=>setState(!state)}>自定义按钮</Button>
    </div>
	);
};
const CustomSizeComplete = () => {
  const [state, setState] = useState(false);
	return (
    <div>
      <Modal
        setState={setState}
        visible={state}
        callback={v=>console.log(v)}
        okText="ok"
        cancelText="cancel"
        title={<p><Icon icon="info-circle"/>带上图标标题</p>}
        style={{top: 40, width: 800}}
        closeButton={false}
        confirm={false}
      >
        <p>这块是一些表单内容</p>
        <div style={{display:'flex', justifyContent:'flex-end'}}>
          <Button btnType={"primary"}>自定义ok</Button>
          <Button btnType="default">自定义取消</Button>
        </div>
      </Modal>
      <Button onClick={()=>setState(!state)}>自定义大小</Button>
    </div>
	);
};

storiesOf('REACTION/Modal 模态框', module)
    .add('基本使用', BasicComplete, {
      info: {
        text: `基本使用: 父组件做个state控制开关即可`
      }
    })
    .add('点击mask不关闭', MaskComplete)
    .add('改变confirm文本', ConfirmComplete)
    .add('自定义按钮', CustomComplete, {
      info: {
        text: `不使用默认按钮可以自己在children里传，自己需要处理关闭状态`
      }
    })
    .add('自定义大小', CustomSizeComplete, {
      info: {
        text: `设置style即可自定义大小，主要是靠top定位位置，width定位宽度。
        \n 自己需要处理关闭状态`
      }
    })