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


/** 72
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
    const len1 = word1.length, len2 = word2.length, pos = {}, visited = {};
    if (!len1 || !len2) {
        return Math.max(len1, len2);
    }
    //创建二维数组dp
    const cache = [...new Array(len2)].map(() => new Array(len1).fill(0));
    //统计每一个word1中字符出现在Word2中的index
    for (let i = 0; i < len1; i++) {
        for (let j = 0; !visited[word1.charAt(i)] && j < len2; j++) {
            if (word2.charAt(j) == word1.charAt(i)) {
                if (pos[word1.charAt(i)]) {
                    pos[word1.charAt(i)].push(j);
                } else {
                    pos[word1.charAt(i)] = [j]
                }
            }
        }
        visited[word1.charAt(i)] = true;
    }

    for (let i = 0; i < len2; i++) {
        for (let j = 0; j < len1; j++) {
            let equalIndex = -1, positions = pos[word1.charAt(j)];
            if (positions) {
                positions = positions.filter(a=>a <= i);
                if (positions.length) {
                    equalIndex = positions[positions.length - 1];
                }
            }
            // word1中循环到的char是插入还是与最后一位互换的最小值
            cache[i][j] = Math.min(getCacheValue(i - 1, j - 1, cache), getCacheValue(i, j - 1, cache)) + 1;
            if (equalIndex >= 0) {
                //如果该char出现在word2中,本状态值为循环到的word2中最后一位的状态值加上与word2余下位数与上一次计算的最小值
                cache[i][j] = Math.min(cache[i][j], getCacheValue(equalIndex - 1, j - 1, cache) + i - equalIndex);
            }
        }
        // console.log(cache, i);
    }
    console.log(cache);
    return getCacheValue(len2 - 1, len1 - 1, cache);
};
function getCacheValue(h, w, cache) {
    if (h < 0 && w < 0) {
        return 0;
    } else if (h < 0) {
        return w + 1;
    } else if (w < 0) {
        return h + 1;
    } else {
        return cache[h][w];
    }
}
// console.log(minDistance("intention", "execution"), 5);
// console.log(minDistance("horse", "ros"), 3);
// console.log(minDistance("sea", "ate"), 3);
// console.log(minDistance("sea", "eat"), 2);
// console.log(minDistance("mart", "karma"), 3);


// 1 5 1 1 : 1 2 2 4
// 1 2 1 1 : 1 2 3 4
/**
 * 91 decode ways
 * 每个数都要用上 '02' 无效
 * 状态流转: if(isValid(arr[i])&&isValid(arr[i-1]+arr[i])) f(x)=f(x-1)+f(x-2) else f(x)=f(x-1)
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
    if (s.charAt(0) === '0' || s.includes('00'))return 0;
    const len = s.length;
    if (len < 2)return len;
    const arr = s.split('');
    const dp = [1];
    for (let i = 1; i < len; i++) {
        let num;
        const former = dp[i - 2] ? dp[i - 2] : 1;
        const comb = arr[i - 1] + arr[i];
        if (isValid(arr[i])) {
            if (isValid(comb) && arr[i - 1] != '0') {
                num = dp[i - 1] + former;
            } else {
                num = dp[i - 1];
            }
        } else {
            if (arr[i - 1] < 3) {
                num = i > 1 ? former : 1;
            } else {
                return 0;
            }
        }
        dp.push(num);
    }
    return dp.pop();
};

function isValid(num) {
    return num >= 1 && num <= 26;
}

/**97
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function(s1, s2, s3) {
    let i1 = 0, i2 = 0, i3 = 0;
    //此操作费效率,导致tle
    if (arguments[3] != undefined) {
        [i1, i2, i3] = [...arguments].slice(3);
    }
    const char1 = s1.charAt(i1), char2 = s2.charAt(i2), char3 = s3.charAt(i3);
    if (!char3) {
        return i1 >= s1.length && i2 >= s2.length;
    }
    if (!char1) {
        return s3.substr(i3) == s2.substr(i2);
    }
    if (!char2) {
        return s3.substr(i3) == s1.substr(i1);
    }
    if (char3 !== char1 && char3 !== char2) {
        return false;
    } else if (char3 == char1 && char3 == char2) {
        return isInterleave(s1, s2, s3, i1, i2 + 1, i3 + 1) || isInterleave(s1, s2, s3, i1 + 1, i2, i3 + 1);
    } else if (char3 == char1 && char3 !== char2) {
        return isInterleave(s1, s2, s3, i1 + 1, i2, i3 + 1);
    } else if (char3 !== char1 && char3 == char2) {
        return isInterleave(s1, s2, s3, i1, i2 + 1, i3 + 1);
    }
};
//去arguments后,通过
var isInterleave = function (s1, s2, s3) {
    return search(s1, s2, s3 , 0, 0, 0);
}

var search = function (s1, s2, s3, i1, i2, i3) {
    //如果不存这三个变量,由超过30%变成10%,效率损耗比使用arguments小
    const char1 = s1.charAt(i1), char2 = s2.charAt(i2), char3 = s3.charAt(i3);
    if (!char3) {
        return i1 >= s1.length && i2 >= s2.length;
    }
    if (!char1) {
        return s3.substr(i3) == s2.substr(i2);
    }
    if (!char2) {
        return s3.substr(i3) == s1.substr(i1);
    }
    if (char3 !== char1 && char3 !== char2) {
        return false;
    } else if (char3 == char1 && char3 == char2) {
        return search(s1, s2, s3, i1, i2 + 1, i3 + 1) || search(s1, s2, s3, i1 + 1, i2, i3 + 1);
    } else if (char3 == char1 && char3 !== char2) {
        return search(s1, s2, s3, i1 + 1, i2, i3 + 1);
    } else if (char3 !== char1 && char3 == char2) {
        return search(s1, s2, s3, i1, i2 + 1, i3 + 1);
    }
}
//    console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac"));
//    console.log(isInterleave("aabcc", "dbbca", "aadbbbaccc"));
//    console.log(isInterleave("", "dbbca", "aadbbbaccc"));
//    console.log(isInterleave("aabcc", "", "aadbbbaccc"));
//    console.log(isInterleave("aabcc", "dbbca", ""));
//    console.log(isInterleave("aaa", "bbb", "aaabbb"));


/** 174 dungeon game
 * 由右下角向左上角逐渐向上
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function (dungeon) {
    let w = dungeon[0].length, h = dungeon.length;
    const dp = new Array();
    for (let i = 0; i < h + 1; i++) {
        dp[i] = [];
    }
    for (let i = h - 1; i >= 0; i--) {
        for (let j = w - 1; j >= 0; j--) {
            const stored = getValidDp(dp[i][j + 1], dp[i + 1][j]);
            if (dungeon[i][j] >= stored) {
                dp[i][j] = 1;
            } else {
                dp[i][j] = stored - dungeon[i][j];
            }
        }
    }
    return dp[0][0];
};
function getValidDp(num1, num2) {
    if (num1 == undefined && num2 == undefined) {
        return 1;
    } else if (num1 == undefined) {
        return num2;
    } else if (num2 == undefined) {
        return num1;
    } else {
        return Math.min(num1, num2);
    }
}

// console.log(calculateMinimumHP([[-2, -3, 3], [-5, -10, 1], [10, 30, -5]]));
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


/** 309
 * 状态流转:if 卖: max( 前面任何可以买入一点买入的差价+ 前面可卖出点的dp值) else dp[i-1]
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    const len = prices.length;
    if (!len) {
        return 0;
    }
    const dp = [0];
    // 在i点卖
    for (let i = 1; i < len; i++) {
        // 在j点买
        let max = -Infinity;
        for (let j = 0; j < i; j++) {
            let temp = prices[i] - prices[j];
            if (j > 2)temp += dp[j - 2];
            if (temp > max)max = temp;
        }
        dp.push(Math.max(max, dp[i - 1]));
    }
    return Math.max.apply(null, dp);
};

// console.log(maxProfit([1, 2, 4]));

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


//376
/**
 * @param {number[]} nums
 * @return {number}
 */
    //子问题(状态):以第n元素为结尾的数组。
    //每个以第n元素为结尾的数组最大长度等于[0, 1 , ... n-1]之和
    //先要去重复
var wiggleMaxLength = function (nums) {
        let len = nums.length;
        let dp = [1];
        if (len < 2) return len;
        if (len == 2) {
            if (nums[0] == nums[1])return 1;
            return len;
        }
        const arr = [];
        for (let i = 1; i < len; i++) {
            if (nums[i] != nums[i - 1])arr.push(nums[i]);
        }
        arr.unshift(nums[0]);
        len = arr.length;
        for (let i = 1; i < len; i++) {
            if (arr[i - 1] !== undefined && arr[i - 2] !== undefined && ((arr[i] - arr[i - 1]) * (arr[i - 1] - arr[i - 2]) >= 0)) {
                dp[i] = dp[i - 1];
            } else {
                dp[i] = dp[i - 1] + 1;
            }
        }
        let result = 1;
        for (let i = 1; i < len; i++) {
            if (dp[i] > result)result = dp[i];
        }
        return result;
    };


//416
/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 状态流转：F(n, c) = F(n-1,c) || F(n-1, c-v[i])
var canPartition = function (nums) {
    let sum = 0;
    nums.forEach((v) => sum += v);
    if (sum % 2) return false;
    const amount = sum / 2;
    const memo = new Array(amount + 1).fill(false);
    nums.forEach((v, idx) => {
        const memoCopy = [...memo];
        for (let i = 1; i <= amount; i++) {
            if (idx) {
                if (i > v) {
                    memo[i] = memoCopy[i] || memoCopy[i - v];
                } else if (i == v) {
                    memo[i] = true;
                }
            } else {
                if (i == v) {
                    memo[i] = true;
                }
            }
        }
    });
    return memo[amount];
};
//
//
// console.log(canPartition([1, 2, 3, 4, 5, 6, 7]));
// console.log(canPartition([1, 5, 11, 5]));
// console.log(canPartition([1, 2,5]));

//474
/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

var findMaxForm = function (strs, m, n) {
    const len = strs.length;
    //js烦人的浅拷贝,需要两个二维数组
    const dpEven = new Proxy({}, {
        get(target, prop){
            return target[prop] ? target[prop] : 0;
        }
    });
    const dpOdd = new Proxy({}, {
        get(target, prop){
            return target[prop] ? target[prop] : 0;
        }
    });
    if (!len) {
        return 0;
    }
    for (let i = 0; i < len; i++) {
        let a0 = 0, a1 = 0;
        for (let j = 0; j < strs[i].length; j++) {
            if (strs[i].charAt(j) == '1') {
                a1++;
            } else {
                a0++;
            }
        }
        a0 = strs[i].length - a1;
        for (let j = 0; j <= m; j++) {
            for (let k = 0; k <= n; k++) {
                const key = j + '-' + k, keyAdded = `${j - a0}-${k - a1}`;
                //状态转移:如果0和1够组成当前字符串,就取,当前的状态就等于取和不取的最大值,取的状态等于去掉当前1和0的上一轮的状态值
                if (a0 <= j && a1 <= k) {
                    if (i % 2) {
                        dpEven[key] = Math.max(dpOdd[key], dpOdd[keyAdded] + 1);
                    } else {
                        dpOdd[key] = Math.max(dpEven[key], dpEven[keyAdded] + 1);
                    }
                } else {
                    if (i % 2) {
                        dpEven[key] = dpOdd[key];
                    } else {
                        dpOdd[key] = dpEven[key];
                    }
                }
            }
        }

    }
    return len % 2 ? dpOdd[`${m}-${n}`] : dpEven[`${m}-${n}`];
};

// console.log(findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3));
// console.log(findMaxForm(["10", "0001", "111001", "1", "0"], 4, 3));  //output: 3
// console.log(findMaxForm(["10", "0", "1"], 1, 1));
// console.log(findMaxForm(["0", "11", "1000", "01", "0", "101", "1", "1", "1", "0", "0", "0", "0", "1", "0", "0110101", "0", "11", "01", "00", "01111", "0011", "1", "1000", "0", "11101", "1", "0", "10", "0111"], 9, 80));
// console.log(findMaxForm(["11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01", "11", "01"]
//     , 50,
//     50));


/** 514
 * @param {string} ring
 * @param {string} key
 * @return {number}
 * 状态:一个集合--所有的当前字母的旋转数,每一个值为计算前一个集合的所有的最小值
 */
var findRotateSteps = function (ring, key) {
    //储存每个字母对应的位置
    const pos = new Map(), cache = new Map(), len = ring.length;
    for (let i = 0; i < len; i++) {
        const key = ring.charAt(i);
        const arr = pos.get(key);
        if (arr) {
            arr.push(i);
        } else {
            pos.set(key, [i]);
        }
    }
    for (let i = 0; i < key.length; i++) {
        const des = pos.get(key.charAt(i));
        const cached = [];
        des.forEach(d=> {
            let temp = Infinity;
            if (cache.size) {
                for (let [key, value] of cache.entries()) {
                    //计算最短间距
                    const min = Math.min(d, key), max = Math.max(d, key);
                    const offset = Math.min(max - min, min + len - max);
                    if (value + offset < temp) {
                        temp = value + offset;
                    }
                }
            } else {
                const offset = Math.min(d, len - d);
                if (offset < temp) {
                    temp = offset;
                }
            }
            cached.push({key: d, value: temp});
        });
        cache.clear();
        cached.forEach(c=> {
            cache.set(c.key, c.value);
        });
    }
    return Math.min.apply(null, Array.from(cache.values())) + key.length;
};
//
// console.log(findRotateSteps("godding", "gd"));
// console.log(findRotateSteps("edcba", "abcde"));

/**
 * 516
 * @param {string} s
 * @return {number}
 * 状态转移: if(charAt[i]==s.charAt[j]) f(i,j) = f(i+1, j-1)+2 else f(i,j)= Math.max(f(i+1,j), f(i,j-1))
 *
 */
//优化前
var longestPalindromeSubseq = function (s) {
    const len = s.length, dp = new Map();
    if (len < 2) {
        return len;
    }
    for (let i = 1; i < len; i++) {
        for (let j = i - 1; j >= 0; j--) {
            let val = 0;
            if (s.charAt(j) == s.charAt(i)) {
                val = getDp(dp, j + 1, i - 1) + 2;
            } else {
                val = Math.max(getDp(dp, j, i - 1), getDp(dp, j + 1, i));
            }
            dp.set(j + '-' + i, val);
        }
    }
    return dp.get(0 + '-' + (len - 1));
};

function getDp(dp, left, right) {
    if (right - left == 0) {
        return 1;
    } else if (right - left < 0) {
        return 0;
    } else {
        return dp.get(left + '-' + right);
    }
}

//空间压缩 优化后; leetcode 与本地chrome跑结果不一致
var longestPalindromeSubseq = function (s) {
    const len = s.length;
    let dp = [];
    if (len < 2) {
        return len;
    }
    for (let i = 1; i < len; i++) {
        const temp = [];
        for (let j = i - 1; j >= 0; j--) {
            let val = 0;
            if (s.charAt(j) == s.charAt(i)) {
                val = getDp(dp, j + 1, i - 1) + 2;
            } else {
                val = Math.max(getDp(dp, j, i - 1), getDp(temp, j + 1, i));
            }
            temp[j] = val;
            // if(j == i - 1){
            //     dp[j] = val;
            // }
        }
        dp = [...temp];
    }
    return dp[0];
};

function getDp(dp, left, right) {
    if (right - left == 0) {
        return 1;
    } else if (right - left < 0) {
        return 0;
    } else {
        return dp[left];
    }
}
// console.log(longestPalindromeSubseq("aabaaba"));
// console.log(longestPalindromeSubseq('bzb'));
// console.log(longestPalindromeSubseq('bb'));

/**
 * 718
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var findLength = function (A, B) {
    const lenA = A.length, lenB = B.length;
    if (!lenA || !lenB)return 0;
    const cache = new Proxy({}, {
        get(target, prop){
            return target[prop] ? target[prop] : 0;
        }
    });
    const contains = {};
    for (let i = 0; i < lenA; i++) {
        for (let j = 0; j < lenB; j++) {
            const length = cache[(j - 1)];
            if (length < lenB) {
                if (contains[i + '-' + j + '-' + length]) {
                    cache[j] = cache[j - 1] + 1;
                } else if ((',' + A.slice(0, i + 1) + ',').includes(',' + B.slice(j - length, j + 1) + ',')) {
                    cache[j] = cache[j - 1] + 1;
                    for (let k = i; k < lenA; k++) {
                        contains[k + '-' + j + '-' + length] = true;
                    }
                    for (let k = length; k >= 0; k--) {
                        contains[i + '-' + j + '-' + k] = true;
                    }
                } else {
                    cache[j] = cache[j - 1];
                }
            } else {
                cache[j] = cache[j - 1];
            }
        }
    }
    return cache[(lenB - 1)];
};
// console.log(findLength([0, 0, 0, 0, 1], [1, 0, 0, 0, 0]));
// console.log(findLength([1, 2, 3, 2, 1], [3, 2, 1, 4, 7]));
// console.log(findLength([70, 39, 25, 40, 7]
//     , [52, 20, 67, 5, 31]));




