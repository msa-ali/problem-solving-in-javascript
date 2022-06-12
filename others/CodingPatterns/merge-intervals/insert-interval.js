/*
    You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return intervals after the insertion.

 

Example 1:

Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
Example 2:

Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
Example 3:

Input: intervals = [], newInterval = [5,7]
Output: [[5,7]]
Example 4:

Input: intervals = [[1,5]], newInterval = [2,3]
Output: [[1,5]]
Example 5:

Input: intervals = [[1,5]], newInterval = [2,7]
Output: [[1,7]]
*/

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
 var insert = function(intervals, newInterval) {
    if(!intervals.length) {
        return [newInterval];
    }
    const result = [];
    const [newIntervalStart, newIntervalEnd] = newInterval;
    let start, end, index = 0;
    for([start, end] of intervals) {
        if(end >= newIntervalStart) {
            break;
        }
        index++;
    }
    console.log(index);
    console.log(start, end);
    if(index === 0) {
        if(newIntervalEnd < start) return [newInterval, ...intervals];
        if(newIntervalStart > end) return [...intervals, newInterval];
    }
    if(index === intervals.length) {
        console.log("inside")
        if(newIntervalStart <= end) {
            const newStart = Math.min(start, newIntervalStart);
            const newEnd = Math.max(end, newIntervalEnd);
            return [...intervals.slice(0,index), [newStart, newEnd]]
        }
        return [...intervals, newInterval];
    }
    result.push(...intervals.slice(0, index));
    // console.log(result);
    let newStart = start, newEnd = end;
    if(newIntervalEnd < start) {
        newStart = newIntervalStart;
        newEnd = newIntervalEnd;
    } else if(end >= newIntervalStart) {
        newStart = Math.min(start, newIntervalStart);
        newEnd = Math.max(end, newIntervalEnd);
    }
    
    // console.log(newStart, newEnd);
    for(let interval of intervals.slice(index)) {
        if(interval[0] <= newEnd) {
            newStart = Math.min(newStart, interval[0]);
            newEnd = Math.max(newEnd, interval[1]);
        } else {
            result.push([newStart, newEnd])
            newStart = interval[0];
            newEnd = interval[1];
        }
    }
    result.push([newStart, newEnd]);
    return result;
};