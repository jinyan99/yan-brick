/**
 *                               _(\_/)
                             ,((((^`\
                            ((((  (6 \
                          ,((((( ,    \
      ,,,_              ,(((((  /"._  ,`,
     ((((\\ ,...       ,((((   /    `-.-'
     )))  ;'    `"'"'""((((   (
    (((  /            (((      \
     )) |                      |
    ((  |        .       '     |
    ))  \     _ '      `t   ,.')
    (   |   y;- -,-""'"-.\   \/
    )   / ./  ) /         `\  \
       |./   ( (           / /'
       ||     \\          //'|
       ||      \\       _//'||
       ||       ))     |_/  ||
       \_\     |_/          ||
       `'"                  \_\
                            `'"
 */
import OriginTree, { TreeProps } from './tree';
import TreeNode, { TreeNodeProps } from './treeNode';
declare type OriginTreeType = typeof OriginTree;
interface TreeType extends OriginTreeType {
    TreeNode: typeof TreeNode;
}
declare const Tree: TreeType;
export { TreeNode, Tree };
export type { TreeNodeProps, TreeProps };
export default Tree;
