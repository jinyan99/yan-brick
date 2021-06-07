import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";
import { create } from "@storybook/theming";
import React from 'react';

// 全局引入样式
import '../src/styles/index.scss';

// // 全局配置装饰器
// const styles: React.CSSProperties = {
//     //textAlign: 'center'
// }
// const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>
// addDecorator(CenterDecorator)

// 全局配置装饰器
const wrapperStyle: React.CSSProperties = {
	padding: '20px 40px'
};
const storyWrapper = (storyFn: any) => (
	<div style={wrapperStyle}>
		{/* <h3>组件演示</h3> */}
		{storyFn()}
	</div>
);
addDecorator(storyWrapper);
addDecorator(withInfo);
addParameters({
    info: { inline: true, header: false },
    options: {
		theme: create({
            base:'light',
            brandTitle: "😘&nbsp;&nbsp;Yan-Brick  UI库&nbsp;&nbsp;😘",
			brandUrl: "https://github.com/jinyan99/yan-brick"
		})
    },
    docs: {
		container: DocsContainer,
		page: DocsPage,
		PreviewSource: "open"
    },
    dependencies: {
		withStoriesOnly: true,
		hideEmpty: true
	}

});

// 写成回调函数的形式，将返回一个数组，第一项展示欢迎页即可
const loaderFn = () => {
    const allExports = [require('../src/welcome.stories.tsx')];
    // 动态加载story，借用了webpack的context API
	const req = require.context('../src/components', true, /\.stories\.tsx$/);
	req.keys().forEach((fname) => allExports.push(req(fname)));
	return allExports;
};
configure(loaderFn, module);

// // automatically import all files ending in *.stories.js
// 返回一个对象的用法，多种用法见官方story文档
// configure(require.context('../src', true, /\.stories\.tsx$/), module);
