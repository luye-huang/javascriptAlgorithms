/**
 * Created by luye on 04/01/2018.
 */

/** 32 dp解法未过
 * @param {string} s
 * @return {number}
 */

// var longestValidParentheses = function (s) {
//     const len = s.length;
//     if (!len) {
//         return 0;
//     }
//     const isLeft = [...s].map(c=>c == '(');
//     const dp = new Proxy({}, {
//         get(target, key){
//             const [left, right] = key.split('-');
//             const num = right - left;
//             if (num < 1) {
//                 return 0;
//             }
//             return target[key];
//         }
//     });
//     for (let i = 1; i < len; i++) {
//         for (let j = i - 1; j >= 0; j--) {
//             let dpTmp;
//             if (isLeft[j] && !isLeft[i]) {
//                 dpTmp = Math.max(dp[j + '-' + (i - 1)], dp[j + 1 + '-' + (i - 1)] + 2);
//             } else if (isLeft[j] && isLeft[i]) {
//                 dpTmp = dp[j + '-' + (i - 1)];
//             } else if (!isLeft[j] && !isLeft[i]) {
//                 dpTmp = dp[j + 1 + '-' + i];
//             } else {
//                 dpTmp = dp[j + 1 + '-' + (i - 1)];
//             }
//             if (isLeft[j] && !isLeft[j + 1]) {
//                 dpTmp = Math.max(dpTmp, dp[j + 2 + '-' + i] + 2);
//             }
//             dp[j + '-' + i] = dpTmp;
//         }
//     }
//     return dp['0-' + (s.length - 1)];
// };



/** 44
 * 由上向下超时后 改为由底向上
 * @param {string}
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    let lenS = s.length, lenP = p.length;
    if (!lenS) {
        return !/[a-z|?]/.test(p);
    }
    if (!lenP) {
        return false;
    }
    let pattern = p.charAt(0);
    //优化1:多个*时要合并成一个
    for (let i = 1; i < p.length; i++) {
        if (p.charAt(i) == p.charAt(i - 1) && p.charAt(i) == '*') {
            continue;
        }
        pattern += p.charAt(i);
    }
    lenP = pattern.length;
    let cache = new Array(lenS).fill(false);
    if (pattern.charAt(0) == '*') {
        cache.fill(true);
    } else if (pattern.charAt(0) == '?' || pattern.charAt(0) == s.charAt(0)) {
        cache[0] = true;
    } else {
        return false;
    }
    for (let i = 1; i < lenP; i++) {
        const cacheCurrent = new Array(lenS);
        if (pattern.charAt(i) == '*') {
            for (let j = 0; j < lenS; j++) {
                for (let k = 0; k <= j && !cacheCurrent[j]; k++) {
                    cacheCurrent[j] = cacheCurrent[j] || cache[k];
                }
            }
        } else {
            cacheCurrent[0] = ['?', '*', s.charAt(0)].includes(pattern.charAt(i)) && !/[a-z|?]/.test(pattern.substr(0, i));
            for (let j = 1; j < lenS; j++) {
                if (pattern.charAt(i) == s.charAt(j) || pattern.charAt(i) == '?') {
                    cacheCurrent[j] = cache[j - 1];
                } else {
                    cacheCurrent[j] = false;
                }
            }
        }
        cache = [...cacheCurrent];
    }
    // console.log(cache);
    return cache.pop();
};


// var isMatch = function (s, p) {
//     let pattern = p.charAt(0);
//     for (let i = 1; i < p.length; i++) {
//         if (p.charAt(i) == p.charAt(i - 1) && p.charAt(i) == '*') {
//             continue;
//         }
//         pattern += p.charAt(i);
//     }
//     return dp44(s, pattern, s.length, pattern.length)
// };
// ETL 由上向下,console中看到很多重叠子问题
// const dp44 = (s, p, i, j)=> {
//     if (i < 0) {
//         return !/[a-z|?]/.test(p.substring(0, j + 1));
//     }
//     if (j < 0) {
//         return false;
//     }
//     const cs = s.charAt(i), cp = p.charAt(j);
//     if (cp == '*') {
//         //不用,到此用完,继续用
//         return dp44(s, p, i, j - 1) || dp44(s, p, i - 1, j - 1) || dp44(s, p, i - 1, j);
//     } else if (cp == '?') {
//         return dp44(s, p, i - 1, j - 1);
//     } else {
//         if (cs == cp) {
//             return dp44(s, p, i - 1, j - 1);
//         } else {
//             return false;
//         }
//     }
// };

// console.log(true, isMatch("adceb", "*a*b"));
// console.log(false, isMatch("bbbababbabbbbabbbbaabaaabbbbabbbababbbbababaabbbab", "a******b*"));
// console.log(true, isMatch('a', 'a*'));
// console.log(false, isMatch('cb', 'a'));
// console.log(true, isMatch('adceb', '*a*b'));
// console.log(false, isMatch('acdcb', 'a*c?b'));

/**
 * @param {number[][]} grid
 * @return {number}
 */
// 64
// 思路:由下至少,动态规划,一层一层递增
var minPathSum = function (grid) {
    const memo = new Array(...grid);
    const width = grid[0].length, height = grid.length;
    const loopMax = Math.min(width, height);
    let x = 0, y = 0, step = 0, loop = 1;
    while (loop < loopMax) {
        console.log(x, y, step, loop);
        if (x == 0 && y == 0) {
            memo[x][y] = grid[0][0];
        } else if (x == 0 && y > 0) {
            memo[x][y] = memo[x][y - 1] + grid[x][y];
        } else if (x > 0 && y == 0) {
            memo[x][y] = memo[x - 1][y] + grid[x][y];
        } else {
            memo[x][y] = Math.min(memo[x - 1][y], memo[x][y - 1]) + grid[x][y];
        }
        if (step == 0) {
            x++;
            step = 1;
        } else if (step == 1) {
            if (y == loop - 1) {
                step = 2;
                x = 0;
            }
            y++;
        } else if (step == 2) {
            if (x == loop) {
                step = 1;
                loop++;
                y = 0;
            }
            x++;
        }
    }
    if (width > height) {
        for (let i = 0; i < height; i++) {
            for (let j = loop; j < width; j++) {
                if (i == 0) {
                    memo[i][j] = memo[i][j - 1] + grid[i][j];
                } else {
                    memo[i][j] = Math.min(memo[i - 1][j], memo[i][j - 1]) + grid[i][j];
                }
            }
        }
    } else if (width < height) {
        for (let i = loop; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (j == 0) {
                    memo[i][j] = memo[i - 1][j] + grid[i][j];
                } else {
                    memo[i][j] = Math.min(memo[i - 1][j], memo[i][j - 1]) + grid[i][j];
                }
            }
        }
    }
    return memo[height - 1][width - 1];
};

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
                positions = positions.filter(a => a <= i);
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
        // console.log(cache, i); //?? 打断点时是递增,但是控制台却全部输出最后状态. 网上查是chrome问题,二维数组展开时会重新取值,取的最终值
    }
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
    if (s.charAt(0) === '0' || s.includes('00')) return 0;
    const len = s.length;
    if (len < 2) return len;
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
var isInterleave = function (s1, s2, s3) {
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
    return search(s1, s2, s3, 0, 0, 0);
};

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
};

//    console.log(isInterleave("", "dbbca", "aadbbbaccc"));
//    console.log(isInterleave("aabcc", "", "aadbbbaccc"));
//    console.log(isInterleave("aabcc", "dbbca", ""));
//    console.log(isInterleave("aaa", "bbb", "aaabbb"));


/** 123
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    //去掉头部大数和尾部小数,不然超时
    let idx = 0;
    while (prices[idx + 1] != undefined) {
        if (prices[idx] >= prices[idx + 1]) {
            prices.splice(idx, 1);
        } else {
            break;
        }
    }
    idx = prices.length - 1;
    while (prices[idx - 1] != undefined) {
        if (prices[idx] <= prices[idx - 1]) {
            prices.splice(idx, 1);
            idx--;
        } else {
            break;
        }
    }
    const len = prices.length;
    if (len < 2) {
        return 0;
    }
    //记录各段的最小数
    const minNumber = {};
    //记录各段的状态值
    const dp = new Proxy({}, {
        get(target, prop) {
            if (!target[prop]) {
                return 0;
            } else {
                return target[prop];
            }
        }
    });
    for (let i = 0; i < len - 1; i++) {
        let number = prices[i];
        minNumber[i + '-' + i] = number;
        for (let j = i + 1; j < len; j++) {
            const priceJ = prices[j];
            const key = i + '-' + j;
            if (priceJ < number) {
                number = priceJ;
            }
            minNumber[key] = number;
            dp[key] = Math.max(dp[i + '-' + (j - 1)], priceJ - minNumber[i + '-' + (j - 1)]);
        }
    }
    let ret = 0;
    // 结果为0->len-1间各点分割成两段的和以及整段的最大值
    for (let i = 1; i < len - 2; i++) {
        ret = Math.max(ret, dp[0 + '-' + i] + dp[i + 1 + '-' + (len - 1)]);
    }
    ret = Math.max(ret, dp[0 + '-' + (len - 1)]);
    return ret;
};


/** 139  状态流转:长度从1开始循环,从尾部开始研究,收集字典中所有能在尾部找到的词,收集到的值或运算dp[l-这个的长度],返回dp数组的最后一个值
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    const len = s.length;
    if (!len) {
        return false;
    }
    const dp = new Array(len + 1).fill(false);
    dp[0] = true;
    for (let l = 1; l <= len; l++) {
        const str = s.substr(0, l);
        const arr = [];
        const words = [...wordDict];
        for (let i = l - 1; i >= 0; i--) {
            const ch = str.charAt(i);
            //所有的词从最后一位向前开始比较，有一位不符合就立即splice掉，若符合且到头index=0时收入arr用来计算dp
            for (let j = 0; j < words.length;) {
                const word = words[j];
                const idx = word.length - 1 - (l - 1 - i);
                if (ch == word.charAt(idx)) {
                    if (idx == 0) {
                        words.splice(j, 1);
                        arr.push(word);
                    } else {
                        j++;
                    }
                } else {
                    words.splice(j, 1);
                }
            }
        }
        while (!dp[l] && arr.length) {
            dp[l] = dp[l - arr.pop().length];
        }
    }
    return dp.pop();
};

// console.log(wordBreak("leetcode", ["leet", "code"]));
// console.log(wordBreak("applepenapple", ["apple", "pen"]));
// console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]));

/** 174 dungeon game
 * 由右下角向左上角逐渐向上,到每个宫格的血值为上和左两个方向的最小值,同时要满足于当前宫格的生存条件
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
    if (len == 1) return len;
    const memo = new Array(len).fill(1); //以第i个元素为结尾最长子序列的长度
    for (let i = 1; i < len; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (nums[i] > nums[j] && memo[j] + 1 >= memo[i]) memo[i] = memo[j] + 1;
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
            if (j > 2) temp += dp[j - 2];
            if (temp > max) max = temp;
        }
        dp.push(Math.max(max, dp[i - 1]));
    }
    return Math.max.apply(null, dp);
};


/** 312
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
    const len = nums.length;
    if (len == 0) {
        return 0;
    } else if (len == 1) {
        return nums[0]
    } else if (len == 2) {
        return nums[0] * nums[1];
    }
    const cache = new Array(len);
    cache[0] = cache[1] = nums[0] * nums[1];
    for (let i = 2; i < len; i++) {
        cache[i] = Math.max(cache[i - 1] + nums[i], cache[i - 2] + nums[i] * nums[i - 1]);
    }
    return cache.pop();
};

// console.log(maxProfit([1, 2, 4]));


/** 354  状态流转: 长度为n以第i个元素为结尾 F(n, i) = Max(F(n-1, 0)... F(n-1, length-1))
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
    const len = envelopes.length;
    if (len < 2) {
        return len;
    }
    let cache = new Array(len).fill(1);
    const relations = {};
    const indexes = [];
    for (let i = 0; i < len; i++) {
        relations[i] = [];
        indexes.push(i);
    }
    for (let i = 0; i < len - 1; i++) {
        for (let j = i; j < len; j++) {
            const [[w1, h1], [w2, h2]] = [envelopes[i], envelopes[j]];
            if (w1 > w2 && h1 > h2) {
                relations[i].push(j);
            } else if (w1 < w2 && h1 < h2) {
                relations[j].push(i);
            }
        }
    }
    //必须加这个当进行一轮不递加时,要终止循环,不然会超时
    let keepGoing = true;
    for (let i = 1; i < len && keepGoing && indexes.length; i++) {
        //记录变化的dp值,功能类似cache的上一轮备份
        const change = [];
        keepGoing = false;
        for (let j = 0; j < indexes.length;) {
            //当这个数的小于这个数的个数比i小,则移除
            if (relations[indexes[j]].length < i) {
                indexes.splice(j, 1);
            } else {
                let cur = cache[indexes[j]];
                const arr = relations[indexes[j]];
                for (let k = 0; k < arr.length; k++) {
                    if (cache[arr[k]] + 1 > cur) {
                        cur = cache[arr[k]] + 1;
                        keepGoing = true;
                        break;
                    }
                }
                if (cur > cache[indexes[j]]) {
                    change.push({i: indexes[j], v: cur});
                }
                j++;
            }
        }
        change.forEach(c => {
            cache[c.i] = c.v;
        });
    }
    return Math.max.apply(null, cache);
};

// console.log(maxEnvelopes([[4, 5], [4, 6], [6, 7], [2, 3], [1, 1]]));
// console.log(maxEnvelopes([[4, 5], [6, 7], [2, 3]]));

// 368
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var largestDivisibleSubset = function (nums) {
    const len = nums.length;
    if (!len) return [];
    nums.sort((a, b) => a - b);
    const comb = [];
    nums.forEach(v => comb.push([v]));
    for (let i = 1; i < len; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (nums[i] % nums[j] == 0 && comb[j].length + 1 >= comb[i].length) {
                comb[i] = [...comb[j], nums[i]];
            }
        }
    }
    comb.sort((a, b) => b.length - a.length);
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
            if (nums[0] == nums[1]) return 1;
            return len;
        }
        const arr = [];
        for (let i = 1; i < len; i++) {
            if (nums[i] != nums[i - 1]) arr.push(nums[i]);
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
            if (dp[i] > result) result = dp[i];
        }
        return result;
    };


/** 403 状态流转: 计算每一点跳过来的所有计算跳的能力的长度的集合（units）：所有前面点该属性l,l-1,l+1是否包含两点宽度差值。若最后那点跳过来的长度集合不为空,返回true
 * @param {number[]} stones
 * @return {boolean}
 */
var canCross = function (stones) {
    if (stones.length == 2) {
        return stones[1] - stones[0] == 1
    }
    //units 在该点的起跳能力
    //earliest 是一个优化,等到达此点的前于此点的范围一定小于等于前一个点的该属性 beats 5% => beats 23%
    const dp = [{units: new Set(), earliest: -1}, {units: new Set([1]), earliest: 0}];
    for (let i = 2; i < stones.length; i++) {
        const set = new Set();
        const limit = dp[i - 1].earliest;
        let earliest = 0;
        for (let j = i - 1; j >= limit; j--) {
            const span = stones[i] - stones[j];
            for (let v of dp[j].units.values()) {
                if ([span - 1, span, span + 1].includes(v)) {
                    set.add(span);
                    earliest = j;
                    break;
                }
            }
        }
        dp.push({units: set, earliest: earliest});
    }
    return dp.pop().units.size > 0;
};
// console.log(canCross([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,517,518,519,520,521,522,523,524,525,526,527,528,529,530,531,532,533,534,535,536,537,538,539,540,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560,561,562,563,564,565,566,567,568,569,570,571,572,573,574,575,576,577,578,579,580,581,582,583,584,585,586,587,588,589,590,591,592,593,594,595,596,597,598,599,600,601,602,603,604,605,606,607,608,609,610,611,612,613,614,615,616,617,618,619,620,621,622,623,624,625,626,627,628,629,630,631,632,633,634,635,636,637,638,639,640,641,642,643,644,645,646,647,648,649,650,651,652,653,654,655,656,657,658,659,660,661,662,663,664,665,666,667,668,669,670,671,672,673,674,675,676,677,678,679,680,681,682,683,684,685,686,687,688,689,690,691,692,693,694,695,696,697,698,699,700,701,702,703,704,705,706,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,745,746,747,748,749,750,751,752,753,754,755,756,757,758,759,760,761,762,763,764,765,766,767,768,769,770,771,772,773,774,775,776,777,778,779,780,781,782,783,784,785,786,787,788,789,790,791,792,793,794,795,796,797,798,799,800,801,802,803,804,805,806,807,808,809,810,811,812,813,814,815,816,817,818,819,820,821,822,823,824,825,826,827,828,829,830,831,832,833,834,835,836,837,838,839,840,841,842,843,844,845,846,847,848,849,850,851,852,853,854,855,856,857,858,859,860,861,862,863,864,865,866,867,868,869,870,871,872,873,874,875,876,877,878,879,880,881,882,883,884,885,886,887,888,889,890,891,892,893,894,895,896,897,898,899,900,901,902,903,904,905,906,907,908,909,910,911,912,913,914,915,916,917,918,919,920,921,922,923,924,925,926,927,928,929,930,931,932,933,934,935,936,937,938,939,940,941,942,943,944,945,946,947,948,949,950,951,952,953,954,955,956,957,958,959,960,961,962,963,964,965,966,967,968,969,970,971,972,973,974,975,976,977,978,979,980,981,982,983,984,985,986,987,988,989,990,991,992,993,994,995,996,997,998,1035]));
// console.log(canCross([0, 1, 3, 5, 6, 8, 12, 17]));
// console.log(canCross([0, 1, 2, 3, 4, 8, 9, 11]));


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
        get(target, prop) {
            return target[prop] ? target[prop] : 0;
        }
    });
    const dpOdd = new Proxy({}, {
        get(target, prop) {
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
        des.forEach(d => {
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
        cached.forEach(c => {
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


/** 546 状态流转 取出每个状态的数组中所有与尾部相同的index,当前状态为尾部与每个index合并的最大值
 * @param {number[]} boxes
 * @return {number}
 */
var removeBoxes = function (boxes) {
    const len = boxes.length;
    if (len < 2) {
        return len;
    }
    const remove = (left, right, name, dup) => {
        const ch = boxes[right];
        if (left == right + 1) {
            return dup * dup;
        } else if (left == right) {
            if (boxes[right] == name) {
                return (dup + 1) * (dup + 1);
            } else {
                return dup * dup + 1;
            }
        }
        //尾部与最后一个元素相同,加长尾部
        if (ch == name) {
            return remove(left, right - 1, name, dup + 1);
        }
        const key = left + '-' + right;
        let ret = 0;
        //取出所有与尾部相同的元素
        const indexes = dict[name].filter(a => a <= right && a >= left);
        if (indexes.length) {
            while (indexes.length) {
                const idx = indexes.pop();
                ret = Math.max(ret, remove(left, idx - 1, name, dup + 1) + remove(idx + 1, right - 1, ch, 1));
            }
            ret = Math.max(ret, remove(left, right - 1, ch, 1) + dup * dup);
            dp[key] = ret - dup * dup;
            return ret;
        } else {
            if (dp[key]) {
                return dp[key] + dup * dup;
            } else {
                //无与尾部相同的元素,重新取最后一个元素为新的尾部
                dp[key] = remove(left, right - 1, ch, 1);
                return dp[key] + dup * dup;
            }
        }
    };
    const dict = {}, dp = {};
    boxes.forEach((v, i) => {
        if (dict[v]) {
            dict[v].push(i);
        } else {
            dict[v] = [i];
        }
    });
    return remove(0, len - 2, boxes[len - 1], 1);
};

// console.log(removeBoxes([1, 3, 2, 2]));
// console.log(removeBoxes([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]));
// console.log(removeBoxes([1, 3, 2, 2, 2, 3, 4, 3, 1]));


/**
 * 718
 * 状态流转:最大子数组在以A的i index B的j index为结尾的情况下
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var findLength = function (A, B) {
    const lenA = A.length, lenB = B.length;
    if (!lenA || !lenB) return 0;
    let cache = new Array(lenB);
    let ret = 0;
    for (let i = 0; i < lenA; i++) {
        const cacheTmp = new Array(lenB);
        for (let j = 0; j < lenB; j++) {
            if (!i || !j) {
                if (A[i] == B[j]) {
                    cacheTmp[j] = 1;
                } else {
                    cacheTmp[j] = 0;
                }
            }
            else if (A[i] == B[j]) {
                cacheTmp[j] = cache[j - 1] + 1;
            } else {
                cacheTmp[j] = 0;
            }
        }
        cache = [...cacheTmp]
        ret = Math.max(ret, Math.max.apply(null, cacheTmp));
    }
    return ret;
};
// console.log(findLength([0, 1, 1, 1, 1], [1, 0, 1, 0, 1]));
// console.log(findLength([1, 2, 3, 2, 1], [3, 2, 1, 4, 7]));
// console.log(findLength([70, 39, 25, 40, 7], [52, 20, 67, 5, 31]));


/** 818  将target分成两段,循环1-target的中位数,结果为每种情况的最小值
 * @param {number} target
 * @return {number}
 */
var racecar = function (target) {
    const dp = {0: 0, 1: 1, 3: 2};
    //是否是回头造成的,如果在i点是回头的,在两段衔接时操作是R,反之是AA,会节省一次操作
    const turn = {};
    const dp818 = (target) => {
        if (dp[target]) {
            return dp[target];
        }
        let power = 1, ret = Infinity, mid = Math.ceil(target / 2);
        while (Math.pow(2, power) - 1 < target) {
            power++;
        }
        if (target == Math.pow(2, power) - 1) {
            return dp[target] = power;
        }
        for (let i = 1; i <= mid; i++) {
            ret = Math.min(ret, dp818(i) + dp818(target - i) + (turn[i] ? 1 : 2));
        }
        const dpTurn = dp818(Math.pow(2, power) - 1 - target) + power + 1;
        if (dpTurn <= ret) {
            ret = dpTurn;
            turn[target] = true;
        }
        return dp[target] = ret;
    };
    return dp818(target);
};
// console.log(racecar(7), 3);
// console.log(racecar(2), 4);
// console.log(racecar(4), 5);


/** 871 状态：某个站为终点，经历多少个站数最远到达距离。状态流转：本站本属性为前面的车站循环的本属性的最大值
 * @param {number} target
 * @param {number} startFuel
 * @param {number[][]} stations
 * @return {number}
 */
var minRefuelStops = function (target, startFuel, stations) {
    const len = stations.length;
    if (!len) {
        return startFuel >= target ? 0 : -1;
    }
    if (startFuel >= target) {
        return 0;
    }
    let dp = new Array(len).fill(null);
    for (let i = 0; i < len; i++) {
        if (startFuel - stations[i][0] >= 0) {
            const dpTmp = startFuel + stations[i][1];
            if (dpTmp >= target) {
                return 1;
            }
            dp[i] = dpTmp;
        } else {
            break;
        }
    }
    // 经历多少站数的循环
    for (let stops = 2; stops <= len + 1; stops++) {
        const dpCache = [...dp];
        // 结尾站的循环
        for (let i = stops - 1; i < len; i++) {
            let dpStation = 0;
            //前面站的循环，前面每一站加上本站。起点处理好，比如长度为2时要从index 1开始
            for (let j = stops - 2; j < i; j++) {
                if (dp[j] === null || dp[j] < stations[i][0]) {
                    continue;
                }
                const dpTmp = dp[j] + stations[i][1];
                if (dpTmp >= target) {
                    return stops;
                }
                dpStation = Math.max(dpTmp, dpStation);
            }
            dpCache[i] = dpStation;
        }
        dp = dpCache;
    }
    return -1;
};
// console.log(minRefuelStops(1, 1, []));
// console.log(minRefuelStops(1000, 83, [[47, 220], [65, 1], [98, 113], [126, 196], [186, 218], [320, 205], [686, 317], [707, 325], [754, 104], [781, 105]]));
// console.log(minRefuelStops(1000, 299, [[13, 21], [26, 115], [100, 47], [225, 99], [299, 141], [444, 198], [608, 190], [636, 157], [647, 255], [841, 123]]));
// console.log(minRefuelStops(100, 10, [[10, 60], [20, 30], [30, 30], [60, 40]]));




