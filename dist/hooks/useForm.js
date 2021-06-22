var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useMemo, useState } from 'react';
export var useForm = function (args) {
    /** 用户数据的验证状态总集合 {字段: 布尔值} */
    var _a = useState({}), state = _a[0], setState = _a[1];
    /** 校验message显示集合-初始为初始化args所有字段值全为空数组-{字段: 对应字段未通过时的错误信息集合数组}*/
    var _b = useState(function () { return (args.reduce(function (p, n) {
        p[n.name] = [];
        return p;
    }, {})); }), validate = _b[0], setValidata = _b[1];
    /** 失焦后验证状态集合 {字段: 布尔值}*/
    var _c = useState({}), blurData = _c[0], setBlurData = _c[1];
    /**
     * 返回数组
     * 0位: obj字段校验函数对象
     * 1位: blurObj字段校验函数对象
     * 字段校验函数对象都是基于用户传入的args抽象出的
     */
    var returnObj = useMemo(function () {
        // 都是{各个字段: 对应校验函数类型}
        // onChange事件后走的obj校验函数逻辑，onBlur事件后走的blurObj校验函数逻辑(这个内部不用更新state总状态集合简单校验下就行，onChange的需要更新state总状态集合的)--两个事件校验函数是独立的啊
        var obj = {};
        var blurObj = {};
        // 遍历args中用户定义的每个对象o中属性，进行转化抽象进临时obj对象blurObj对象中(以[o.name]: fn(向上封装的一个验证函数))
        args.forEach(function (o) {
            obj[o.name] = function (e) {
                var _a, _b;
                var isPass = false;
                if (o.validate /*是个数组*/) {
                    var resArr_1 = [];
                    try {
                        o.validate.forEach(function (v) {
                            isPass = v.validate(e);
                            // @XXX 循环验证某字段变更通过状态逻辑需要再优化
                            if (!isPass) {
                                // 校验未通过为false时，将错误信息message放进resArr中
                                resArr_1.push(v.message);
                                throw Error();
                            }
                        });
                    }
                    catch (e) { }
                    setValidata(__assign(__assign({}, validate), (_a = {}, _a[o.name] = resArr_1, _a)));
                }
                ;
                // 校验函数有结果后，需将该字段的通过与否字段-转成布尔类型-更新到state验证状态集合中
                setState(__assign(__assign({}, state), (_b = {}, _b[o.name] = isPass, _b)));
            };
            blurObj[o.name] = function (e) {
                var _a, _b;
                if (blurData && blurData[o.name]) {
                }
                else {
                    var isPass_1 = false;
                    if (o.validate) {
                        var resArr_2 = [];
                        try {
                            o.validate.forEach(function (v) {
                                isPass_1 = v.validate(e);
                                if (!isPass_1) {
                                    // 校验未通过为false时，将错误信息message放进resArr中
                                    resArr_2.push(v.message);
                                    throw Error();
                                }
                            });
                        }
                        catch (e) { }
                        setValidata(__assign(__assign({}, validate), (_a = {}, _a[o.name] = resArr_2, _a)));
                    }
                    setBlurData(__assign(__assign({}, blurData), (_b = {}, _b[o.name] = isPass_1, _b)));
                }
            };
        });
        return [obj, blurObj];
    }, [args, blurData, state, validate]);
    /**
     * form表单的提交事件处理函数
     * @param onSubmit 用户级提交回调逻辑
     */
    var handleSubmit = function (onSubmit) {
        // 将验证状态总集合传给用户onSubmit接口做自定义处理
        onSubmit(state);
    };
    return [handleSubmit, returnObj[0], validate, returnObj[1]];
};
export default useForm;
