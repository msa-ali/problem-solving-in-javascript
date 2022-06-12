var threeSum = (nums) => {
    if(nums.length < 3) return [];
    const result = [];
    nums.sort((a, b) => a - b);
    for(let i=0; i< nums.length; i++) {
        if(i > 0 && nums[i] === nums[i-1]) continue;
        let left = i + 1;
        let right = nums.length - 1;
        const target  = -nums[i];
        while(left < right) {
            if(nums[left] + nums[right] === target) {
               result.push([-target, nums[left], nums[right], ]);
                left += 1;
                right -= 1;
                while(left < right && nums[left] === nums[left-1]) left+=1;
                while(left < right && nums[right] === nums[right+1]) right-=1;
            } else if(nums[left] + nums[right] > target) {
                right -= 1;
            } else {
                left += 1;
            }
        }
    }
    return result;
}

console.log(threeSum([-1,0,1,2,-1,-4]));