import React, { FC, useState, useCallback } from 'react';

export interface I18nDataSource {
	[key: string]: string;
}

export interface contextType {
	state: I18nDataSource;
	toggle: (str: string) => void;
}

export const Context = React.createContext<contextType>({
  // 初始值是空对象
	state: {},
	toggle: () => {}
});


export interface I18nCombinedSource {
	[key: string]: I18nDataSource;
}
export interface I18nProps {
	/** 默认语言字段值-字符串对应于library的key值能从library得到对应key的数据资源 */
	defaultLang: keyof I18nDataSource;
	/** 语言库 */
	library: I18nCombinedSource;
}

export const I18n: FC<I18nProps> = (props) => {
	const { defaultLang, library, children } = props;

  // state作为某个语言包的数据资源对象形式，其包括视图中出现的所有字段其对应的中文值
	const [state, setState] = useState<I18nDataSource>(
		library[defaultLang] || {}
	);

  const toggle = useCallback((str: keyof I18nDataSource) => {
    if (library[str]) {
      setState(library[str])
    }
  }, [library])

  // 将state具体的语言包作为context上下文跨层级传递给包含的所有子组件，子组件中获取上下文得到其对应语言映射
  // 还将toggle切换函数通过context传下去，可以让任意层级子组件中手动切换语言

  // 利用context上下文的动态更新功能来实现语言包的切换
	return (
		<Context.Provider value={{ state, toggle }}>{children}</Context.Provider>
	);
};
export default I18n;
