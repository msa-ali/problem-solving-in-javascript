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