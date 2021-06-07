import React from 'react';
import {storiesOf} from '@storybook/react';


storiesOf('HOOKS/useThrottle 组件节流hook', module)
    .addParameters({
        info: {
            text: `
                # useThrottle 组件节流hook
                ***
                **Tips👇：**组件内引入，第一个参数为目标回调,第二个参数为需要延迟时间。
                ~~~js
                import {useThrottle} from 'yan-brick'

                // 节流产物事件执行类函数
                const combinedFunc = useThrottle(scrollFunc, delay!);
                // 下面监听滚动事件再连续滚动都会在delay时间内只执行一次scrollFunc回调
                if (scrollDom) {
                  scrollDom.addEventListener('scroll', combinedFunc)
                }
                ~~~`},
        inline: true
    })
    .add('介绍',()=>(<br/>))

