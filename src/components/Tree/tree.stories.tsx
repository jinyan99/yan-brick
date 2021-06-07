import React,{useState} from 'react';
import {storiesOf} from '@storybook/react';
import Tree,{TreeNode, TreeNodeProps, TreeProps} from './index';
import ReactDOM from 'react-dom';

const treeData = [
  {
    key: '0-0',
    title: 'parent 1',
    children: [
      { key: '0-0-0', title: 'parent 1-1', children: [{ key: '0-0-0-0', title: 'parent 1-1-0' }] },
      {
        key: '0-0-1',
        title: 'parent 1-2',
        children: [
          { key: '0-0-1-0', title: 'parent 1-2-0', disableCheckbox: true },
          { key: '0-0-1-1', title: 'parent 1-2-1' },
        ],
      },
    ],
  },
];

// @ts-ignore
const BasicComplete = (props) => {
  const [tree, setTree] = useState<any>();
  const [selKey, setSelKey] = useState();
  const [defaultExpandedKeys, setDefaultExpandedKeys] = useState(props.keys);
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState(props.keys);
  const [defaultCheckedKeys, setDefaultCheckedKeys] = useState(props.keys);

  const onExpand = (expandedKeys: any) => {
    console.log('onExpand', expandedKeys);
  };
  const onSelect = (selectedKeys: any[], info: { node: { props: { eventKey: any; }; }; }) => {
    console.log('selected', selectedKeys, info);
    setSelKey(info.node.props.eventKey);

    if (tree) {
      console.log(
        'Selected DOM node:',
        selectedKeys.map((key: string | number) => ReactDOM.findDOMNode(tree!.domTreeNodes[key])),
      );
    }
  };
  const onCheck = (checkedKeys: any, info: any) => {
    console.log('onCheck', checkedKeys, info);
  };

  const onEdit = () => {
    setTimeout(() => {
      console.log('current key: ', selKey);
    }, 0);
  };

  const onDel = (e: { stopPropagation: () => void; }) => {
    if (!window.confirm('sure to delete?')) {
      return;
    }
    e.stopPropagation();
  };

  const setTreeRef = (tree: any) => {
    setTree(tree);
  };
  const customLabel = (
    <span className="cus-label">
      <span>operations: </span>
      <span style={{ color: 'blue' }} onClick={onEdit}>
        Edit
      </span>
      &nbsp;
      <label onClick={e => e.stopPropagation()}>
        <input type="checkbox" /> checked
      </label>
      &nbsp;
      <span style={{ color: '#EB0000' }} onClick={onDel}>
        Delete
      </span>
    </span>
  );
  return (
    <div style={{ margin: '0 20px' }}>
        <h2>标签嵌套用法</h2>
        <Tree
          ref={setTreeRef}
          className="myCls"
          showLine
          checkable
          defaultExpandAll
          defaultExpandedKeys={defaultExpandedKeys}
          onExpand={onExpand}
          defaultSelectedKeys={defaultSelectedKeys}
          defaultCheckedKeys={defaultCheckedKeys}
          onSelect={onSelect}
          onCheck={onCheck}
        >
          <TreeNode title="parent 1" key="0-0">
            <TreeNode title={customLabel} key="0-0-0">
              <TreeNode title="leaf" key="0-0-0-0" style={{ background: 'rgba(255, 0, 0, 0.1)' }} />
              <TreeNode title="leaf" key="0-0-0-1" />
            </TreeNode>
            <TreeNode title="parent 1-1" key="0-0-1">
              <TreeNode title="parent 1-1-0" key="0-0-1-0" disableCheckbox />
              <TreeNode title="parent 1-1-1" key="0-0-1-1" />
            </TreeNode>
            <TreeNode title="parent 1-2" key="0-0-2" disabled>
              <TreeNode title="parent 1-2-0" key="0-0-2-0" checkable={false} />
              <TreeNode title="parent 1-2-1" key="0-0-2-1" />
            </TreeNode>
          </TreeNode>
        </Tree>

        <h2>数据配置用法</h2>
        <Tree
          className="myCls"
          showLine
          checkable
          selectable={false}
          defaultExpandAll
          onExpand={onExpand}
          defaultSelectedKeys={defaultSelectedKeys}
          defaultCheckedKeys={defaultCheckedKeys}
          onSelect={onSelect}
          onCheck={onCheck}
          treeData={treeData}
        />
      </div>
  )
}
BasicComplete.defaultProps = {
  keys: ['0-0-0-0']
}


storiesOf('Display/Tree 树形控件 ', module)
    .add('基本使用', BasicComplete as any, {
      info: {
        source: false,
        text: `

~~~js
const treeData = [
  {
    key: '0-0',
    title: 'parent 1',
    children: [
      { key: '0-0-0', title: 'parent 1-1', children: [{ key: '0-0-0-0', title: 'parent 1-1-0' }] },
      {
        key: '0-0-1',
        title: 'parent 1-2',
        children: [
          { key: '0-0-1-0', title: 'parent 1-2-0', disableCheckbox: true },
          { key: '0-0-1-1', title: 'parent 1-2-1' },
        ],
      },
    ],
  },
];

class BasicComplete extends React.Component<Partial<TreeNodeProps & TreeProps>, {
  defaultExpandedKeys?: [];
  defaultSelectedKeys?: [];
  defaultCheckedKeys?: [];
}> {
  static defaultProps = {
    keys: ['0-0-0-0'],
  };
  selKey: any;
  tree: any;

  constructor(props:any) {
    super(props);
    const { keys } = props;
    this.state = {
      defaultExpandedKeys: keys,
      defaultSelectedKeys: keys,
      defaultCheckedKeys: keys,
    };
  }

  onExpand = (expandedKeys: any) => {
    console.log('onExpand', expandedKeys);
  };

  onSelect = (selectedKeys: any[], info: { node: { props: { eventKey: any; }; }; }) => {
    console.log('selected', selectedKeys, info);
    this.selKey = info.node.props.eventKey;

    if (this.tree) {
      console.log(
        'Selected DOM node:',
        selectedKeys.map((key: string | number) => ReactDOM.findDOMNode(this.tree.domTreeNodes[key])),
      );
    }
  };

  onCheck = (checkedKeys: any, info: any) => {
    console.log('onCheck', checkedKeys, info);
  };

  onEdit = () => {
    setTimeout(() => {
      console.log('current key: ', this.selKey);
    }, 0);
  };

  onDel = (e: { stopPropagation: () => void; }) => {
    if (!window.confirm('sure to delete?')) {
      return;
    }
    e.stopPropagation();
  };

  setTreeRef = (tree: any) => {
    this.tree = tree;
  };

  render() {
    const customLabel = (
      <span className="cus-label">
        <span>operations: </span>
        <span style={{ color: 'blue' }} onClick={this.onEdit}>
          Edit
        </span>
        &nbsp;
        <label onClick={e => e.stopPropagation()}>
          <input type="checkbox" /> checked
        </label>
        &nbsp;
        <span style={{ color: '#EB0000' }} onClick={this.onDel}>
          Delete
        </span>
      </span>
    );

    return (
      <div style={{ margin: '0 20px' }}>
        <h2>标签嵌套用法</h2>
        <Tree
          ref={this.setTreeRef}
          className="myCls"
          showLine
          checkable
          defaultExpandAll
          defaultExpandedKeys={this.state.defaultExpandedKeys}
          onExpand={this.onExpand}
          defaultSelectedKeys={this.state.defaultSelectedKeys}
          defaultCheckedKeys={this.state.defaultCheckedKeys}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
        >
          <TreeNode title="parent 1" key="0-0">
            <TreeNode title={customLabel} key="0-0-0">
              <TreeNode title="leaf" key="0-0-0-0" style={{ background: 'rgba(255, 0, 0, 0.1)' }} />
              <TreeNode title="leaf" key="0-0-0-1" />
            </TreeNode>
            <TreeNode title="parent 1-1" key="0-0-1">
              <TreeNode title="parent 1-1-0" key="0-0-1-0" disableCheckbox />
              <TreeNode title="parent 1-1-1" key="0-0-1-1" />
            </TreeNode>
            <TreeNode title="parent 1-2" key="0-0-2" disabled>
              <TreeNode title="parent 1-2-0" key="0-0-2-0" checkable={false} />
              <TreeNode title="parent 1-2-1" key="0-0-2-1" />
            </TreeNode>
          </TreeNode>
        </Tree>

        <h2>数据配置用法</h2>
        <Tree
          className="myCls"
          showLine
          checkable
          selectable={false}
          defaultExpandAll
          onExpand={this.onExpand}
          defaultSelectedKeys={this.state.defaultSelectedKeys}
          defaultCheckedKeys={this.state.defaultCheckedKeys}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
          treeData={treeData}
        />
      </div>
    );
  }
}
~~~
        `
      }
    })