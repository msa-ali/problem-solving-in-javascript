export default function deepEqual(valueA: unknown, valueB: unknown): boolean {
    if (typeof valueA != typeof valueB) {
      return false;
    }
  
    if (typeof valueA != "object" || valueA === null || valueB === null) {
      return valueA === valueB;
    }
  
    // now, handle objects or arrays
  
    // arrays
    if (Array.isArray(valueA) !== Array.isArray(valueB)) {
      return false;
    }
  
    if (Array.isArray(valueA)) {
      const arrA = valueA as Array<unknown>;
      const arrB = valueB as Array<unknown>;
      if (arrA.length !== arrB.length) {
        return false;
      }
      for (let i = 0; i < arrA.length; i++) {
        if (!deepEqual(arrA[i], arrB[i])) {
          return false;
        }
      }
      return true;
    }
  
    // objects
  
    // Set
    if (valueA instanceof Set !== valueB instanceof Set) {
      return false;
    }
  
    if (valueA instanceof Set) {
      const setA = valueA as Set<unknown>;
      const setB = valueB as Set<unknown>;
      if (setA.size !== setB.size) {
        return false;
      }
      for (let value of setA) {
        if (!setB.has(value)) {
          return false;
        }
      }
      return true;
    }
  
    // map
    if (valueA instanceof Map !== valueB instanceof Map) {
      return false;
    }
    if (valueA instanceof Map) {
      const mapA = valueA as Map<unknown, unknown>;
      const mapB = valueB as Map<unknown, unknown>;
      const keysA = Array.from(mapA.keys());
      const keysB = Array.from(mapB.keys());
      if (keysA.length !== keysB.length) {
        return false;
      }
      for (let key of keysA) {
        if (!mapB.has(key) || !deepEqual(mapA.get(key), mapB.get(key))) {
          return false;
        }
      }
      return true;
    }
  
    // both valueA and valueB are objects
    const objA = valueA as any;
    const objB = valueB as any;
  
    if (Object.keys(objA).length !== Object.keys(objB).length) {
      return false;
    }
    for (let key of Object.keys(objA)) {
      if (!(key in objB)) {
        return false;
      }
      if (!deepEqual(objA[key], objB[key])) {
        return false;
      }
    }
    return true;
  }
  