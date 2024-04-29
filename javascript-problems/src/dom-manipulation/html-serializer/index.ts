type Element = { tag: string; children: Array<string | Element> };
  
const NEWLINE = "\n";
const TAB = "\t"

export default function serializeHTML(element: Element, level = 1): string {
    let output = `<${element.tag}>`;
    for(let child of element.children) {
        const el = typeof child === 'string' ? child : serializeHTML(child, level+1);
        output += `${NEWLINE}${TAB.repeat(level)}${el}`
    }
    output += `${NEWLINE}${TAB.repeat(level-1)}</${element.tag}>`
    return output; 
}