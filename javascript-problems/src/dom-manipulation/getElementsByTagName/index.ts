export default function getElementsByTagName(
    el: Element,
    tagName: string,
  ): Array<Element> {
    const elements: Array<Element> = [];
    
    const traverse = (el: Element, ignoreSelf = false) => {
      if (el === null) {
        return;
      }
      if(!ignoreSelf && el.tagName === tagName.toUpperCase()) {
        elements.push(el)
      }
      for(const child of el.children) {
        traverse(child)
      }
    }
    traverse(el, true);
    return elements;
  }
  
  