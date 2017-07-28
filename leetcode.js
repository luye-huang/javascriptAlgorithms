/**
 * Created by luye on 04/07/2017.
 */
var testArray = new Array(1000).fill(100);
// 15
// /**
//  * @param {number[]}
//  * @return {number[][]}
//  * use map to store combinations of 2 elements, exceed time limit
//  */
// var threeSum = function (nums) {
//   const result = [];
//   console.time('all');
//   let hasTwoZero = false;
//   const map = new Map();
//   if (nums.length < 3) {
//     return [];
//   }
//   console.time('sorting');
//   const sorted = nums.sort((a, b)=>a - b);
//   // console.timeEnd('sorting');
//   const sortedLessThan2 = [], setDuplicate = new Set();
//   sorted.forEach((value, index, array)=> {
//     if (index > 0 && array[index] === array[index - 1]) {
//       if (value === 0) {
//         if (hasTwoZero) {
//           setDuplicate.add(value);
//         }
//         else {
//           hasTwoZero = true;
//         }
//       }
//       else {
//         setDuplicate.add(value);
//       }
//     }
//     if (index > 1 && array[index] === array[index - 1] && array[index] === array[index - 2]) {
//     }
//     else {
//       sortedLessThan2.push(value);
//     }
//   });
//   console.timeEnd('sorting');
//   console.time('mapping');
//   const min = sortedLessThan2[0] + sortedLessThan2[1];
//   const max = sortedLessThan2[sortedLessThan2.length - 2] + sortedLessThan2[sortedLessThan2.length - 1];
//   const first = sortedLessThan2[0];
//   const last = sortedLessThan2[sortedLessThan2.length - 1];
//   for (let i = 0; i < sortedLessThan2.length - 1; i++) {
//     if (sortedLessThan2[i] > 0 - min)break;
//     else if (sortedLessThan2[i] < 0 - max)continue;
//     for (let j = i + 1; j < sortedLessThan2.length; j++) {
//       const val = sortedLessThan2[i] + sortedLessThan2[j];
//       if (val > 0 - first)break;
//       else if (val < 0 - last)continue;
//       if (map.has(val)) {
//         map.get(val).add(sortedLessThan2[i] + ',' + sortedLessThan2[j]);
//       }
//       else {
//         let set = new Set();
//         set.add(sortedLessThan2[i] + ',' + sortedLessThan2[j]);
//         map.set(val, set);
//       }
//     }
//   }
//   console.timeEnd('mapping');
//   console.log(sortedLessThan2);
//   console.log(map);
//   for (let i = 0; i < sortedLessThan2.length; i++) {
//     const target = 0 - sortedLessThan2[i];
//     if (i > 0 && sortedLessThan2[i] === sortedLessThan2[i - 1]) {
//       continue;
//     }
//     if (target > max || target < min)continue;
//     let pairs;
//     if (pairs = map.get(target)) {
//       for (let item of pairs) {
//         const arr = item.split(',');
//         if (!setDuplicate.has(sortedLessThan2[i]) && arr.includes(sortedLessThan2[i] + '')) {
//
//         }
//         else {
//           const qualify = [];
//           const [first, second] = item.split(',');
//           if (sortedLessThan2[i] <= first) {
//             qualify.push(sortedLessThan2[i]);
//             qualify.push(Number.parseInt(first));
//             qualify.push(Number.parseInt(second));
//             result.push(qualify);
//           }
//         }
//       }
//     }
//   }
//   console.timeEnd('all');
//   return result;
// };
// /**
//  * @param {number[]}
//  * @return {number[][]
//  * use two pointers
//  */
// var threeSum = function (nums) {
//   console.time('all');
//   const res = [];
//   if (nums.length < 4) {
//     if (nums[0] + nums[1] + nums[2] === 0) {
//       return [nums];
//     }
//     return res;
//   }
//   const sorted = nums.sort((a, b)=>a - b);
//   let zeroCount = 0;
//   const sortedLessThan2 = [];
//   sorted.forEach((value, index, array)=> {
//     if (value === 0) zeroCount++;
//     if (index > 1 && array[index] === array[index - 1] && array[index] === array[index - 2]) {
//     }
//     else {
//       sortedLessThan2.push(value);
//     }
//   });
//   if (zeroCount > 2)res.push([0, 0, 0]);
//   for (let i = 0; i < sortedLessThan2.length - 2; i++) {
//     if (i > 0 && sortedLessThan2[i] === sortedLessThan2[i - 1])continue;
//     let j = i + 1, k = sortedLessThan2.length - 1;
//     while (j < k) {
//       if (sortedLessThan2[i] + sortedLessThan2[j] + sortedLessThan2[k] === 0) {
//         res.push([sortedLessThan2[i], sortedLessThan2[j], sortedLessThan2[k]]);
//         j++;
//         if (sortedLessThan2[j] === sortedLessThan2[j - 1])j++;
//         k--;
//         if (sortedLessThan2[k] === sortedLessThan2[k + 1])k--;
//       }
//       else if (sortedLessThan2[i] + sortedLessThan2[j] + sortedLessThan2[k] < 0) {
//         j++;
//         if (sortedLessThan2[j] === sortedLessThan2[j - 1])j++;
//       }
//       else if (sortedLessThan2[i] + sortedLessThan2[j] + sortedLessThan2[k] > 0) {
//         k--;
//         if (sortedLessThan2[k] === sortedLessThan2[k + 1])k--;
//       }
//     }
//   }
//   console.timeEnd('all');
//   return res;
// }
// var arr1 = [-1, 0, 1, 0];
// var short = [-1, 0, 1, 2, -1, -4];
// console.log(threeSum(arr1));
// console.log(threeSum([0, 0, 0, 0]));
// 20
// var isValid = function (s) {
//   if (s.length < 2)return false;
//   let stack = new Array();
//   for (let i = 0; i < s.length; i++) {
//     if ('([{'.includes(s.charAt(i))) {
//       stack.push(s.charAt(i));
//     }
//     else {
//       const left = stack.pop();
//       if (!isMatch(left, s.charAt(i))) {
//         return false;
//       }
//     }
//     if (i === s.length - 1 && stack.length > 0)return false;
//   }
//   return true;
// };
//
// function isMatch(left, right) {
//   if (left + right === '()' || left + right === '[]' || left + right === '{}') {
//     return true;
//   }
//   return false;
// }
// console.log(isValid("("));
open("http://www.w3school.com.cn")
//34
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// var searchRange = function (nums, target) {
//   if (nums[0] > target || nums[nums.length - 1] < target)return [-1, -1];
//   let left = 0, right = nums.length - 1;
//   while (left <= right) {
//     if (nums[left] < target)left++;
//     if (nums[right] > target)right--;
//     if (nums[left] === target && nums[right] === target)return [left, right];
//   }
//   return [-1, -1];
// };
// console.log(searchRange([0,0], 8))
//83
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// var deleteDuplicates = function (head) {
//   if (head === null)return head;
//   const unique = new Set();
//   let node = head, leftNode = null;
//   while (node) {
//     if (unique.has(node.val)) {
//       if(node.next){
//         leftNode.next = node.next;
//         node = leftNode.next;
//       }
//       else{
//         leftNode.next = null;
//         delete node;
//         break;
//       }
//     }
//     else{
//       unique.add(node.val);
//       leftNode = node;
//       node = node.next;
//     }
//   }
//   return head;
// };
// function ListNode(val) {
//   this.val = val;
//   this.next = null;
// }
// const node1 = new ListNode(1);
// const node2 = new ListNode(1);
// const node3 = new ListNode(1);
// node1.next = node2;
// // node2.next = node3;
// console.log(deleteDuplicates(node1));
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

// 404
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
    seekLeft(root, 0);
    return count;
};
count = 0;
function seekLeft(node) {
    if(node.right){
        arguments.callee(node.right);
    }
    if(node.left){
        arguments.callee(node.right);
    }
    else{
        count += node.val;
        return;
    }
}

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
