import React, { FC, useState, useMemo } from 'react';
import classNames from 'classnames';

export interface RadioProps {
	/** 数据 */
	data: Array<string>;
	/** 默认选中索引 */
	defaultIndex: number;
	/** 选中回调 */
	selectCallback?: (arr: Array<boolean>) => void;
	/** 额外类名 */
	className?: string;
	/** 禁用索引 */
	disableIndex?: Array<number>;
}

export const Radio: FC<RadioProps> = (props) => {
	const { data, defaultIndex, selectCallback, className, disableIndex } = props;
	const classes = classNames('yanbrick-radio-wrapper', className, {});
	// 1- 先根据data长度初始化state状态值
	const [state, setState] = useState(
		new Array(data.length)
			.fill(false)
			.map((v, i) => (i === defaultIndex ? true : v))
	);

	const disableRef = useMemo(() => {
		return state.map((v, i) => {
			if (disableIndex?.includes(i)) return true;
			return false;
		});
	}, [state, disableIndex]);

	// 2- 再根据data的值遍历渲染jsx模版，然后input绑定状态值直接就能用state[index]来对应了
	return (
		<div className={classes}>
			{data.map((value, index) => (
				<label
					className={`yanbrick-radio-label ${
						disableRef[index] ? 'radio-disabled' : ''
					}`}
				>
					<input
						className="yanbrick-radio-input"
						type="radio"
						checked={state[index]}
						onClick={() => {
							if (!disableRef[index]) {
                                // 每点击一下就重新初始成fill(false)的state数据,以便保证是单选的效果，点击这其他强制全为false，被点的项强制赋值成true以重复点击无影响
								const newState = new Array(data.length).fill(false);
									newState[index] = true;
									setState(newState);
									if (selectCallback) selectCallback(newState);
							}
						}}
						onChange={() => {}}
					/>
					<span
						className={`yanbrick-radio-dot ${
							state[index] ? 'radio-active' : ''
						}`}
					></span>
					<span className="yanbrick-radio-value">{value}</span>
				</label>
			))}
		</div>
	);
};

Radio.defaultProps = {
	data: ['0', '1', '2'],
	defaultIndex: 1
};

export default Radio;
