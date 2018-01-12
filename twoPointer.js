/**
 * Created by luye on 10/01/2018.
 */

// 15
/**
 * @param {number[]}
 * @return {number[][]
 * use two pointers
 */
var threeSum = function (nums) {
  console.time('all');
  const res = [];
  if (nums.length < 4) {
    if (nums[0] + nums[1] + nums[2] === 0) {
      return [nums];
    }
    return res;
  }
  const sorted = nums.sort((a, b)=>a - b);
  let zeroCount = 0;
  const sortedLessThan2 = [];
  sorted.forEach((value, index, array)=> {
    if (value === 0) zeroCount++;
    if (index > 1 && array[index] === array[index - 1] && array[index] === array[index - 2]) {
    }
    else {
      sortedLessThan2.push(value);
    }
  });
  if (zeroCount > 2)res.push([0, 0, 0]);
  for (let i = 0; i < sortedLessThan2.length - 2; i++) {
    if (i > 0 && sortedLessThan2[i] === sortedLessThan2[i - 1])continue;
    let j = i + 1, k = sortedLessThan2.length - 1;
    while (j < k) {
      if (sortedLessThan2[i] + sortedLessThan2[j] + sortedLessThan2[k] === 0) {
        res.push([sortedLessThan2[i], sortedLessThan2[j], sortedLessThan2[k]]);
        j++;
        if (sortedLessThan2[j] === sortedLessThan2[j - 1])j++;
        k--;
        if (sortedLessThan2[k] === sortedLessThan2[k + 1])k--;
      }
      else if (sortedLessThan2[i] + sortedLessThan2[j] + sortedLessThan2[k] < 0) {
        j++;
        if (sortedLessThan2[j] === sortedLessThan2[j - 1])j++;
      }
      else if (sortedLessThan2[i] + sortedLessThan2[j] + sortedLessThan2[k] > 0) {
        k--;
        if (sortedLessThan2[k] === sortedLessThan2[k + 1])k--;
      }
    }
  }
  console.timeEnd('all');
  return res;
}
var arr1 = [-1, 0, 1, 0];
var short = [-1, 0, 1, 2, -1, -4];
// console.log(threeSum(arr1));
// console.log(threeSum([0, 0, 0, 0]));

// 167
var twoSum = function(numbers, target) {
  var result = [];
  for(var i = 0, j = numbers.length-1; i < j;){
    if(numbers[i]+numbers[j]>target){
      j--;
    }
    else if(numbers[i]+numbers[j]<target){
      i++;
    }
    else{
      result.push(++i);

      result.push(++j);
      return result;
    }
  }
  return result;
};
// console.log(twoSum([1,4,5],6));


// 209
// /**
//  * @param {number} s
//  * @param {number[]} nums
//  * @return {number}
//  */
var minSubArrayLen = function (s, nums) {
  if (nums.length == 0) return 0;
  var result = nums.length + 1;
  var l = 0, r = 0, temp = nums[0];
  while (l <= r && r < nums.length) {
    var len = r - l + 1;
    if (temp >= s) {
      result = Math.min(len, result);
      if (l == r) {
        return result;
      }
      else {
        temp -= nums[l++];
      }
    }
    else {
      if (len < result) {
        r++;
        if (r < nums.length) {
          temp += nums[r];
        }
        else {
          break;
        }
      }
      //如果已有比目前长度更小的解,只需滑动不需扩展右边界
      else {
        temp -= nums[l++];
        r++;
        if (r < nums.length) {
          temp += nums[r];
        }
        else {
          break;
        }
      }
    }
  }
  return result == nums.length + 1 ? 0 : result;
};
console.log(minSubArrayLen(15, [5,1,3,5,10,7,4,9,2,8]));
