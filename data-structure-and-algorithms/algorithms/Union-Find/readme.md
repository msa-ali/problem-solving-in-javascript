# Union-Find

## Dynamic Connectivity

Given a set of n objects:

- Union command - connect two objects
- Find / connected query - is there a path connecting two nodes?

## Quick-Find (eager approach)

- Integer array id[] of size N
- Interpretation: p and q are connect if they have the same id.

## Quick Union

- Integer array id[] of size N
- Interpretation:id[i] is parent of i.
- Root of i is id[id[id[...id[i]...]]] ( keep going untill it doesnt change ) - algorithm ensures no cycle.
- Find - Check if p and q have same root.
- Union - To merge components containing p and q, set the id of p's root to the id of q's root.

## Quick Union Improvement - Weighing Quick-Union

- Modify quick-union to avoid tall trees.
- keep track of size of each tree.
- Balance by linking root of smaller tree to root of larger tree.

## Quic Union Improvement 2 - Path Compression

- Just after computing the root of p, set the id of each examined node to point to that root.

## Weighted Quick-Union with path compression

- Starting from an empty data structure, any sequence of M union-find ops on N objects  makes =<  c(N + Mlog*N) array access.
- Analysis can be improved to N + M @a (M,N).