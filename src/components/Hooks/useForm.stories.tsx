import React from 'react';
import {storiesOf} from '@storybook/react';


storiesOf('HOOKS/useForm Form表单验证Hook', module)
    .addParameters({
        info: {
            text: `
                # useForm Form表单验证Hook
                ***
                **Tips👇: **组件内引入，第一个参数为组件内state,第二个参数为需要延迟时间。依赖项需改为返回值。
                - 输入props: 就一个参数args: Array<{name字段:string,validate:[{validate: fn, message: string}]}>类型
                - 输出参数：也是仅一个参数为长度为4的数组类型含：
                    1. **handleSubmit**: 提交事件的处理函数(可以给出验证状态总集合值)
                    2. **callbackObj**: 字段校验函数对象类型--放在用户表单控件的onChange事件中伴随onChange事件触发对应字段校验函数
                    3. **validate**: 校验错误信息所有字段的显示集合{各字段:[message]} 直接用于用户根据信息展示错误提示
                    4. **blurObj**: 字段校验函数对象类型--放在用户表单控件的onBlur事件中伴随onBlur事件触发对应字段校验函数

                ~~~js
                import {useForm, Input, Form, Checkbox, Button} from 'yan-brick';
    \n
                function FormExample(){
                    const [handleSubmit,callbackObj,validate,blurObj]=useForm([ 
                        {
                            name:'input1',
                            validate:[{validate:(e)=>e!=='',message:'用户名不能为空'}]
                        },
                        {
                            name: 'input2',
                            validate:[
                                {validate:(e)=>e!=='',message:'密码不为空'},
                                {validate:(e)=>e.length>2&&e.length<7,message:'密码必须大于2位或者小于7位'}
                            ]
                        },
                        {
                            name:'checkbox',
                            validate:[{validate:(e)=>e.filter((v:boolean)=>v).length===3,message:'必须3个都选上'}],
                        }]);

                    const onSubmit=(data:any)=>console.log(data);

                    return(
                        <Form >
                            <Input prepend='用户名' onChange={(e)=>callbackObj.input1(e.target.value)} 
                                onBlur={(e:React.FocusEvent<HTMLInputElement>)=>{blurObj.input1(e.target.value)}} >
                            </Input>
                            <div className='bigbear-form-validate'>{validate.input1.map((v:string)=>v)}</div>
                            <Input prepend='密码' type='password' onChange={(e)=>callbackObj.input2(e.target.value)}
                                onBlur={(e:React.FocusEvent<HTMLInputElement>)=>{blurObj.input2(e.target.value)}}
                            >
                            </Input>
                            <div className='bigbear-form-validate'>{validate.input2.map((v:string,i:number)=><div key={i}>{v}</div>)}</div>
                            <Checkbox data={['check1', 'check2', 'check3']}
                                callback={(e)=>callbackObj.checkbox(e)}>
                            </Checkbox>
                            <div className='bigbear-form-validate'>{validate.checkbox.map((v:string)=>v)}</div>
                            <br></br>
                            <Button onClick={(e)=>{
                                e.preventDefault();
                                handleSubmit(onSubmit)
                            }} >提交</Button>
                        </Form>
                    )
                }
                ~~~`},
        inline: true
    })
    .add('介绍',()=>(<br/>))

