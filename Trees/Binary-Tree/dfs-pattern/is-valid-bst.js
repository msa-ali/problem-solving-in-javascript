const isValidBST = (root) => {
    if(!root) return true;

    return dfs(root, -Infinity, Infinity);
}

const dfs = (node, min, max) => {
    if(node.val <= min && node.value >= max) {
        return false;
    }
    if(node.left) {
        if(!dfs(node.left, min, node.val)) {
            return false;
        }
    }

    if(node.right) {
        if(!dfs(node.right, node.val, max)) {
            return false;
        }
    }
    return true;
}