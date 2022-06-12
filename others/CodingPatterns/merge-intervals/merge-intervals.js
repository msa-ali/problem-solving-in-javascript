/*
    https://leetcode.com/problems/merge-intervals/
    Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, 
    and return an array of the non-overlapping intervals that cover all the intervals in the input.

    Example 1:
    Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
    Output: [[1,6],[8,10],[15,18]]
    Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].

    Example 2:
    Input: intervals = [[1,4],[4,5]]
    Output: [[1,5]]
    Explanation: Intervals [1,4] and [4,5] are considered overlapping.

    Algorithm:
    Sort the intervals on the start time to ensure a.start <= b.start
    If ‘a’ overlaps ‘b’ (i.e. b.start <= a.end), we need to merge them into a new interval ‘c’ such that:
        c.start = a.start
        c.end = max(a.end, b.end)
    We will keep repeating the above two steps to merge ‘c’ with the next interval if it overlaps with ‘c’.

*/


/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
 var merge = function(intervals) {
    let result = [];
    intervals.sort((a,b) => a[0] - b[0]);
    let [start, end] = intervals[0];
    for(let interval of intervals.slice(1)) {
        const [intervalStart, intervalEnd] = interval;
        if(intervalStart <= end) {
            end = Math.max(end, intervalEnd);
        } else {
            result.push([start, end]);
            start = intervalStart;
            end = intervalEnd;
        }
    }
    result.push([start, end]);
    return result;
};

// Similar Problem

/*
    Problem 1: Given a set of intervals, find out if any two intervals overlap.
    Example:
    Intervals: [[1,4], [2,5], [7,9]]
    Output: true
    Explanation: Intervals [1,4] and [2,5] overlap
*/