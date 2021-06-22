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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState } from 'react';
import axios from 'axios';
import UploadList from './uploadList';
import Dragger from './dragger';
export var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, onRemove = props.onRemove, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, beforeUpload = props.beforeUpload, onChange = props.onChange, name = props.name, headers = props.headers, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var handleClick = function () {
        if (fileInput.current) {
            // 记住这种dom手动触发点击事件方法
            fileInput.current.click();
        }
    };
    // handleFileChange ======= START
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                //关于拿到file数据更新到state里的方法位置，尽量减少代码重复，统一放到post里发送前都是校验好的直接统一在post里更新即可就一并处理了，
                //否则在这写的话和下面得多写好几次
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        //1--start
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        // 当前file放在最前面，已存在的file利用展开运算符移后面
        // 下面这种方式在开启多文件上传时会有明明上传的两但实际上传了最后一个的bug，下面这种是异步的，这个post会多次调用，所以异步过来最后会拿到多文件的最后一个文件
        // setFileList([_file, ...fileList]);
        // 改写：
        setFileList(function (prevList) {
            return __spreadArrays([_file], prevList);
        });
        //2--end
        //准备payload数据，收纳file，支持用户自定义data，也一并收纳进formData结构中
        var formData = new FormData();
        formData.append(name || _file.name, _file.raw);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        //开始发送
        axios
            .post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            //当跨域请求时是否提供凭据信息(cookie、HTTP认证及客户端SSL证明等)
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                //1-先算进度值 2- <100的话更新fileList数据状态和百分比并返给用户进度事件进度值
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    console.log(fileList);
                    updateFileList(_file, {
                        percent: percentage,
                        status: 'uploading'
                    });
                    if (onProgress) {
                        onProgress(percentage, _file.raw);
                    }
                }
            }
        })
            .then(function (resp) {
            console.log(resp);
            updateFileList(_file, {
                status: 'success',
                response: resp.data
            });
            if (onSuccess) {
                onSuccess(resp.data, _file.raw);
            }
            if (onChange) {
                onChange(file);
            }
        })
            .catch(function (err) {
            console.log(err);
            updateFileList(_file, { status: 'error', error: err });
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    // 封装的一个特定输入方式的setState函数
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    // handleFileChange ======= END
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    return (React.createElement("div", { className: "viking-upload-component" },
        React.createElement("div", { className: "viking-upload-input", style: { display: 'inline-block' }, onClick: handleClick }, drag ? (React.createElement(Dragger, { onFile: function (files) {
                uploadFiles(files);
            } }, children)) : (children)),
        React.createElement("input", { className: "viking-file-input", style: { display: 'none' }, ref: fileInput, type: "file", onChange: handleFileChange, accept: accept, multiple: multiple }),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: 'file'
};
export default Upload;
