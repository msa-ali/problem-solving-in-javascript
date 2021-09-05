/*
    This problem follows the Binary Tree Level Order Traversal pattern. 
    We can follow the same BFS approach. 
    The only difference will be that instead of appending the current level at the end, 
    we will append the current level at the beginning of the result list.
 */

class TreeNode {

    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null; 
    }
  };
  
  const traverse = function(root) {
    const result = [];
      if (root) {
          const queue = [root];
          while (queue.length) {
              let levelSize = queue.length;
              const currentLevel = [];
              for (let i = 0; i < levelSize; i++) {
                  const current = queue.shift();
                  currentLevel.push(current.value);
                  if (current.left) queue.push(current.left);
                  if (current.right) queue.push(current.right);
              }
              result.unshift(currentLevel);
          }
      }
      return result;
  }
  
  var root = new TreeNode(12)
  root.left = new TreeNode(7)
  root.right = new TreeNode(1)
  root.left.left = new TreeNode(9)
  root.right.left = new TreeNode(10)
  root.right.right = new TreeNode(5)
  console.log(`Reverse level order traversal: ${traverse(root)}`)