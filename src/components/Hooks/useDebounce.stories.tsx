import React from 'react';
import {storiesOf} from '@storybook/react';


storiesOf('HOOKS/useDebounce 组件防抖hook', module)
    .addParameters({
        info: {
            text: `
                # useDebounce 组件防抖hook
                ***
                **Tips👇：**组件内引入，第一个参数为组件内state,第二个参数为需要延迟时间。依赖项需改为返回值。
                ~~~js
                import {useDebounce} from 'yan-brick';

                const [inputValue, setInputValue] = useState(value as string);

                // 加入防抖自定义hook
                const debouncedValue = useDebounce(inputValue, 500);
                //...后续直接使用debouncedValue来代替使用inputValue即可
                ~~~`},
        inline: true
    })
    .add('介绍',()=>(<br/>))

