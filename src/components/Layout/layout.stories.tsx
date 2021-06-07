import React from 'react';
import { storiesOf } from '@storybook/react';
import { Layout } from './layout';
import Menu from '../Menu';
import { Tabs, TabPane } from '../Tabs/index';

const Basic1Complete = () => {
	return (
		<Layout>
			<Layout.Header style={{ background: '#7dbcea' }}>HEADER</Layout.Header>
			<Layout.Content
				style={{
					height: '200px',
					lineHeight: '200px',
					background: 'rgba(16, 142, 233, 1)'
				}}
			>
				CONTENT
			</Layout.Content>
			<Layout.Footer style={{ background: '#7dbcea' }}>FOOTER</Layout.Footer>
		</Layout>
	);
};
const Basic2Complete = () => {
	return (
		<Layout>
			<Layout.Header style={{ background: '#7dbcea' }}>HEADER</Layout.Header>
			<Layout row>
				<Layout.Sider style={{ background: '#3ba0e9' }}>SIDER</Layout.Sider>
				<Layout.Content
					style={{
						height: '200px',
						lineHeight: '200px',
						background: 'rgba(16, 142, 233, 1)'
					}}
				>
					CONTENT
				</Layout.Content>
			</Layout>
			<Layout.Footer style={{ background: '#7dbcea' }}>FOOTER</Layout.Footer>
		</Layout>
	);
};
const Basic3Complete = () => {
	return (
		<Layout>
			<Layout.Header style={{ background: '#7dbcea' }}>HEADER</Layout.Header>
			<Layout row>
				<Layout.Content
					style={{
						height: '200px',
						lineHeight: '200px',
						background: 'rgba(16, 142, 233, 1)'
					}}
				>
					CONTENT
				</Layout.Content>
				<Layout.Sider style={{ background: '#3ba0e9' }}>SIDER</Layout.Sider>
			</Layout>
			<Layout.Footer style={{ background: '#7dbcea' }}>FOOTER</Layout.Footer>
		</Layout>
	);
};
const Basic4Complete = () => {
	return (
		<Layout row>
			<Layout.Sider style={{ background: '#3ba0e9' }}>SIDER</Layout.Sider>
			<Layout>
				<Layout.Header style={{ background: '#7dbcea' }}>HEADER</Layout.Header>
				<Layout.Content
					style={{
						height: '200px',
						lineHeight: '200px',
						background: 'rgba(16, 142, 233, 1)'
					}}
				>
					CONTENT
				</Layout.Content>
				<Layout.Footer style={{ background: '#7dbcea' }}>FOOTER</Layout.Footer>
			</Layout>
		</Layout>
	);
};
const Basic6Complete = () => {
	return (
		<Layout>
			<Layout.Header>
				<Tabs defaultIndex="2">
					<TabPane title="title1" index="1">
						<Layout.Content
							className="bigbear-layout-block-default"
							style={{ height: '200px', lineHeight: '200px' }}
						>
							CONTENT1
						</Layout.Content>
					</TabPane>
					<TabPane title="title2" index="2">
						<Layout.Content
							className="bigbear-layout-block-default"
							style={{ height: '200px', lineHeight: '200px' }}
						>
							CONTENT2
						</Layout.Content>
					</TabPane>
				</Tabs>
			</Layout.Header>
			<Layout.Footer
        style={{ marginTop: '160px', opacity: .5,backgroundColor:'#ccc'}}
				className="bigbear-layout-block-default"
			>
				yanbrick-ui ©2020 Created by jinyan
			</Layout.Footer>
		</Layout>
	);
};
const Basic7Complete = () => {
	return (
		<Layout>
			<Layout.Header>
				<Menu
					style={{ justifyContent: 'flex-end' }}
					onSelect={(index) => {
						console.log(index);
					}}
				>
					<Menu.Item>item1</Menu.Item>
					<Menu.Item>item2</Menu.Item>
					<Menu.Item>item3</Menu.Item>
				</Menu>
			</Layout.Header>
			<Layout row>
				<Layout.Sider>
					<Menu
						onSelect={(index) => {
							console.log(index);
						}}
						mode="vertical"
					>
						<Menu.SubMenu title="下拉菜单1">
							<Menu.Item>item1</Menu.Item>
							<Menu.Item>item2</Menu.Item>
							<Menu.Item>item3</Menu.Item>
						</Menu.SubMenu>
						<Menu.SubMenu title="下拉菜单2">
							<Menu.Item>item1</Menu.Item>
							<Menu.Item>item2</Menu.Item>
							<Menu.Item>item3</Menu.Item>
							<Menu.Item>item4</Menu.Item>
						</Menu.SubMenu>
						<Menu.SubMenu title="下拉菜单3">
							<Menu.Item>item1</Menu.Item>
						</Menu.SubMenu>
					</Menu>
				</Layout.Sider>
				<Layout.Content
					className="bigbear-layout-block-default"
					style={{ lineHeight: '200px' }}
				>
					CONTENT
				</Layout.Content>
			</Layout>
			<Layout.Footer
				className="bigbear-layout-block-default"
				style={{ marginTop: '20px' }}
			>
				yanbrick-ui ©2020 Created by jinyan
			</Layout.Footer>
		</Layout>
	);
};

storiesOf('Layout/Layout 布局', module)
	.add('常见布局1', Basic1Complete)
	.add('常见布局2', Basic2Complete)
	.add('常见布局3', Basic3Complete)
	.add('常见布局4', Basic4Complete)
	.add('常见布局结合组件1', Basic6Complete)
	.add('常见布局结合组件2', Basic7Complete);
