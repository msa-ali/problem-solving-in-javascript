/*
    There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. 
    You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates 
    that you must take course bi first if you want to take course ai.

    For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
    Return true if you can finish all courses. Otherwise, return false.

    Example 1:

    Input: numCourses = 2, prerequisites = [[1,0]]
    Output: true
    Explanation: There are a total of 2 courses to take. 
    To take course 1 you should have finished course 0. So it is possible.

    Example 2:

    Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
    Output: false
    Explanation: There are a total of 2 courses to take. 
    To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
    https://leetcode.com/problems/course-schedule/
*/

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
 var canFinish = function(numCourses, prerequisites) {
    const inDegree = new Array(numCourses).fill(0);
    const adjList = inDegree.map(() => []);

    for(let i = 0; i< prerequisites.length; i++) {
        const [course, prerequisite] = prerequisites[i];
        inDegree[course]++;
        adjList[prerequisite].push(course);
    }

    const stack = [];

    for(let i = 0; i < inDegree.length; i++) {
        if(inDegree[i] === 0) {
            stack.push(i);
        }
    }

    let count = 0;

    while(stack.length) {
        const current = stack.pop();
        count++;
        const adjacents = adjList[current];
        for(const adjacent of adjacents) {
            inDegree[adjacent] -= 1;
            if(inDegree[adjacent] === 0) {
                stack.push(adjacent);
            }
        }
    }

    return count === numCourses;
};