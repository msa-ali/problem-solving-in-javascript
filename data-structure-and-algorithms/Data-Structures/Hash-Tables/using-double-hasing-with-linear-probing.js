function HashTable(size) {
  this.size = size;
  this.keys = Array(size);
  this.values = Array(size);
  this.limit = 0;
}

HashTable.prototype.set = function (key, value) {
  if (this.limit >= this.size) throw "hash table is full";
  let hashedIndex = this.hash(key);
  // Quadratic Probing
  while (this.keys[hashedIndex]) {
    hashedIndex++;
    hashedIndex = hashedIndex % this.size;
  }
  this.keys[hashedIndex] = key;
  this.values[hashedIndex] = value;
  this.limit++;
};

HashTable.prototype.get = function (key) {
  let hashedIndex = this.hash(index);
  while (this.keys[hashedIndex] !== key) {
    hashedIndex++;
    hashedIndex = hashedIndex % this.size;
  }
  return this.values[hashedIndex];
};

HashTable.prototype.hash = function (key) {
  if (!Number.isInteger(key)) throw "Key must be int";
  return this.secondHash(key % this.size);
};

HashTable.prototype.secondHash = function (hashedKey) {
  var R = this.size - 2;
  return R - (hashedKey % R);
};

const hashtable = new HashTable(13);
hashtable.set(7, "hi");
hashtable.set(20, "hello");
hashtable.set(33, "sunny");
hashtable.set(46, "weather");
hashtable.set(59, "wow");
hashtable.set(72, "forty");
hashtable.set(85, "happy");
hashtable.set(98, "sad");

console.log(hashtable.keys);
console.log(hashtable.values);
console.log(hashtable);
