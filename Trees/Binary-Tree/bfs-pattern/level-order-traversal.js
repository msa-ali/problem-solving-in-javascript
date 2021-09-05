/**
 * https://leetcode.com/problems/binary-tree-level-order-traversal/
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var levelOrder = function(root) {
    const queue = [ root ];
    const result = [];
    let currentLevelElements = [];
    let count = 0;
    let queueLength = queue.length;
    while(queue.length) {
        const node = queue.shift();
        if(!node) break;
        count++;
        currentLevelElements.push(node.val);
        if(node.left) queue.push(node.left);
        if(node.right) queue.push(node.right);
        if(count === queueLength) {
            result.push(currentLevelElements);
            currentLevelElements = [];
            count = 0;
            queueLength = queue.length;
        }
    }
    return result;
};