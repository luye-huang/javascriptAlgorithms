/**
 * Created by luye on 04/07/2017.
 */
// 167
// var twoSum = function(numbers, target) {
//   var result = [];
//   for(var i = 0, j = numbers.length-1; i < j;){
//     if(numbers[i]+numbers[j]>target){
//       j--;
//     }
//     else if(numbers[i]+numbers[j]<target){
//       i++;
//     }
//     else{
//       result.push(++i);
//       result.push(++j);
//       return result;
//     }
//   }
//   return result;
// };
// console.log(twoSum([1,4,5],6));

// 209
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
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