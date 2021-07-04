/**
 * https://leetcode.com/problems/minimum-size-subarray-sum/
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    let windowStart = windowEnd = 0;
    let sum = 0;
    let result = Number.POSITIVE_INFINITY;
    for (windowEnd = 0; windowEnd < nums.length; windowEnd++) {
        const current = nums[windowEnd];
        if (current === target) return 1;
        sum += current;
        if (sum >= target) {
            result = Math.min(result, windowEnd - windowStart + 1);
            console.log(result);
            while (sum >= target) {
                sum -= nums[windowStart];
                windowStart++;
                if (sum >= target)
                    result = Math.min(result, (windowEnd - windowStart) + 1);
            }
        }
    }
    return result === Number.POSITIVE_INFINITY ? 0 : result;
};

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
