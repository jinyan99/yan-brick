import React from 'react';
import { storiesOf } from '@storybook/react';
import Form from './form';
import useForm from '../../hooks/useForm';
import Input from '../Input';
import Checkbox from '../Checkbox';
import Button from '../Button';

const BasicComplete = () => {
	const [handleSubmit, callbackObj, validate, blurObj] = useForm([
		{
			name: 'input1',
			validate: [{ validate: (e) => e !== '', message: '用户名不能为空' }]
		},
		{
			name: 'input2',
			validate: [
				{ validate: (e) => e !== '', message: '密码不为空' },
				{
					validate: (e) => e.length > 2 && e.length < 7,
					message: '密码必须大于2位或者小于7位'
				}
			]
		},
		{
			name: 'checkbox',
			validate: [
				{
					validate: (e) => e.filter((v: boolean) => v).length === 3,
					message: '必须3个都选上'
				}
			]
		}
	]);

	const onSubmit = (data: any) => console.log(data);
	return (
		<Form>
			<Input
				prepend="用户名"
				onChange={(e) => callbackObj.input1(e.target.value)}
				onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
					blurObj.input1(e.target.value);
				}}
			></Input>
			<div className="yanbrick-form-validate">
                {validate.input1?.[0]}
			</div>
			<Input
				prepend="密码"
				type="password"
				onChange={(e) => callbackObj.input2(e.target.value)}
				onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
					blurObj.input2(e.target.value);
				}}
			></Input>
			<div className="yanbrick-form-validate">
				{validate.input2?.[0]}
			</div>
			<Checkbox
				data={['check1', 'check2', 'check3']}
				callback={(e) => callbackObj.checkbox(e)}
			></Checkbox>
			<div className="yanbrick-form-validate">
				{validate.checkbox?.[0]}
			</div>
			<br></br>
			<Button
				onClick={(e) => {
					e.preventDefault();
					handleSubmit(onSubmit);
				}}
			>
				提交
			</Button>
		</Form>
	);
};

storiesOf('ENTRY/Form 表单', module)
	.addParameters({
		info: {
			text: `
            **Tips👇 :** &nbsp; Form组件就是个壳，需要结合useForm使用，useForm相比于传统封装方法灵活性更大，性能更好。\n\n
            **Plans🚩:** &nbsp; 未来版本迭代计划给Form组件内部优化完善，提供更简洁的 API

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
                        <div className='yanbrick-form-validate'>{validate.input1.map((v:string)=>v)}</div>
                        <Input prepend='密码' type='password' onChange={(e)=>callbackObj.input2(e.target.value)}
                            onBlur={(e:React.FocusEvent<HTMLInputElement>)=>{blurObj.input2(e.target.value)}}
                        >
                        </Input>
                        <div className='yanbrick-form-validate'>{validate.input2.map((v:string,i:number)=><div key={i}>{v}</div>)}</div>
                        <Checkbox data={['check1', 'check2', 'check3']}
                            callback={(e)=>callbackObj.checkbox(e)}>
                        </Checkbox>
                        <div className='yanbrick-form-validate'>{validate.checkbox.map((v:string)=>v)}</div>
                        <br></br>
                        <Button onClick={(e)=>{
                            e.preventDefault();
                            handleSubmit(onSubmit)
                        }} >提交</Button>
                    </Form>
                )
            }
            ~~~
            `
		}
	})
	.add('基本使用', BasicComplete);
