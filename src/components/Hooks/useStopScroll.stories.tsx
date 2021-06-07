import React from 'react';
import {storiesOf} from '@storybook/react';


storiesOf('HOOKS/useStopScroll 阻止body滚动hook', module)
    .addParameters({
        info: {
            text: `
                # useStopScroll 阻止body层滚动hook
                ***
                **Tips👇：**组件内引入，第一个参数为模态框开关状态state,第二个参数为对关闭禁止滚动样式延迟时间,第三个参数为是否启用这个hook开关状态。
                \n 不需要返回值，为全局操作
                ~~~js
                useStopScroll(visible!, 300, stopScroll!);
                ~~~`},
        inline: true
    })
    .add('介绍',()=>(<br/>))

