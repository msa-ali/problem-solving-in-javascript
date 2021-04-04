## Dynamic Programming

Dynamic programming involves breaking down problems into their subproblems. By solving for the optimal subproblems and saving those results into memory to access them whenever a repeated problem needs to be solved, the algorithmic complexity decreases significantly.

Dynamic programming (DP) is the method of storing values that were already calculated and using those values to avoid any recalculations (typically in a recursive algorithm). This method can be applied only to those problems with overlapping subproblems and optimal substructure.

## OVERLAPPING SUBPROBLEMS

Similar to divide and conquer in recursion, DP combines solutions on subproblems. DP is used when solutions for subproblems are needed multiple times. It stores subproblem solutions typically in a hash table, an array, or a matrix, and this is referred to as memoization .

## OPTIMAL SUBSTRUCTURE

An optimal substructure is when the optimal solution of a problem can be found by using the optimal solutions of its subproblems.

For example, the shortest path finding algorithms have optimal substructures. Consider finding the shortest path for traveling between cities by car. If the shortest route from Los Angeles to Vancouver passes through San Francisco and then Seattle, then the shortest route from San Francisco to Vancouver must pass through Seattle as well.
