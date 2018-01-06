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
var minPathSum = function (grid) {
    var x = arguments[1] !== undefined ? arguments[1] : grid[0].length - 1;
    var y = arguments[2] !== undefined ? arguments[2] : grid.length - 1;
    var dict = arguments[3] ? arguments[3] : {};
    if (dict[x + '-' + y]) {
        return dict[x + '-' + y];
    }
    let res;
    if (x == 0 && y == 0) {
        res = grid[0][0];
    } else if (x > 0 && y == 0) {
        res = arguments.callee(grid, x - 1, y, dict) + grid[y][x];
    } else if (x == 0 && y > 0) {
        res = arguments.callee(grid, x, y - 1, dict) + grid[y][x];
    } else {
        res = Math.min(arguments.callee(grid, x - 1, y, dict), arguments.callee(grid, x, y - 1, dict)) + grid[y][x];
    }
    dict[x + '-' + y] = res;
    return res;
};
// [
//     [1, 4, 8, 6, 2, 2, 1, 7],
//     [4, 7, 3, 1, 4, 5, 5, 1],
//     [8, 8, 2, 1, 1, 8, 0, 1],
//     [8, 9, 2, 9, 8, 0, 8, 9],
//     [5, 7, 5, 7, 1, 8, 5, 5],
//     [7, 0, 9, 4, 5, 6, 5, 6],
//     [4, 9, 9, 7, 9, 1, 9, 0]]
console.log(minPathSum([[1, 4, 8, 6, 2, 2, 1, 7], [4, 7, 3, 1, 4, 5, 5, 1], [8, 8, 2, 1, 1, 8, 0, 1], [8, 9, 2, 9, 8, 0, 8, 9], [5, 7, 5, 7, 1, 8, 5, 5], [7, 0, 9, 4, 5, 6, 5, 6], [4, 9, 9, 7, 9, 1, 9, 0]]));
console.log(minPathSum([[1, 3, 1, 2], [1, 5, 1, 2], [4, 2, 1, 2]]));
console.log(minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]]));
console.log(minPathSum([[0]]));



//416
/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 状态流转：F(n, c) = F(n-1,c) || F(n-1, c-v[i])
var canPartition = function (nums) {
    let sum = 0, sumLeft = 0, sumRight;
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


console.log(canPartition([1, 2, 3, 4, 5, 6, 7]));
console.log(canPartition([1, 5, 11, 5]));
console.log(canPartition([1, 2,5]));
