/*
    Find the minimum depth of a binary tree. 
    The minimum depth is the number of nodes along the shortest path from the root node to the nearest leaf node.
 */

class TreeNode {

    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null; 
    }
  };
  
  
  const find_minimum_depth = function(root) {
    let depth = 0;
    if(root) {
      const queue = [root];
      while(queue.length) {
        depth++;
        const currentLevelSize = queue.length;
        for(let i=0; i < currentLevelSize; i++) {
          const current = queue.shift();
          if(!current.left && !current.right) return depth;
          if(current.left) queue.push(current.left);
          if(current.right) queue.push(current.right);
        }
      }
    }
    return depth;
  };
  
  
  
  var root = new TreeNode(12)
  root.left = new TreeNode(7)
  root.right = new TreeNode(1)
  root.right.left = new TreeNode(10)
  root.right.right = new TreeNode(5)
  console.log(`Tree Minimum Depth: ${find_minimum_depth(root)}`)
  root.left.left = new TreeNode(9)
  root.right.left.left = new TreeNode(11)
  console.log(`Tree Minimum Depth: ${find_minimum_depth(root)}`)