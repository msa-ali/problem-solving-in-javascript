## Hash Table

- A Hash table is a fixed size data structure and is excellant for quick storage of data based on key value pairs.

- A Hash table contains two functions:
  set() - used for storing data into hash tables
  get() - used for retrieving data from hash tables

- Both of these functions have time complexity of O(1).

- A Hash Table is analogous to an array whose index is calculated with a hashing function to identify a space in memory uniquely.

- The most important part of a hash table is the hash function. It converts a specified key into an index for an array that stores all the data.

- The three primary requirements for a good hash fns are:
  - Deterministic : Equal keys produce equal hash values
  - Efficiency: O(1) in time
  - Uniform distribution

## Prime Number hashing

Modulus division using prime numbers yields an array index in a distributed manner.

Modulus number: 11
4 % 11 = 4
7 % 11 = 7
15 % 11 = 4

Collision can be seen with 15 and 4 yielding the same key.

## Probing

To work around collisions occurance, probing technique find the next available index in the array.

Linear Probing - finds the next available index by incrementing one index at a time. The main disadvantage of this technique is it easily creates clusters which are bad as they create more data to iterate through.

Quadratic Probing - Uses perfect squares to find next available index and helps in evenly distribute indices.

Rehasing/Double Hashing - Another way to uniformly distribute the keys is by having a second hasing function that hashes the result fron the original.

Primary requirements for a good second hashing function:

- Different : Needs to be Different to distribute it better
- Efficiency: O(1)
- Non zero: should never evaluate to zero

A commonly used second hashing function is:

hash2(x) = R - (x % R);

where
x - result from the hashing function the first time
R - less than the size of the hash table

Each hash collision is resolved by the following where i is the iteration trail number:

i \* hash2(x)
