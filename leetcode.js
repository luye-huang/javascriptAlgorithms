/**
 * Created by luye on 04/07/2017.
 */
var testArray = new Array(1000).fill(100);
// 15
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
// 发现: js递归时,递归层之间参数可以变化,用arguments来判断, 十分灵活
/**
 * Definition for a binary tree node.
 function TreeNode(val) {
      this.val = val;
      this.left = this.right = null;
  }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// var sumOfLeftLeaves = function (root) {
//     if (!root) {
//         return 0;
//     }
//     if (!root.left && !root.right && arguments[1] && arguments[1].left == root) {
//         return root.val;
//     }
//     return arguments.callee(root.left, root) + arguments.callee(root.right, root);
// };

// [3,9,20,null,null,15,7]
// function TreeNode(val) {
//     this.val = val;
//     this.left = this.right = null;
// }
// var node0 = new TreeNode(1);
// var node01 = new TreeNode(2);
// var node1 = new TreeNode(3);
// var node2 = new TreeNode(9);
// var node3 = new TreeNode(20);
// var node4 = new TreeNode(15);
// var node5 = new TreeNode(7);

// node0.left = node1;
// node1.left = node2;
// node1.right = node3;
// node3.left = node4;
// node3.right = node5;
//
// // node0.right = node01;
// console.log(sumOfLeftLeaves(node0));
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


// 54
// 思路:蛇形层层剥层,记录layer,判断横纵操作是否超过矩阵长宽
// 心得:要用动态的角度思考问题,result = result.concat(matrix[layers - 1].slice(layers - 1, cols - layers + 1)); 这部需要操作不断缩减的数组;
//     边界的确定要十分精确,一开始用 if (i > rows || j > cols)break; 导致出界问题。细致思考区分了横纵向,通过测试。也可以判断每个操作的结束点是否与下个操作的起始点的方式解决;
//     边界问题确定(+1, -1的小问题)快代入实例解决;

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
// var spiralOrder = function (matrix) {
//     if (!matrix[0])return [];
//     const rows = matrix.length, cols = matrix[0].length;
//     let i = 0, j = 0, layers = 1, result = [];
//     while (true) {
//         result = result.concat(matrix[layers - 1].slice(layers - 1, cols - layers + 1));
//         i++;
//         if (i > rows || j >= cols)break;
//         for (let k = layers; k < rows - layers; k++) {
//             result.push(matrix[k][cols - layers]);
//         }
//         j++;
//         if (i >= rows || j > cols)break;
//         result = result.concat(matrix[rows - layers].slice(layers - 1, cols - layers + 1).reverse());
//         i++;
//         if (i > rows || j >= cols)break;
//         for (let k = rows - layers - 1; k > layers - 1; k--) {
//             result.push(matrix[k][layers - 1]);
//         }
//         j++;
//         if (i >= rows || j > cols)break;
//         layers++;
//     }
//     return result;
// };
//
// const mtx = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
// ];
// console.log(spiralOrder([]));


// 55
// 思路:确定数组是否有断点。从后向前如果元素为0,则向前循环,如果前面的元素值够大可跨过断点则继续外层循环,若内层循环后前面无这样的元素则返回false
/**
 * @param {number[]} nums
 * @return {boolean}
 */
// var canJump = function (nums) {
//     if (nums.length < 2)return true;
//     let index = 1;
//     for (let i = nums.length - 2; i >= 0; i--) {
//         if (!nums[i]) {
//             index = i - 1;
//             const posCliff = i;
//             while (index >= 0) {
//                 if (nums[index] + index > posCliff)break;
//                 index--;
//             }
//             if (index < 0) {
//                 return false;
//             }
//         }
//     }
//     return true;
// };
// console.log(canJump([2,3,1,1,4]));
// console.log(canJump([3,2,1,0,4]));
// console.log(canJump([2,0,0]));


// 316
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
    let arr = Array.from(s), result = '';
    const keys = [...new Set(arr)].sort((a, b) => a > b);
    const stack = [...new Set(arr)].sort((a, b) => a > b);
    let dict = storeInfo(arr);
    let values = [...dict.values()];
    while (stack.length > 0) {
        const element = stack.shift();
        const elementInfo = dict.get(element);
        const positions = elementInfo.positions;
        const keysToCompare = keys.slice(0, keys.indexOf(element));
        elementInfo.positionCompare && keysToCompare.push(elementInfo.positionCompare);
        elementInfo.positionCurrent = positions[positions.length - 1];
        let stackAdd = true;
        const boundary = elementInfo.positionTrack ? elementInfo.positionTrack : arr.length;
        for (let [i, v] of positions.entries()) {
            if (arr.slice(0, v).every((val, idx) =>!keysToCompare.includes(val) || val < element || dict.get(val).positionCurrent != idx) &&
                arr.slice(v + 1, boundary).every((val, idx)=>!keysToCompare.includes(val) || val > element || dict.get(val).positionCurrent != idx + v + 1) && v < boundary) {
                elementInfo.positionCurrent = v;
                stackAdd = false;
                break;
            }
        }
        if (stackAdd) {
            const keysToAdd = keysToCompare.reverse();
            for (let v of keysToAdd) {
                const elementCompareInfo = dict.get(v);
                if (elementCompareInfo.fixed)continue;
                if (elementCompareInfo.positionCurrent > elementInfo.positionCurrent && arr.slice(0, elementInfo.positionCurrent).includes(elementCompareInfo.name)) {
                    dict.get(v).positionTrack = elementInfo.positionCurrent;
                    dict.get(v).positionCompare = elementInfo.name;
                    stack.unshift(v);
                }
            }
        }
        if (elementInfo.positionTrack) {
            elementInfo.positionTrack = null;
            elementInfo.positionCompare = null;
        }
    }
    console.log(dict);
    values.sort((a, b) => a.positionCurrent - b.positionCurrent);
    values.forEach((v) => {
        result += v.name;
    });
    return result;
};


function storeInfo(array) {
    const dict = new Map();
    array.forEach((v, i) => {
        if (dict.has(v)) {
            dict.get(v).fixed = false;
            dict.get(v).positions.push(i);
        } else {
            dict.set(v, {name: v, positions: [i], fixed: true, positionCurrent: i});
        }
    });
    return dict;
}

// console.log(getRearrangedElements(['a', 'b', 'c', 'b', 'd', 'b'], 'z', 1, 6, 0, 4));
// console.log(processArray(['a', 'b', 'c', 'b'], ['b']));
var ss = 'cbacdcbc';
var sss = 'cbcba';
//"cbcab"
// console.log(removeDuplicateLetters(ss), 'acdb');
// console.log(removeDuplicateLetters("cbaddabaa"), 'cadb');
// console.log(removeDuplicateLetters("bbcab"), 'bca');
// console.log(removeDuplicateLetters("cbcab"), 'bca');
// console.log(removeDuplicateLetters("ccbab"), 'cab');

console.log(removeDuplicateLetters("thesqtitxyetpxloeevdeqifkz"), "hesitxyplovdqfkz");
console.log(removeDuplicateLetters("ttttttthesqtitxyetpxloeevdeqifkz"), "hesitxyplovdqfkz");
//
// console.log(removeDuplicateLetters("thesqtitxyet"), "hesitxyplovdqfkz");


