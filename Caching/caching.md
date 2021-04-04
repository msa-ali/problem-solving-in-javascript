## Caching

- Caching is the process of storing data into temporary memory so that it can be easily retrieved for later use if it is required again.

- In caching ,the goal is to maximise hits(an item is in the cache when requested) and minimize misses( an item is not in the cache when requested).

- Cache design generally considers two factors:
  1. Temporal Locality - A memory location that has been recently accessed is likely to be access again
  2. Spatial Locality - A memory location near one that has recently been accessed is likely to be accessed again.

## Two caching techniques

1. Least Frequently Used ( LFU )
2. Least Recently Used ( LRU )

## Least Frequently Used ( LFU )

- It is a caching algorithm used by OS to manage memory. The system tracks the number of times a block is referenced in the memory.

- By design, when the cache exceeds its limit, the system deletes the item with the lowest reference frequency.

- LFU is uncommon as when an item in memory is referened repeatedly for a short amt of time, the frequency for that block is high but this forces the system to delete other blocks tht may be used more frequently outside the short block of time. Also new items in the system are susceptible to being deleted quickly because of their lower frequency of being accessed.

- SOME USECASE OF LFU - MOBILE KEYBOARD APPS. Suggested workds appear on the keyboard apps and it makes sense to implement this using LFU caching since the user likely uses the same words often.
