# 记录下练习各组件的编写思路

<!-- TOC -->

- [记录下练习各组件的编写思路](#记录下练习各组件的编写思路)
  - [组件基础思路](#组件基础思路)
  - [组件新增功能思路](#组件新增功能思路)
  - [数据结构算法表现前端形式](#数据结构算法表现前端形式)
  - [自定义Hook基础思路](#自定义hook基础思路)
  - [Button组件](#button组件)
  - [Menu组件](#menu组件)
  - [MenuItem组件](#menuitem组件)
  - [SubMenu组件](#submenu组件)
  - [Icon组件](#icon组件)
  - [Transition组件](#transition组件)
  - [Input组件](#input组件)
  - [AutoComplete组件](#autocomplete组件)
  - [防抖自定义hook](#防抖自定义hook)
  - [节流自定义hook](#节流自定义hook)
  - [防抖和节流区别对比](#防抖和节流区别对比)
  - [空白处点击自定义hook](#空白处点击自定义hook)
  - [Upload组件](#upload组件)
  - [UploadList组件](#uploadlist组件)
  - [Progress进度条组件](#progress进度条组件)
  - [Dragger拖拽组件](#dragger拖拽组件)
  - [Tabs组件](#tabs组件)
  - [TabPane组件](#tabpane组件)
  - [Select组件](#select组件)
  - [Radio单选组件](#radio单选组件)
  - [Checkbox复选按钮组件](#checkbox复选按钮组件)
  - [MultiSelect多选框组件](#multiselect多选框组件)
  - [useForm自定义hook](#useform自定义hook)
  - [Modal组件](#modal组件)
  - [useStopScroll停止滚动hook](#usestopscroll停止滚动hook)
  - [Popconfirm 气泡消息组件](#popconfirm-气泡消息组件)
  - [Message全局提示组件](#message全局提示组件)
  - [I18n国际化组件](#i18n国际化组件)
  - [List列表组件](#list列表组件)
  - [VirtualList虚拟列表组件](#virtuallist虚拟列表组件)
  - [Pagination 分页组件](#pagination-分页组件)
  - [Table 表格组件](#table-表格组件)
  - [InputNumber计数器组件](#inputnumber计数器组件)
  - [Layout布局](#layout布局)
  - [Tree组件](#tree组件)
  - [多级联动组件](#多级联动组件)

<!-- /TOC -->


> 原则：组件需求分析从静态和动态交互两方面分析，静态面向用户导向，动态面向用户过程
>>(动态与静态内容都要从用户实际需求出发，从开始到结束的过程中能经过的所有动态交互事件
>>> 1- 静态：也从用户角度出发不用走过程，可能需要传什么便利的静态展示属性就传什么
>>> 2- 动态交互事件：是从面向用户过程中，会经历过什么可能特定类的事件以及用户想要收到的自定义类的事件(用户自定义事件可以根据特点匹配放在特定经历事件里某一个阶段手动触发回调如见upload/beforeUpload事件发生位置)要循序渐进，不可能一下就想的很完美)----想到哪些就先写出一个基本成型，然后再循序渐进

## 组件基础思路

1. 抛出接口
2. 抛主组件
   1. 取出各种属性
   2. (这步为组件定义计算出一些基础变量东西供后面使用)- 如根据属性计算不同的className预设class名const classes = classNames()---class命名技巧如下：
      1. 属性是bool类型：命成字符串形式=> 'is-disabled': disabled
      2. 属性是字符串**已知**多选类型：命成变量形式=> [`input-size-${size}`]: size // (仅lg｜sm两种可能)
      3. 属性是变量**未知**可选类型:
         1. 命成字符串形式=> 'input-group': prepend || append
         2. 字符串形式=> 'input-group-prepend': !!prepend
      4. 这种classNames返回一个综合类名适合加在一个元素上，对于想在多个元素上加动态类名也可以直接写在其className上也可以定义多个classes
   3. **预写完整状态驱动的jsx模版标签**:red_circle: (关键一步)
         1. 编写模版jsx的步骤就是先把大体结构写出来(伴随className取名)(如一个大div包一个上的display层div和负责下的transition层标签),紧接着就先给负责各块的div层className命名，名字以各层的职责取名。然后再看情况完善
   4. 根据jsx需求补充业务逻辑(由逻辑处理状态的更新使jsx页面更新)
      1. 在上面第2步的紧接后面空行开始写一些hook相关的state ref等定义状态逻辑----状态变量一块
      2. 后面空行是副作用函数或其他reacthook函数或者是基于1中状态变量的自定函数，要是没有基于1中状态变量的自定函数，可直接写在上面第2步中定义---执行函数一块

## 组件新增功能思路

> 组件本质就是有限状态机，核心就是状态数据的确定

- 当有新加功能需求时，首先就应该想当前功能对应的状态数据原型应该是什么样的，想好这个依据对数据的算法基础依托组件特有标签很好的写出来
  - 如table组件的表头排序功能就应该有filterState:boolean[]作为状态数据原型，则后面各项是否激活都可以看出

## 数据结构算法表现前端形式

1. 定义状态数据原型，然后组件jsx以这数据结构为基础去操作，还原实现
2. 源数据结构通过算法向业务组件jsx要求进行算法转化新数据结构，适用于当前业务组件逻辑

> 下面主要是各组件的上面第4步的核心思路

## 自定义Hook基础思路

- 自定义hook就是个函数侧重于输入输出，但与普通js函数不同的是它在着力完成输出的目标时可以运用ReactHooks的语法来必要性协助逻辑处理
- 根据业务逻辑去想，要的输入是什么，输出应该是什么,确定好就先写对应的类型约束，然后再进行主组件的编写
- 还可以是输出是void，直接把整个函数抛出去的，外界直接把他当作函数直接传参调用即可

## Button组件

## Menu组件

> 做首层组件该干的事，控制整体状态参数activeIndex等，向下分发用户props

- **顶层组件**啥都不想首先就要创建useState(currentActive)
- children的处理，用cloneElement自动给childrenMenuItem组件传index属性
- 建立context，方便往children子组件中统一方便提供数据
  - 如把用户传进的交互上选中回调传给子组件处理
  - index，onSelect，mode，defaultOpenSubMenus

## MenuItem组件

- 做个li的展示接受下，接受index
- 主要处理li上onClick点击事件处理handleClick与父级context的数据联动问题

## SubMenu组件

- 这个组件处理(根据属性计算类名的步骤上有点难搞)is-opened类名时，要借助本地state状态数据menuOpen来协助，这个状态数据来开关类名--类名控制着下拉菜单的开关--下面的事件函数分别来控制menuOpen状态开关值即可--..(正好构成了循环完美)
- 秉着静态优先的原则，先把处理children的逻辑写完，最后再写jsx中的各种事件函数即renderChildren函数渲染出下拉菜单的内容
- 再处理标题上的纵向模式的点击函数和li上横向模式的hover事件函数(不用css的hover，用onMouseEnter，onMouseLeave)
- 需要配合动画Transition组件和Icon组件显示图标

## Icon组件

- 主要是对react-fontawesome的三方组件的二次封装，仅支持对传入主题theme的prop属性来改变的图标颜色
- 仅按照基础思路3步就写完了

## Transition组件

- 就是对官方库的CSSTransition组件的二次封装，也简单3步就完成，直接设默认属性，预制一些类名可以让用户指定传入

## Input组件

- 提炼出预设类名的技巧和一些多元化Inputhtml结构的实现搞清楚
- 注意支持value的用户级受控组件的定义(input控件value与defaultValue不能同时存在的容错处理，避免单组件中非受控转变到受控的错误处理)

## AutoComplete组件

> 主要根据jsx模版结构来逐个击破

- 以Input组件变受控组件基础上二次封装
- 涉及到下拉列表，要先写动态列表jsx的generateDropdown的组件内函数(下拉列表必含Tab选项卡的hover点击逻辑(类名的切换))
- 根据props回调的到的结果(promise或data)请求相关必在useEffect里--由Icon组件请求数据之前加loading图标
- 一些onChange，onKeyDown，onSelect事件的相关处理
- 防抖hook和空白处点击hook的融合

## 防抖自定义hook

输入: value值(将在用户场景下试图多次要更新变化的值)和delay时间
输出: 新value值(近次不被打扰的delay时间内更新的value值)
**实质:** 是将一个state值的更新又向上闭包包装一下，外界再更新时得通过一点逻辑判断才能真更新到state值

- 防抖原理：通过闭包保存一个标记，保存这个setTimeout返回的一个值，每当用户输入的时候就把前一个setTimeout给clear掉，生成一个新的setTimeout，这样就能保证输入的字符后的时间间隔内如果还有字符输入的话，就不会执行回调函数
- hook防抖编写思路：不用单独写闭包了，直接就利用useEffect(带闭包特性)的return自动卸载特性，输出是返回目标的vlaue值，每当value更新都会重新渲染都会执行useEffect的上次渲染的return卸载函数，保证了再次触发时会重新进行延时处理,然后外界用防抖函数时就拿这个输出的value值接着操作请求接口啥的

## 节流自定义hook

输入: fn回调函数和delay延迟时间(只允许在delay时间内允许调用一次)
输出: 函数(将在用户场景下试图连续多次调用的函数)(由于是闭包，输出是函数一个节流产物)
**实质:** 是把一个回调函数向上闭包包装一下，使的外界想执行回调时得通过逻辑判断才能真正执行到回调函数

- 节流原理: 也是通过闭包保存局部开关变量，然后配合延时器或时间戳都行
- hook节流编写思路: 不借助useEffect，直接写一个闭包返回一个产物函数即可保存了局部开关变量flag初始为true。当第一次调用这个节流产物时走产物内逻辑给flag开关设false，在当多次连续调用产物时都不会走开关true的逻辑了，只有当栈里的延时器到期后变flag开关为true才能继续真正执行fn回调函数了或者重新执行节流函数返回一个新的节流产物。

## 防抖和节流区别对比

- 防抖是输出的是value值，节流是输出的是节流产物函数，两者防抖输入是value和delay，节流是fn和delay
- 两者都是借助闭包保存状态标记，然后配合时间戳或延时器，不同的两者的处理计算逻辑不太一样
  - 防抖是借助useState和useEffect，给当前**state(value)值延时更新**state，当value变化时，会清理掉当前延时器重新执行延时器直到不被打扰的delay时间内才真正延完时更新state值并返回state。
  - 节流是直接闭包函数，给存的**开关变量做个延时更新**flag，这个局部变量是闭包特性外界不可变的，仅当为flag变量为true时可以执行输入的回调函数，并且这个变量只能由延时器更新值，所以在delay期内flag变量始终为false就连续调用产物都不会执行，只能等待执行第一次的产物函数，
- 防抖属于用户触发式的机动型改变状态标记，节流属于不受用户影响的固守型改变状态标记

## 空白处点击自定义hook

- 自定义hook看作个函数，输入是ref对象节点，和事件函数，输出是void，抛出的就是函数可以直接传参调用即可，因为他里面是全局注册⌚️就这么简单

## Upload组件

- upload组件：由隐藏的input控件+动态渲染的数据列表的UploadList组件+一个自定义的按钮区域3核心部分组成
- 分别处理其change事件点击事件删除事件，在事件启动的过程中适当时机融合用户传入的钩子回调即可(各个关于状态的事件都全程伴随着fileList数据更新)
- 确定主线数据结构fileList：上传文件本地后，文件数据会展现成文件列表，且列表基于文件数据展现每项都伴随着各种状态post发送请求的后一系列过程对应也要更新这组展示的数据状态-----file数据作为state状态值是一条主线：根据效果专门为这条主线定义一组数据结构(先从再次抛出接口类型开始哦)
-----而真正发送到后端的是主线结构里的raw值即源文件对象，注意区分。
- 剩下就是UploadList和Dragger组件编写，由于大于3标签且状态逻辑多不适合写在主组件内抽出单独的组件，然后列表组件props输入主要是那个主线数据结构和删除的事件回调，呈现展示进度条左图标文件名和右图标hover切换效果

## UploadList组件

props输入：fileList: UploadFile[],onRemove

## Progress进度条组件

props输入：percent:number<100

- outer容器层div和inner层要爬的div，inner层的宽度设percentage%宽度

## Dragger拖拽组件

props输入：拖拽成功的文件回调，可以由用户拿到文件

- 就一个div元素作为拖拽区域，绑定三个拖拽核心事件，onDragOver事件和onDragLeave事件负责切换区域感应样式状态，onDrop负责执行props回调输出传进的文件

## Tabs组件

和menu组件选型类似 <Tabs><TabPane></TabPane></Tabs>
props输入(组件选型props确定工作可知)：defaultIndex，mode，onSelect，style，className

- tabs选中切换效果和menu组件一样，首层组件先设activeIndex的state是必须要做的来为tabs选中切换效果服务
- 主要就是写好jsxhtml结构重要，分renderHeadeer和renderContent两块div渲染即可。
- renderHeader中负责根据children--tabPane子组件的title属性的遍历渲染span元素作为tabs标题部分(并且也做好span的动态属性计算类名的工作如is-active)
- renderContent中根据activeIndex判断遍历渲染出哪一个tabPane子组件中的children内容即可

## TabPane组件

props输入：index(用户来强制输入，用来与activeIndex比较的)，title，disabled

- 没什么其他逻辑就是主要jsx部分渲染出props.children即可

## Select组件

props输入：data:Array,renderTemplate,icon,defaultValue,timeout

- jsxhtml结构共分为select.display(显示)与select.options上下两部分
- display部分主负责选中值的展示与icon的箭头图标显示，控制着state与open两个状态只的切换控制，一点击就触发open为true，让下options部分显示即可。
- oprions部分，外层套Transition组件过度动画效果，里面是data数据的遍历列表渲染，渲染时要注意用户renderTemplate的存在判断，存在直接返回它的调用结果即可
- jsx模版相关逻辑写完后基本功能就已经实现了---接下来就是添加一些副作用和自定义hook的功能完善即可不加也不影响功能实现只是优化哈哈

## Radio单选组件

props输入：data:Array<string>,defaultIndex,disableIndex,selectIndex

- jsx模版结构主要是遍历data返回label包裹的一套元素(input,span.dot,span.value)
- 其次就是对单选状态的一个数据结构抽象处理
  - 先根据data长度初始化state状态值，Array<boolean>类型；
  - 再根据data值遍历渲染label元素时里的input绑定状态值直接用state[index]对应即可
  - 需要把用户传的disbaleIndex:Array<number>数组提前在jsx外做一层Array<boolean>的转化，以便方便地直接在jsx模版中使用----即传进来的disableIndex数组生成一个状态数组，只对应需要disabled的为true即可，与state状态值是互相独立的互不影响
- **注意点：**每点击一下就重新初始成fill(false)的state数据,以便保证是单选的效果，点击这其他强制全为false，被点的项强制赋值成true以重复点击无影响-----***这就是单选的特点***

## Checkbox复选按钮组件

props输入：data，defaultIndexArr，disableIndex，callback，parentSetStateCallback，parentState

- jsx模版结构与Radio组件差不多，defaultIndexArr变成数组的形式了，就是Radio的onClick事件换成onChange事件及其的state更新逻辑方式不太一样得到的多选而不是单选
- 关于judgeStateIndex相关逻辑处理：对全选的扩展逻辑有关parentSetStateCallback，parentState的逻辑处理，用于全选扩展的parentState和初始化后的stateArray<boolean>功能是一样的，当传parentState时直接用parentState[index]对应即可就不用state[index]
- 关于defaultIndexArr动态改变state初始值的useEffect的妙用(state的动态改变主要服务于用户自行全选封装时的动态defaultIndexArr传参的动态渲染state初始值)(涉及useState惰性初始值的深刻理解进一步总结)
- disableIndex部分与Radio部分处理逻辑一样

## MultiSelect多选框组件

> 主要还是jsx模版结构的思路比较重要
props输入: data,defaultIndex,icon, callback,onOptionClick,disabled

- 与常规点击下拉jsx结构一样分为上: display显示层 + 下:transitionoptions动态显示层
  - display显示层: 外层div包裹(含多个Alert标签的div + 含icon图标部分的div)
  - transition动态显示层: 套Transition的外层ul含(根据data遍历渲染的多个li标签即option项)
- 剩下就是state:Array<string>, dataArray<string>, datamapArray<number>(中间层) 三个状态值之间的映射关系了
- 还有一个点击Alert标签关闭按钮后的延时效果手动批量更新的小技巧了

## useForm自定义hook

- 自定义hook编写，先考虑好hook函数的输入和输出应该是什么，参数都确定
  - 输入props: 就一个参数args: Array<{name字段:string,validate:[{validate: fn, message: string}]}>类型
  - 输出参数：仅一个参数为长度为4的数组类型含：
    1. handleSubmit: 提交事件的处理函数(可以给出验证状态总集合值)
    2. callbackObj: 字段校验函数对象类型--放在用户表单控件的onChange事件中伴随onChange事件能触发到的对应字段校验函数
    3. validate: 校验错误信息所有字段的显示集合{各字段:[message]} 直接用于用户根据信息展示错误提示
    4. blurObj: 字段校验函数对象类型--放在用户表单控件的onBlur事件中伴随onBlur事件能触发到的对应字段校验函数
- 确定好输入输出类型，还是按照先写类型接口步骤再写主组件
- 主组件逻辑就通过自定义Hook独有的react hooks函数组件语法来 以完成4个输出值的目标写即可。
- 核心思路: 就是用户传进静态的args(含字段名和校验函数)，该自定义hook就主要作出动态的validate(校验message实时显示集合)和字段对应校验函数对象(当用户触发里面的校验函数时自定义hook借助hooks语法可以实时响应到validate中) 和动态的验证状态总集合以供用户服务。

## Modal组件

props输入: setState(直接传递setState函数是不好的，可以传回调函数，子组件调用回调传值，让父组件自己setState),container,

- 这种属于全局性组件，可以使用Portal传送门或ReactDOM.unstable_renderSubtreeIntoContainer()方法
**注意:** setState(在组件传参中直接传递setState函数是不好的，可以传回调函数，子组件调用回调传值，让父组件自己setState)
- 主要还是写好jsx模版结构即可，采取模态框的布局样式写即可，最外层Transition，次级modal-portal(含modal-viewport(含modal-title+modal-chidlren+modal-confirm)+modal-mask)对应好逻辑
- 配合使用useStopScroll自定义hook
- 副作用钩子中添加refCallback的调用将modal-portal传出去
- 注意jsx中的渲染的某些需要每次渲染都带一大坨计算的jsx标签适当考虑用useMemo优化出去

## useStopScroll停止滚动hook

输入: 参数1(组件内的visible获取到模态框的开关状态) 参数2(对关闭禁止滚动样式的延时设置) 参数3(是否启用这个hook)
输出: void,hook函数体内做的是一些全局dombody样式的操作

- 常用来如弹出框模态框的遮罩是否要停止滚动
- **主要原理:** 停止滚动主要就是加不加body的overflowhidden样式，加了就不出现滚动条了,同时为了不影响滚动条去掉影响body的样式变宽变化，还得设置下停止后手动设置body的宽度为减去滚动条后的宽度

## Popconfirm 气泡消息组件

props:wrapperNode, directions, click,hover,visible,setState

- jsx主要结构就是外层div:wrapper层(含一个wrapper开关节点+Modal提示框)，用wrapper点击hover来控制显示不同方向提示框
- 对wrapper层元素操作主要是hover或click的触发切换
- 对Modal部分主要是其portalStyle的定位计算问题

## Message全局提示组件

- 该全局性提示组件也是需要传送门传送到body中去
- **组件选型较为特别：**基于需求分析考量为复合型shape(常规组件型+对象属性函数调用型(共9种可选类型))
- 常规组件型:jsx结构是直接return出createPortal的调用即可
  - 主要container的处理：若用户不传时自己完成createContainer函数捎带closeCallback函数
  - 还有个用户传的方向(多)可选值向Alert组件接受的(少)方向可选值的一个转换函数
- 对象属性函数调用型: 形状结构是{default:fn,primary:fn,danger:fn,warning:fn等9个属性的对象，属性值均为函数(str,options)接受2参数，内部执行的是messageRender函数(3行参)结果}
  - 主要是属性值里的messageRender函数写好

## I18n国际化组件

props: defaultLang, library
> 这种全局性配置数据得用上下文，本context的value结构是:{state,toggle}

- jsx结构:主要是外层Context.Provider包裹子组件props.children即可,
- 结构外逻辑：主要借助组件的setState特性负责动态更新context的value值以便让子组件使用替换语言
- 子组件(用户)中使用方式:

```javascript
import {Context} from './i18n';
// ...
const {state, toggle} = useContext(Context);
<Button>{state.language}</Button>
<Button onClick={()=>{toggle('zh')}}>切换中文</Button>
```

## List列表组件

props: mode,withHoverActive,onSelect,renderTemplate,refCallback

- jsx结构: 外层是ul元素，包裹着一个包装函数(返回包装各个children的li元素标签)来达到list列表的一个展现
- 结构外逻辑：主要就是renderLiTemplate函数和点击事件函数(给ul元素加一个点击事件，事件委托即可)
- renderLitemplate函数逻辑：
  1. 首先它含是含计算逻辑且含状态变量的所以给它摘出来做依赖优化
  2. 。。。

## VirtualList虚拟列表组件

props:itemHeight,columnNumber,insightNumber,scrollbar,startHeight等等。

- 原理: jsx结构外层是一个固定高度的wrapper然分左leftbar右customItem两部分。
  - 左部分只负责撑开高度(chidlren动态计算高度)隐藏效果就行撑开高度以便能使父元素wrapper层出现滚动条的滑动效果。
    - 所需状态: 只有costomHeight(chidlren计算出的总高度)
  - 右部分只负责列表项的展示，没有overflowauto滚动条效果，只负责展示满固定高度的项即可，然后这时我们滑动出现的滚动条实际是leftbar过高致父元素wrapper层产生的滚动条
    - 通过 **“借位”** 的概念: 当wrapper的滚动条滚动时处理器收到通知由处理器内部逻辑计算处理动态增删替换customItem中的列表项
    - 这样的滚动条借位就呈现给用户效果就仿佛是列表项产生的滚动条了，这样比直接渲染那么多项到dom上是大大提升性能的。
    - 所需状态: visbleHeight(高度设置)，overScroll(滚去高度以便能让customitem实时上移保持固定)，renderchildren(动态截取的节点列表渲染出来)
- 复杂组件核心都是先准确预写出状态驱动的jsx模版结构，然后通过额外逻辑如本组件两个副作用来处理状态的更新使jsx页面更新即可。
  - 第一个副作用是处理初始化状态更新到页面中去
  - 第二个副作用是滚动事件处理函数进一步计算触发状态的更新-页面更新

## Pagination 分页组件

props: pageSize, total(必传，内部要据其计算出总共需要多少页totalPage展示多少小按钮), defaultCurrent, barMaxSize(分页条目最多多少页)都是必传的。

- jsx模版结构: 外层wrapper层为ul(含左按钮li(Button)+statemapLi(Button)+右按钮li(Button))
- 状态state数据: 点击移动激活项需求的必须要有current状态 和 state状态数组(数据组主要来显示分页可显条目)和totalPage计算值
- 然后各元素点击事件基础处理就用来更新current和state数据组即可完成基本功能
  - 本组件难点加入了**自定义跳转规则算法**(即点右部分距离中间值差值多少就下次直接跳转到±差值的state数据组展示，点左部分同样效果)，分别在组件渲染时，点击事件中用来执行规则算法来更新state数据组

## Table 表格组件

- 数据state状态: filterState(筛选状态数据组boolean类型要根据它状态决定当前筛选是否激活点击触发不同逻辑) + current:number(指示当前分页组件的第几页即展示第几页数据) + paginationData(分页数据组，与分页组件对应好的当前展示data数据的哪部分)
- jsx结构: 最外层container层(次级含wrapper层+pagination附加层)
  - wrpper层为table标签的编写业务逻辑
    - 标题部分：点击事件逻辑(点击针对排序对应逻辑)
      - 排序切换需要setSortedData，originPagination，setFilterState等数据状态配合
    - body部分：
  - pagination层为分页组件
    - 需要totalLen，setCurrent的数据状态的配合
- **注意**: data源数据转化为分页数据(二维数)组格式是Table组件至关重要的转化函数。

## InputNumber计数器组件

props:

- 需要用受控组件状态提升hook返回的state状态值
- 数据state状态:innerState, visible, state
- jsx结构:最外层wrapper层(含prev+main+next三个同层级div)。没有其他副作用逻辑，写好jsx结构对应的逻辑即可

## Layout布局

- 结构: Layout组件是一组section标签，其他标签均是不同组件都赋值给Layout的静态属性上。主要是各组件类名的flex布局的各种运用达到各种布局实现，组件本身没什么逻辑
- 各组件设定
  - Layout组件只设flex布局不设宽高
  - Header组件：只设了固定高度
  - Content组件：flex设为1分配剩余空间
  - Footer组件: 不设宽高，用户内容自适应，padding装饰
  - Sider侧边拦组件：只设flex-basis固定主轴空间

## Tree组件

> 借鉴rc-components/tree组件学习

- 组件选型综合两种：props传数据型 和 标签嵌套型
  - 综合思路: 会在Tree组件生命周期中开始判断，当前用户使用的哪种选型，若children类型直接转下数组成Children类型数据就可以，若是treeData数组类型则进行convertDataToTree转化成Children的数组类型，然后后面统一按照把Children类型数据赋值给**treeNode变量**来统一执行渲染模版逻辑。
  - 核心递归渲染children的是util里的convertDataToTree方法该方法就是通过内部递归返回的一组数据给Tree里的state状态中treeNode用即可()
- 数据结构:treeData数组套对象形式[{key, title, children},...]
  - Tree组件中状态数据原型**treeNode变量**: 是convertDataToTree方法递归后返回的[<TreeNode>{childNodes}</TreeNode>,...]数组,然后Tree容器组件中遍历渲染这个数据数组，展示出多个一级的treeNode标题节点li，然后数组中每项TreeNode间都有chidlren数组(和treeNode数组一个结构)，所以treeNode组件中会遍历渲染他们作为一级标题节点的二级ul显示
- Tree组件作为总管家，TreeNode组件作为展示类组件，TreeNode的业务逻辑事件回调等处理全是Tree收发下来的/

## 多级联动组件

- 先确定好数据结构和状态数据原型
  - 数据结构:数组套对象形式{id, domain, children},children数组值代表某项对应的子集
  - 状态数据原型: data数组和selectItem数组
    - data数组: 二维数组形式。对应多级联动的数组集合，data中每一项代表每一级的数组，如a项每点开a项后，就会把a项的children数组放进data中下一项中。
    - selectItem数组: 次要的，主要是用来展示每一级的向上所属关系，每点data[level]中某一项就会把那项标题存进去
- jsx结构: 主要是用data原型数据遍历渲染Domain组件和selectItem标签元素，初始是data中只有一项，当点了一项data又获得一份children数组，，所有re-render就会再次遍历data渲染出两级元素。
