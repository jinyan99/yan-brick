/**
 * 节流的自定义hook，输入是回调函数和延迟时间2个值
 * (这是节流的延时器写法，还有时间戳写法待写，主要原理就是利用闭包的特性)
 * @param fn
 * @param delay
 */
declare function useThrottle(fn: Function, delay: number): (_e: Object, ...args: Array<any>) => void;
export default useThrottle;
