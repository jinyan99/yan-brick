import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import bindAll from 'lodash.bindall';

// import styles from './Tabs.css';
export class Tabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			defaultIndex: this.props.defaultIndex
		};
		bindAll(this, 'renderHeader', 'renderContent');
	}

	renderHeader() {
		return React.Children.map(this.props.children, (element, index) => {
			const activeStyle =
				element.key === this.state.defaultIndex ? 'activeTitle' : null;
			return (
				<span
					onClick={() => {
						this.setState({ defaultIndex: element.key });
					}}
					className={classNames('TableTitle', activeStyle)}
				>
					{element.props.title}
				</span>
			);
		});
	}

	renderContent() {
		return React.Children.map(this.props.children, (element, index) => {
			if (element.key === this.state.defaultIndex) {
				return <div>{element.props.children}</div>;
			}
		});
	}

	render() {
		return (
			<div className={'TableContainer'}>
				<div className={'TableTitleContainer'}>{this.renderHeader()}</div>
				<div className="contentContainer">{this.renderContent()}</div>
			</div>
		);
	}
}

Tabs.propTypes = {
	defaultIndex: PropTypes.string,
	children: PropTypes.children,
};

export default Tabs;
