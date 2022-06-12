/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node, visited = {}) {
    if (!node) return null;
    const { val, neighbors } = node;
    const newNode = new Node(val);
    visited[val] = newNode;
    for (let p in neighbors) {
        let x = visited[neighbors[p].val];
        if (!x) {
            newNode.neighbors.push(cloneGraph(neighbors[p], visited))
        } else {
            newNode.neighbors.push(x);
        }
    }
    return newNode;
};