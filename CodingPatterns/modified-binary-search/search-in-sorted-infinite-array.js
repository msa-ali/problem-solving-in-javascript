class ArrayReader {

    constructor(arr) {
      this.arr = arr;
    }
  
    get(index) {
      if (index >= this.arr.length)
        return Number.MAX_SAFE_INTEGER;
      return this.arr[index]
    }
  };
  
  
  const search_in_infinite_array = function(reader, key) {
    let start = 0, end = 1;
    while(reader.get(end) < key) {
        const newStart = end + 1;
        end += (end - start + 1) * 2;
        start = newStart;
    }
    return binary_search(reader, key, start, end);
  };

  const binary_search = (reader, key, start, end) => {
      while(start <= end) {
          const mid = Math.floor(start+ (end - start)/2);
          if(reader.get(mid) === key) return mid;
          else if( reader.get(mid) > key) {
              end = mid - 1;
          }
          else start = mid + 1;
      }
      return -1;
  }
  
  var reader = new ArrayReader([4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30]);
  console.log(search_in_infinite_array(reader, 16))
  console.log(search_in_infinite_array(reader, 11))
  reader = new ArrayReader([1, 3, 8, 10, 15])
  console.log(search_in_infinite_array(reader, 15))
  console.log(search_in_infinite_array(reader, 200))