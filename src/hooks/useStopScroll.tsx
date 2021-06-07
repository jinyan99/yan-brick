/**
 * 该hook解决的是当使用弹框带遮罩时，上下滚动鼠标，它遮罩层下面的页面还是默认可以滚动的，不友好
 * 应该加这个自定义hook来解决禁止背面滚动
 * @param state 关联的模态框开关状态，开时应该启动禁止滚动的样式设置，关时应该关闭禁止滚动的样式设置
 * @param delay 对关闭禁止滚动样式的延时设置
 * @param open 是否启用这个hook
 */
export default function useStopScroll(state: boolean, delay: number, open?: boolean) {
    // 当open为true就执行：停止滚动；当open为false时就不执行这个hook，默认不停止滚动
    // 不让他背后的body层出现滚动条主要原理就是overflow:hidden的区别
    if (open) {
      // 得到滚动条宽度width
        const width = window.innerWidth - document.body.clientWidth;
        if (state) {
            document.body.style.overflow = "hidden";
            document.body.style.width = `calc(100% - ${width}px)`;
        }
        else {
            // 等动画渲染
            setTimeout(() => {
                document.body.style.overflow = 'auto';
                document.body.style.width = '100%';
            }, delay)
        }
    }
}