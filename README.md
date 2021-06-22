# yan-brick

yan-brick是个人制作的拟物化小型轻量级ui库

```javascript
                                                88                       88              88
                                                88                       ""              88
                                                88                                       88
8b       d8  ,adPPYYba,  8b,dPPYba,             88,dPPYba,   8b,dPPYba,  88   ,adPPYba,  88   ,d8
`8b     d8'  ""     `Y8  88P'   `"8a  aaaaaaaa  88P'    "8a  88P'   "Y8  88  a8"     ""  88 ,a8"
 `8b   d8'   ,adPPPPP88  88       88  """"""""  88       d8  88          88  8b          8888[
  `8b,d8'    88,    ,88  88       88            88b,   ,a8"  88          88  "8a,   ,aa  88`"Yba,
    Y88'     `"8bbdP"Y8  88       88            8Y"Ybbd8"'   88          88   `"Ybbd8"'  88   `Y8a
    d8'
   d8'

```

![npm](https://img.shields.io/npm/v/yan-brick)
![npm bundle size](https://img.shields.io/bundlephobia/min/yan-brick)
![npm](https://img.shields.io/npm/dt/yan-brick)
[![Build Status](https://travis-ci.com/yehuozhili/yan-brick.svg?branch=master)](https://travis-ci.com/yehuozhili/yan-brick)
[![Coverage Status](https://coveralls.io/repos/github/yehuozhili/yan-brick/badge.svg?branch=master)](https://coveralls.io/github/yehuozhili/yan-brick?branch=master)

✨ 特性


- 📕 详细的文档与介绍
- 🎨 使用富有特色的Neumorphism拟物化风格
- 📦 开箱即用的高质量 React 组件
- 🔥 使用 TypeScript 开发，提供完整的类型定义文件


<br/>

## 安装
使用 npm 或 yarn 安装

```
$ npm install yan-brick --save
```

## 引入样式

```
import 'yan-brick/dist/index.css';
```
## 导入组件

```
import {componentName} from 'yan-brick';
```

## 在线文档

https://jinyan99.github.io/yan-brick/

<br/>


## 本地文档

下载代码，npm安装，使用`npm run storybook`即可获得本地文档。
```
git clone https://github.com/jinyan99/yan-brick.git
npm install 
npm run storybook
```

## 使用scss

scss放入bigbear-ui/dist/esm/styles/index.scss。
```
@import "yan-brick/dist/esm/styles/index.scss";
```



## @TODO  使用yan-brick-cli

目前暂时只制作了一个模板供下载。如果需要react-router+redux+thunk以及mock数据可以使用此模板快速开发。

https://www.npmjs.com/package/yan-brick-cli

```
npm i yan-brick-cli -g
```

## 项目demo

http://94.191.80.37:6698/#/

<br/>

## 制作初衷

制作一个属于自己的组件库应该是每个前端人员都有的梦想，有时候自己写出某些好的组件也想记录下来。

<br/>

##  设计理念

新拟物风格早就存在，但是这种风格受限性很强，特别是对于背景色的要求，因为只有通过背景色制造的高光和加深才能制作出完美的凸起和凹下。

最初想法可能是做个浅色的风格和一个深色的风格，但是后来觉得，这样定制化过强，大部分时候，场景都是比较复杂的，也并不需要特别完美的定制效果，于是我将阴影效果进行改造，做出个比较通用的效果。

这种风格最适合做小工具，同时组件库体积又小，避免占太多空间。