class BinaryTreeNode {
    constructor(val) {
        this.value= val;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this._root = null;
    }
    /**
     * Pre-order traversal visits nodes in the following order: root (the current node), left, right.
     * @param {*} recursive Implementation Type
     */
    preorder(recursive = true) {
        recursive ? traversePreOrderRecursive(this._root) : traversePreOrderIterative(this._root) ;
    }
    /**
     * In-order traversal visits nodes in the following order: left, root (current node), right.
     * @param {*} recursive Implementation Type
     */
    inorder(recursive = true) {
        recursive ? traverseInOrderRecursive(this._root) : traverseInOrderIterative(this._root) ;
    }

}

const traversePreOrderRecursive = (root) => {
    if(root) {
        console.log(root.value);
        traversePreOrder(root.left);
        traversePreOrder(root.right);
    } 
};

const traversePreOrderIterative = (root) => {
    let nodeStack = [];
    nodeStack.push(root);
    while(nodeStack.length) {
        let temp = nodeStack.pop();
        if(temp) {
            console.log(temp.value);
            if(temp.right) nodeStack.push(temp.right);
            if(temp.left) nodeStack.push(temp.left);
        }
    }
};

const traverseInOrderRecursive = (root) => {
    if(root) {
        traversePreOrder(root.left);
        console.log(root.value);
        traversePreOrder(root.right);
    } 
};

const traversePreOrderIterative = (root) => {
    let nodeStack = [];
    let done = false;
    let current = root;
    while(!done) {
        if(current) {
            nodeStack.push(current);
            current = current.left;
        } else {
            if(nodeStack.length) {
                current = nodeStack.pop();
                console.log(current.value);
                current = current.right;
            } else {
                done = true;
            }
        }
    }
};



