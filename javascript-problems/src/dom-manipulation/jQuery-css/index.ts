interface JQuery {
    css: (
      prop: string,
      value?: boolean | string | number,
    ) => JQuery | string | undefined;
  }
  
  export default function $(selector: string): JQuery {
    const el = document.querySelector(selector);
    return {
      css: function (prop, value) {
        if (value === undefined) {
          if (el === null) {
            return undefined;
          }
          // @ts-ignore
          return el.style[prop] === "" ? undefined : el.style[prop];
        }
        // @ts-ignore
        if (el !== null && el.style !== undefined) {
            // @ts-ignore
           el.style[prop] = value;
        }
       
        return this;
      },
    }
  }