// @ts-nocheck
export default function identicalDOMTrees(nodeA: Node, nodeB: Node): boolean {
    if(nodeA.nodeType !== nodeB.nodeType || nodeA.nodeName !== nodeB.nodeName) {
        return false;
    }
    if(nodeA.nodeType === Node.TEXT_NODE) {
        return nodeA.textContent === nodeB.textContent
    }
    if(nodeA.childNodes.length !== nodeB.childNodes.length) {
        return false;
    }
    if(nodeA.attributes.length !== nodeB.attributes.length) {
        return false;
    }
    const hasSameAttributes = (nodeA as Element)
        .getAttributeNames()
        .every(
            attr => (nodeA as Element).getAttribute(attr) === (nodeB as Element).getAttribute(attr)
        );
    if(!hasSameAttributes) {
        return false;
    }

    let i = 0;
    const n = nodeA.childNodes.length;
    while(i < n) {
        const res = identicalDOMTrees(nodeA.childNodes[i], nodeB.childNodes[i])
        if (!res) {
            return false;
        }
        i++;
    }
    return true;
  }

//   export default function identicalDOMTrees(treeA, treeB) {
//     return treeA.isEqualNode(treeB);
//   }