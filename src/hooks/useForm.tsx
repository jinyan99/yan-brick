import React,{useMemo, useState} from 'react';

interface ValidataType {
    [key: string]: string[];
}
interface FnObjType {
    [key: string]: (e: any) => void;
}
interface ValidateType {
    validate: (e: any) => boolean;
    message: string
}

export interface UseFormProps {
    name: string;
    validate?: Array<ValidateType>
}
export type UseFormType = [(onSubmit: any) => void, FnObjType, ValidataType, FnObjType];

interface UserData {
    [key: string]: boolean;
}
interface BlurDataType {
    [key: string]: boolean;
}

export const useForm = (args: UseFormProps[]): UseFormType => {
    /** 用户数据的验证状态总集合 {字段: 布尔值} */
    const [state, setState] = useState<UserData>({});
    /** 校验message显示集合-初始为初始化args所有字段值全为空数组-{字段: 对应字段未通过时的错误信息集合数组}*/
    const [validate, setValidata] = useState<ValidataType>(() => (
        args.reduce((p, n) => {
            p[n.name] = [];
            return p;
        }, {} as ValidataType)
    ))
    /** 失焦后验证状态集合 {字段: 布尔值}*/
    const [blurData, setBlurData] = useState<BlurDataType>({});

    /**
     * 返回数组
     * 0位: obj字段校验函数对象
     * 1位: blurObj字段校验函数对象
     * 字段校验函数对象都是基于用户传入的args抽象出的
     */
    const returnObj = useMemo(() => {
        // 都是{各个字段: 对应校验函数类型}
        // onChange事件后走的obj校验函数逻辑，onBlur事件后走的blurObj校验函数逻辑(这个内部不用更新state总状态集合简单校验下就行，onChange的需要更新state总状态集合的)--两个事件校验函数是独立的啊
        const obj: FnObjType = {};
        const blurObj: FnObjType = {};

        // 遍历args中用户定义的每个对象o中属性，进行转化抽象进临时obj对象blurObj对象中(以[o.name]: fn(向上封装的一个验证函数))
        args.forEach((o) => {
            obj[o.name] = (e: any) => {
                let isPass = false;
                if (o.validate/*是个数组*/) {
                    const resArr: string[] = [];
                    try {
                        o.validate.forEach((v) => {
                            isPass = v.validate(e);
                            // @XXX 循环验证某字段变更通过状态逻辑需要再优化
                            if (!isPass) {
                                // 校验未通过为false时，将错误信息message放进resArr中
                                resArr.push(v.message);
                                throw Error();
                            }
                        });
                    }
                    catch(e) {}
                    setValidata({...validate, ...{[o.name]: resArr}});
                };
                // 校验函数有结果后，需将该字段的通过与否字段-转成布尔类型-更新到state验证状态集合中
                setState({...state, ...{[o.name]: isPass}});
            }

            blurObj[o.name] = (e: any) => {
                if (blurData && blurData[o.name]) {
                }
                else {
                    let isPass = false;
                    if (o.validate) {
                        const resArr: string[] = [];
                        try {
                            o.validate.forEach((v) => {
                            isPass = v.validate(e);
                            if (!isPass) {
                                // 校验未通过为false时，将错误信息message放进resArr中
                                resArr.push(v.message);
                                throw Error();
                            }
                        });
                        }
                        catch(e) {}
                        setValidata({...validate, ...{[o.name]: resArr}});
                    }
                    setBlurData({...blurData, ...{[o.name]: isPass}});
                }
            };
        });
        return [obj, blurObj]
    }, [args, blurData, state, validate]);

    /**
     * form表单的提交事件处理函数
     * @param onSubmit 用户级提交回调逻辑
     */
    const handleSubmit = (onSubmit: (s: object) => void) => {
        // 将验证状态总集合传给用户onSubmit接口做自定义处理
        onSubmit(state);
    }

    return [handleSubmit, returnObj[0], validate, returnObj[1]];
}

export default useForm;