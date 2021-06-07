import React from 'react';
import {storiesOf} from '@storybook/react';


storiesOf('Hooks/useControlReverse 受控组件状态提升hook', module)
    .addParameters({
        info: {
            text: `
# useControlReverse 受控组件状态提升hook

&nbsp;
## 1、先来解释下，什么叫做状态提升
&nbsp;
### 1.1 场景
现在有个需求，有两个输入框，分别用来输入美元和人民币的数额，要求不管用户输入美元还是人民币，另一个输入框显示出根据汇率计算出的对应的数额
### 1.2 理解
- 每个组件的state是自己特有的，不能传递给其他组件，其他组件也无法更改。但是我们可以把input中值的显示控制权交给input的父组件，即把用户输入的数值通过props传递给它的父亲组件，在更新父组件的状态后，把这个值再传递给input，做个显示就可以了。
- React的状态提升就是用户对子组件操作，子组件不改变自己的状态，通过自己的props把这个操作改变的数据传递给父组件，改变父组件的状态，从而改变受父组件控制的所有子组件的状态，这也是React单项数据流的特性决定的。
- 官方的原话是：共享 state(状态) 是通过将其移动到需要它的组件的最接近的共同祖先组件来实现的。 这被称为“状态提升(Lifting State Up)”

### 1.3 场景还原

~~~js

class Dollar extends React.Component{
  constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
      this.props.dollarChange(event.target.value); //将子组件的值通过props传给父组件
  }

  render() {
      const money = this.props.money;
      const yuan = this.props.yuan;
      const text  = this.props.type == 'd' ? '美元' : '人民币';
      return <fieldset>
          <legend>{text}</legend>
          <input value={money} onChange={this.handleChange}/>    
      </fieldset>
  }
}

class Box extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          dollar: '',
          yuan: '',
      };
      this.dollarInput = this.dollarInput.bind(this);
      this.yuanInput = this.yuanInput.bind(this);
  }

  dollarInput(value) {
      if (parseFloat(value) || value == '' || parseFloat(value) == 0) {
          this.setState({
              dollar:  value,
              yuan:   value == '' ? '' : value * 6.7951
          });
      } else {
          alert('输入值必须为数字。');
      }
  }

  yuanInput(value) {
      if (parseFloat(value) || value == '' || parseFloat(value) == 0) {
          this.setState({
              dollar: value == '' ? '' : value * 0.1472,
              yuan: value,
          });
      } else {
          alert('输入值必须为数字。');
      }
  }
  render() {
      return <div>
          <Dollar type = {'d'} dollarChange = {this.dollarInput} money = {this.state.dollar}/>
          <Dollar type = {'y'} dollarChange = {this.yuanInput} money = {this.state.yuan}/>
      </div>
  }
}

ReactDOM.render(
      <Box />,
      document.getElementById('main')
  );
~~~
&nbsp;
## 2、hook使用
&nbsp;

- **Tips👇：**第一个参数为原state，第二个参数为父组件state，第三个参数为原setState，最后个参数为父组件setState
- 子组件原本使用的🐛value,setValue状态受控，父组件有parentValue,setParentValue状态 两者目前是相互独立的关系
  - 当子组件内部通过该hook得到的state绑定用户受控组件的value属性(替换掉🐛value(:state))时:
  ~~~js
  const [state, setState] = useControlReverse(
      value,
      parentValue,
      setValue,
      setParentValue
  );
  // 其实就是hook做的就是一个状态值的兼容处理
  ~~~
  - 当父组件没传,不需要状态提升至父组件控制时，则hook内部自动判断将state自动指向原value，setState指向原setValue
  - 当父组件传了,需要由父组件控制时，则state自动指向parentValue，setState也自动指向setParentValue
- **应用场景⚽️ :** 如见inputNumber组件源码中封装Input受控组件有用到

\n
~~~js
function useControlReverse<T, F>(value: T, parentValue: T | undefined, setValue: F, setParentValue: F | undefined): [T, F]
~~~`,source: false},
        inline: true
    })
    .add('介绍',()=>(<br/>))

