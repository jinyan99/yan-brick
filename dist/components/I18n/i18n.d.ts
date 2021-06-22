import React, { FC } from 'react';
export interface I18nDataSource {
    [key: string]: string;
}
export interface contextType {
    state: I18nDataSource;
    toggle: (str: string) => void;
}
export declare const Context: React.Context<contextType>;
export interface I18nCombinedSource {
    [key: string]: I18nDataSource;
}
export interface I18nProps {
    /** 默认语言字段值-字符串对应于library的key值能从library得到对应key的数据资源 */
    defaultLang: keyof I18nDataSource;
    /** 语言库 */
    library: I18nCombinedSource;
}
export declare const I18n: FC<I18nProps>;
export default I18n;
