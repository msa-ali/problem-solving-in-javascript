class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
};


const traverse = function (root) {
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
            result.push(currentLevel);
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
console.log(`Level order traversal: ${traverse(root).join(',')}`);