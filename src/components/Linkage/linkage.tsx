import React, { FC, useState, useEffect } from 'react';
import Button from '../Button';

export interface ItemProps {
  id: number; domain: string; children?:ItemProps[]
}
export interface LinkageProps {
	/** 联动数据源 */
	dataSource: Array<ItemProps>;
}

export const Domain = ({arr, onItemClick}:any) => {
  // arr一定传的是个数组
  if (!Array.isArray(arr)) return null;
  return (
    <div className="items">
      {
        arr.map((item: { current: any; domain: React.ReactNode; }, index: string | number | null | undefined) => (
          <div
            className={item.current ? "current item":"item"}
            key={index}
            onClick={e => onItemClick(item, index)}
          >
            {item.domain}
          </div>
        ))
      }
    </div>
  )
}

export const Linkage: FC<LinkageProps> = (props) => {
  const { dataSource } = props;
  // data数组存的是各层级对应的数组
  const [data, setData] = useState<any[]>(dataSource);
  // 该数组存的是各层级选中过的domain标题组成的数组
	const [selectItems, setSelectItems] = useState([]);
	const [isShow, setIsShow] = useState(false);

  // ======= 周期相关 ========
  useEffect(() => {
    onInit()
  }, [])
	// ======= 回调相关 ========
	const onStartClick = (e: any) => {
    console.log('点击选择');
    setIsShow(s => !s);
	};
	const onInit = () => {
    console.log('点击全部--初始化');
    setData([[...dataSource]]);
    setSelectItems([]);
  };
  /**
   * 核心计算方法 (主要是处理data和selectItems数据的更新计算)
   * 大致逻辑就是: 当点击一项后，交由该函数处理，根据传入的value判断，若value有children数组的话，则需要将这个chidren放到
   * data[level+1]中，同时将value中的当前标题放入selectItems[level]中；若没有children数组则不用动data数组，只改变current标示即可
   * @param value 当前点击的对象
   * @param index 第几位
   * @param level 层级(一个数组对应一级)---这个层级的意思是级联的级数，当前默认是0级，当点击0级中A项展开A项的一对
   * 数组，则此时这对数组是1级，再点开1级中就会出现第2级数组
   */
  const onItemClick = (value: {[key: string]: never}, index: any, level: number) => {
    console.log('点击某一项', value, index, level);//如valueA项，index：0，level：0级
    const _data = [...data];
    const _selectItems = [...selectItems];
    // 当该对象的children存在时
    if (value.children) {
      const child = value.children;

      _data.forEach((items, i) => {
        if (i > level) {
          markCurrent(items, null);
        }
      })
      // 改变原数组，返回删除当前level级元素组的数组,原数组就会变成删后剩下的数据组成的数组，则下行的_data就只变成[level]单项数组
      _data.splice(level + 1);
      // 改变原选中项标题数组，原数组变成删掉level项及以后的各项的 剩下组成数组
      _selectItems.splice(level);
      // 先将level+1项删掉清空后，再将level+1级数组项置为最新数据即 A项的chidlren展开的数组
      _data[level + 1] = child;
      markCurrent(_data[level], index);
      // 先将selectItems数组的level项及以后的项都清空后，然后将level项置为当前value新值
      _selectItems[level] = value.domain;

      setData(_data);
      setSelectItems(_selectItems);
    }
    else {
      markCurrent(_data[level], index);
    }
  }
	// ======= 状态判断 ========
  // ======= 工具函数 ========
  /**
   * 标记current的方法
   * @param arr，为data多级二维数组中的某一级数组如arr = data[0]
   * @param index 是level级的data数组中的某一level级项数组中的index下标，给index项加current标示
   */
  const markCurrent = (arr: any[], index: null) => {
    if (index === null) {
      // 若传了null，遍历arr数组，给里面的每一项current置为false
      arr.forEach((item: { current: boolean; }) => {
        item.current = false;
      });
      return;
    }
    arr.forEach((item: { current: boolean; }, i: any) => {
      if (i === index) {
        item.current = true;
        return;
      }
      item.current = false;
    })
  }
  // ======= 其他执行函数 =====

	return (
		<div className="domain">
			<div className="select">
				<input type="text" className="input" placeholder="请选择域" />
				<Button size="sm" onClick={onStartClick}>
					选择
				</Button>
			</div>
			<div className="menu" style={{ display: isShow ? 'block' : 'none' }}>
				<div className="all" onClick={onInit}>
					全部
				</div>
				{data.map((item, level) => {console.log(item,'看渲染数据');return (
					<div key={level} className="domainArr">
						<Domain
							arr={item}
							onItemClick={(value: any, index: any) => {
								onItemClick(value, index, level);
							}}
						/>
            {// 主要显示在二级展开时表明当前是属于哪个上一级的
            selectItems[level] ? (
							<div className="selectItem">{selectItems[level]}</div>
						) : null}
					</div>
				)})}
			</div>
		</div>
	);
};

export default Linkage;
