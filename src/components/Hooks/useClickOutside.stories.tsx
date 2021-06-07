import React from 'react';
import {storiesOf} from '@storybook/react';


storiesOf('Hooks/useClickOutside 组件外点击判定hook', module)
    .addParameters({
        info: {
            text: `
                # useClickOutside 组件外点击判定hook
                ***
                **Tips👇：**组件内引入，第一个参数为ref实例，也就是要判定的dom，第二个参数为如果在组件外点击需要执行的函数。
                ~~~js
                useClickOutside(Ref,()=>setDropDown([]))
                ~~~`},
        inline: true
    })
    .add('介绍',()=>(<br/>))

