import * as React from 'react';
import { TreeNodeProps } from './treeNode';

// user级 原生 节点数据结构
export interface DataNode {
  key: string;
  title: string;
  disabled?: boolean;
  selectable?: boolean;
  children?: DataNode[];
}

export type IconType = React.ReactNode | ((props: TreeNodeProps) => React.ReactNode);

export type Key = string | number;

export type NodeElement = React.ReactElement<TreeNodeProps> & {
  selectHandle: HTMLSpanElement;
  type: {
    isTreeNode: boolean;
  };
};

// 实体
export interface Entity {
  node: NodeElement;
  index: number;
  key: Key;
  pos: string | number;
  parent?: Entity;
  children?: Entity[];
}
