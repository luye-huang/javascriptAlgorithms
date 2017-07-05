/**
 * Created by luye on 04/07/2017.
 */
var testArray = new Array(1000).fill(100);
// 15
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  //必须要先排序,不然去重后患无穷
  const result = [];
  let keys = '';
  // console.time('order')
  // const ordered = result.sort(function (a, b) {
  //   return a - b
  // });
  // console.timeEnd('order')
  let index = [];
  const map = new Map();
  if (nums.length < 2) {
    return [];
  }
  console.time('h');
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      index = [];
      index.push(i);
      index.push(j);
      map.set(index, nums[i] + nums[j]);
    }
  }
  // console.timeEnd('h');
  for (let [key, value] of map.entries()) {
    for (let i = 0; i < nums.length; i++) {
      if (key.includes(i))continue;
      if (nums[i] + value === 0) {
        let temp = [];
        temp.push(nums[key[0]]);
        temp.push(nums[key[1]]);
        temp.push(nums[i]);
        temp = temp.sort((a, b)=>a - b);
        const str = temp.toString();
        // if (result.find((item)=>item.toString() === temp.toString())) {
        //   continue;
        // }
        //用字符串判断更高效
        if(!keys.includes(str)){
          keys += str;
          keys += '$$$';
          result.push(temp);
        }
      }
    }
  }
  console.timeEnd('h');
  return result;
};
console.log(threeSum([-13, 5, 13, 12, -2, -11, -1, 12, -3, 0, -3, -7, -7, -5, -3, -15, -2, 14, 14, 13, 6, -11, -11, 5, -15, -14, 5, -5, -2, 0, 3, -8, -10, -7, 11, -5, -10, -5, -7, -6, 2, 5, 3, 2, 7, 7, 3, -10, -2, 2, -12, -11, -1, 14, 10, -9, -15, -8, -7, -9, 7, 3, -2, 5, 11, -13, -15, 8, -3, -7, -12, 7, 5, -2, -6, -3, -10, 4, 2, -5, 14, -3, -1, -10, -3, -14, -4, -3, -7, -4, 3, 8, 14, 9, -2, 10, 11, -10, -4, -15, -9, -1, -1, 3, 4, 1, 8, 1]))

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
// /**
//  * @param {number} s
//  * @param {number[]} nums
//  * @return {number}
//  */
// var minSubArrayLen = function (s, nums) {
//   if (nums.length == 0) return 0;
//   var result = nums.length + 1;
//   var l = 0, r = 0, temp = nums[0];
//   while (l <= r && r < nums.length) {
//     var len = r - l + 1;
//     if (temp >= s) {
//       result = Math.min(len, result);
//       if (l == r) {
//         return result;
//       }
//       else {
//         temp -= nums[l++];
//       }
//     }
//     else {
//       if (len < result) {
//         r++;
//         if (r < nums.length) {
//           temp += nums[r];
//         }
//         else {
//           break;
//         }
//       }
//       //如果已有比目前长度更小的解,只需滑动不需扩展右边界
//       else {
//         temp -= nums[l++];
//         r++;
//         if (r < nums.length) {
//           temp += nums[r];
//         }
//         else {
//           break;
//         }
//       }
//     }
//   }
//   return result == nums.length + 1 ? 0 : result;
// };
// console.log(minSubArrayLen(15, [5,1,3,5,10,7,4,9,2,8]));

// 290
// /**
//  * @param {string} pattern
//  * @param {string} str
//  * @return {boolean}
//  */
// var wordPattern = function (pattern, str) {
//   var map = {}, _map = {};
//   var arr = str.split(' ');
//   if (pattern.length !== arr.length) return false;
//   for (var i = 0; i < pattern.length; i++) {
//     if (!map[pattern.charAt(i)]) {
//       map[pattern.charAt(i)] = arr[i];
//     }
//     else if (map[pattern.charAt(i)] !== arr[i]) {
//       return false;
//     }
//     //防止 "abba", "dog dog dog dog", 再加一个对象反过来存放键值
//     if(!_map[arr[i]]){
//       _map[arr[i]] = pattern.charAt(i);
//     }
//     else if (_map[arr[i]] !== pattern.charAt(i)) {
//       return false;
//     }
//   }
//   return true;
// };
// console.log(wordPattern("abba", "dog dog dog dog"))

// 451
// /**
//  * @param {string} s
//  * @return {string}
//  */
// var frequencySort = function (s) {
//   var dict = {};
//   for (var i = 0; i < s.length; i++) {
//     if (dict[s.charAt(i)]) {
//       dict[s.charAt(i)]++;
//     }
//     else {
//       dict[s.charAt(i)] = 1;
//     }
//   }
//   return frequencySortArrayfy(dict);
// };
//
// function frequencySortArrayfy(obj) {
//   //每存一个,从头循环数组其余,插入到第一个不大于其的前面
//   var arr = [];
//   //同步算字符串,用label找到字符串中需要插入的index,用substring插入
//   var result = '';
//   for (var prop in obj) {
//     var str = '';
//     for (var i = 0; i < obj[prop]; i++) {
//       str += prop;
//     }
//     if (arr[0] === undefined) {
//       arr.push({count: obj[prop]});
//       result += str;
//     }
//     else {
//       var label = 0;
//       for (var i = 0; i < arr.length; i++) {
//         if (obj[prop] >= arr[i].count) {
//           var arr1 = arr.slice(0, i);
//           var arr2 = arr.slice(i, arr.length);
//           arr1.push({count: obj[prop]});
//           arr = [].concat(arr1, arr2);
//           var str1 = result.substring(0, label);
//           var str2 = result.substring(label);
//           result = str1 + str + str2;
//           break;
//         }
//         else {
//           label += arr[i].count;
//           if (i == arr.length - 1) {
//             result += str;
//             arr.push({count: obj[prop]});
//             break;
//           }
//         }
//       }
//     }
//   }
//   return result;
// }
// console.log(frequencySort("abaccadeeefaafcc"));