/**
 * Created by luye on 04/01/2018.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
// 64
// 思路:由下至少,动态规划,一层一层递增
// var minPathSum = function (grid) {
//     const memo = new Array(...grid);
//     const width = grid[0].length, height = grid.length;
//     const loopMax = Math.min(width, height);
//     let x = 0, y = 0, step = 0, loop = 1;
//     while (loop < loopMax) {
//         console.log(x, y, step, loop);
//         if (x == 0 && y == 0) {
//             memo[x][y] = grid[0][0];
//         } else if (x == 0 && y > 0) {
//             memo[x][y] = memo[x][y - 1] + grid[x][y];
//         } else if (x > 0 && y == 0) {
//             memo[x][y] = memo[x - 1][y] + grid[x][y];
//         } else {
//             memo[x][y] = Math.min(memo[x - 1][y], memo[x][y - 1]) + grid[x][y];
//         }
//         if (step == 0) {
//             x++;
//             step = 1;
//         } else if (step == 1) {
//             if (y == loop - 1) {
//                 step = 2;
//                 x = 0;
//             }
//             y++;
//         } else if (step == 2) {
//             if (x == loop) {
//                 step = 1;
//                 loop++;
//                 y = 0;
//             }
//             x++;
//         }
//     }
//     if (width > height) {
//         for (let i = 0; i < height; i++) {
//             for (let j = loop; j < width; j++) {
//                 if (i == 0) {
//                     memo[i][j] = memo[i][j - 1] + grid[i][j];
//                 } else {
//                     memo[i][j] = Math.min(memo[i - 1][j], memo[i][j - 1]) + grid[i][j];
//                 }
//             }
//         }
//     } else if (width < height) {
//         for (let i = loop; i < height; i++) {
//             for (let j = 0; j < width; j++) {
//                 if (j == 0) {
//                     memo[i][j] = memo[i - 1][j] + grid[i][j];
//                 } else {
//                     memo[i][j] = Math.min(memo[i - 1][j], memo[i][j - 1]) + grid[i][j];
//                 }
//             }
//         }
//     }
//     return memo[height - 1][width - 1];
// };

//思路 递归+记忆,由上至下

// var minPathSum = function (grid) {
//         var x = arguments[1] !== undefined ? arguments[1] : grid[0].length - 1;
//         var y = arguments[2] !== undefined ? arguments[2] : grid.length - 1;
//         if (x == 0 && y == 0) {
//             return grid[0][0];
//         } else if (x > 0 && y == 0) {
//             return arguments.callee(grid, x - 1, y) + grid[y][x];
//         } else if (x == 0 && y > 0) {
//             return arguments.callee(grid, x, y - 1) + grid[y][x];
//         } else {
//             return Math.min(arguments.callee(grid, x - 1, y), arguments.callee(grid, x, y - 1)) + grid[y][x];
//         }
//     };
// var minPathSum = function (grid) {
//     var x = arguments[1] !== undefined ? arguments[1] : grid[0].length - 1;
//     var y = arguments[2] !== undefined ? arguments[2] : grid.length - 1;
//     var dict = arguments[3] ? arguments[3] : {};
//     if (dict[x + '-' + y]) {
//         return dict[x + '-' + y];
//     }
//     let res;
//     if (x == 0 && y == 0) {
//         res = grid[0][0];
//     } else if (x > 0 && y == 0) {
//         res = arguments.callee(grid, x - 1, y, dict) + grid[y][x];
//     } else if (x == 0 && y > 0) {
//         res = arguments.callee(grid, x, y - 1, dict) + grid[y][x];
//     } else {
//         res = Math.min(arguments.callee(grid, x - 1, y, dict), arguments.callee(grid, x, y - 1, dict)) + grid[y][x];
//     }
//     dict[x + '-' + y] = res;
//     return res;
// };
// [
//     [1, 4, 8, 6, 2, 2, 1, 7],
//     [4, 7, 3, 1, 4, 5, 5, 1],
//     [8, 8, 2, 1, 1, 8, 0, 1],
//     [8, 9, 2, 9, 8, 0, 8, 9],
//     [5, 7, 5, 7, 1, 8, 5, 5],
//     [7, 0, 9, 4, 5, 6, 5, 6],
//     [4, 9, 9, 7, 9, 1, 9, 0]]
// console.log(minPathSum([[1, 4, 8, 6, 2, 2, 1, 7], [4, 7, 3, 1, 4, 5, 5, 1], [8, 8, 2, 1, 1, 8, 0, 1], [8, 9, 2, 9, 8, 0, 8, 9], [5, 7, 5, 7, 1, 8, 5, 5], [7, 0, 9, 4, 5, 6, 5, 6], [4, 9, 9, 7, 9, 1, 9, 0]]));
// console.log(minPathSum([[1, 3, 1, 2], [1, 5, 1, 2], [4, 2, 1, 2]]));
// console.log(minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]]));
// console.log(minPathSum([[0]]));


//416
/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 状态流转：F(n, c) = F(n-1,c) || F(n-1, c-v[i])
// var canPartition = function (nums) {
//     let sum = 0;
//     nums.forEach((v) => sum += v);
//     if (sum % 2) return false;
//     const amount = sum / 2;
//     const memo = new Array(amount + 1).fill(false);
//     nums.forEach((v, idx) => {
//         const memoCopy = [...memo];
//         for (let i = 1; i <= amount; i++) {
//             if (idx) {
//                 if (i > v) {
//                     memo[i] = memoCopy[i] || memoCopy[i - v];
//                 } else if (i == v) {
//                     memo[i] = true;
//                 }
//             } else {
//                 if (i == v) {
//                     memo[i] = true;
//                 }
//             }
//         }
//     });
//     return memo[amount];
// };
//
//
// console.log(canPartition([1, 2, 3, 4, 5, 6, 7]));
// console.log(canPartition([1, 5, 11, 5]));
// console.log(canPartition([1, 2,5]));

// 300
/**
 * @param {number[]} nums
 * @return {number}
 */
// 假设memo[i]代表加入第i个数能构成的最长升序序列长度，我们就是要在memo[0]到memo[i-1]中找到一个最长的升序序列长度，又保证序列尾值nums[j]小于nums[i]
var lengthOfLIS = function (nums) {
    let ret = 0;
    // nums.sort((a, b) => a - b);
    const len = nums.length;
    if (len == 1)return len;
    const memo = new Array(len).fill(1); //以第i个元素为结尾最长子序列的长度
    for (let i = 1; i < len; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (nums[i] > nums[j] && memo[j] + 1 >= memo[i])memo[i] = memo[j] + 1;
        }
        ret = Math.max(ret, memo[i]);
    }
    return ret;
};
// console.log(lengthOfLIS([1, 3, 4, 2, 3]));
// console.log(lengthOfLIS([2, 2]));

// 368
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var largestDivisibleSubset = function (nums) {
    const len = nums.length;
    if (!len) return [];
    nums.sort((a, b) =>a - b);
    const comb = [];
    nums.forEach(v => comb.push([v]));
    for (let i = 1; i < len; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (nums[i] % nums[j] == 0 && comb[j].length + 1 >= comb[i].length) {
                comb[i] = [...comb[j], nums[i]];
            }
        }
    }
    comb.sort((a, b)=>b.length - a.length);
    return comb[0];
};
// console.log(largestDivisibleSubset([1, 2, 4, 8]));
// console.log(largestDivisibleSubset([4, 8, 10, 240]));

//474
/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
    console.time('test');
    const len = strs.length;
    const dp = {};
    const arr0 = new Array(len).fill(0);
    const arr1 = new Array(len).fill(0);
    strs.forEach((v, i) => {
        arr0[i] = getZeros(v);
        arr1[i] = getOnes(v);
    });
    for (let k = 0; k < len; k++) {
        const dpCopy = JSON.parse(JSON.stringify(dp));
        for (let i = 0; i <= m; i++) {
            for (let j = 0; j <= n; j++) {
                if (i + j == 0) {
                    dp[keyGen(i, j)] = 0;
                    continue;
                }
                const ones = arr1[k];
                const zeros = arr0[k];
                const keyCur = keyGen(i, j);
                let valTemp;
                const valPre = k ? dpCopy[keyGen(i, j)] : 0;
                if (i >= zeros && j >= ones) {
                    valTemp = dpCopy[keyGen(i - zeros, j - ones)];
                    valTemp = valTemp ? valTemp : 0;
                    valTemp = Math.max(valTemp + 1, valPre);
                } else {
                    valTemp = valPre;
                }
                dp[keyCur] = valTemp;
            }
        }
    }
    console.timeEnd('test');
    return dp[keyGen(m, n)];
};

var getZeros = function (str) {
    let ret = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) == 0) {
            ret++;
        }
    }
    return ret;
};
var getOnes = function (str) {
    let ret = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) == 1) {
            ret++;
        }
    }
    return ret;
};
var keyGen = function (a, b, c) {
    // if (arguments.length == 2) {
    return `${a}-${b}`;
    // }
    // return `${a}-${b}-${c}`;
};
// console.log(getOnes('11141'));
// console.log(findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3));
// console.log(findMaxForm(["10", "0001", "111001", "1", "0"], 4, 3));
// console.log(findMaxForm(["0", "11", "1000", "01", "0", "101", "1", "1", "1", "0", "0", "0", "0", "1", "0", "0110101", "0", "11", "01", "00", "01111", "0011", "1", "1000", "0", "11101", "1", "0", "10", "0111"], 9, 80));
console.log(findMaxForm(["11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01"]
    , 50,
    50));






