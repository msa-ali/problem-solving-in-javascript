/**
 * Given the root of a binary tree, imagine yourself standing on the right side of it, 
 * return the values of the nodes you can see ordered from top to bottom.
 * https://leetcode.com/problems/binary-tree-right-side-view/
 * 
 */


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var rightSideView = function(root, result = [],level = 0, levelsCompleted = []) {
    if( !root) return result;
    level++;
    if(!levelsCompleted.includes(level)) {
        result.push(root.val);
        levelsCompleted.push(level);
    }
    result = rightSideView(root.right, result, level, levelsCompleted);
    result = rightSideView(root.left, result,level, levelsCompleted);
    return result;
};



/**diff approach */
class TreeNode {

    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null; 
    }
  };
  
  const tree_right_view = function(root) {
    const result = [];
    if(root) {
      const queue = [root];
      while(queue.length) {
        const currentLevelSize = queue.length;
        result.push(queue[currentLevelSize-1].value);
        for(let i=0; i< currentLevelSize; i++) {
          const curr = queue.shift();
          if(curr.left) queue.push(curr.left);
          if(curr.right) queue.push(curr.right);
        }
      }
    }
    return result;
  };
  
  
  var root = new TreeNode(12);
  root.left = new TreeNode(7);
  root.right = new TreeNode(1);
  root.left.left = new TreeNode(9);
  root.right.left = new TreeNode(10);
  root.right.right = new TreeNode(5);
  root.left.left.left = new TreeNode(3);
  console.log("Tree right view: " + tree_right_view(root))