import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Input } from './input'

// 受控组件case编写
const ControlledInput = () => {
  const [value, setValue] = useState('')
  return <Input value={value} defaultValue={value} setValueCallback={(v)=>{setValue(v)}}/>
}
// 默认组件
const defaultInput = () => (
  <>
  <Input
    style={{width: '300px'}}
    placeholder="placeholder"
    onChange={action('changed')}
  />
  <ControlledInput />
  </>
)
const disabledInput = () => (
  <Input
    style={{width: '300px'}}
    placeholder="disabled input"
    disabled 
  />
)

const iconInput = () => (
  <Input
    style={{width: '300px'}}
    placeholder="input with icon"
    icon="search"
  />
)

const sizeInput = () => (
  <>
    <Input
      style={{width: '300px'}}
      defaultValue="large size"
      size="lg"
    />
    <Input
      style={{width: '300px'}}
      placeholder="small size"
      size="sm"
    />
  </>
)

const pandInput = () => (
  <>
    <Input
      style={{width: '300px'}}
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input
      style={{width: '300px'}}
      defaultValue="google"
      append=".com"
    />
  </>
)

storiesOf('ENTRY/Input 输入框', module)
  .add('Input', defaultInput, {
    info: {
      text:  `
      ~~~js
       受控组件case编写
      const ControlledInput = () => {
        const [value, setValue] = useState('')
        return <Input value={value} defaultValue={value} setValueCallback={(v)=>{setValue(v)}}/>
      }
      // 默认组件
      const defaultInput = () => (
        <>
        <Input
          style={{width: '300px'}}
          placeholder="placeholder"
          onChange={action('changed')}
        />
        <ControlledInput />
        </>
      )
      ~~~
      `, source: false
    }
  })
  .add('被禁用的 Input', disabledInput)
  .add('带图标的 Input', iconInput)
  .add('大小不同的 Input', sizeInput)
  .add('带前后缀的 Input', pandInput)
