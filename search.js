/**
 * Created by luye on 10/01/2018.
 */
// 200
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let ret = 0;
    const visited = {};
    const stack = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] == 1) {
                const key = i + '-' + j;
                if (!visited[key]) {
                    ret++;
                    if (i > 0)stack.push(grid[i - 1][j]);
                    if (i < grid.length)stack.push(grid[i + 1][j]);
                    if (j > 0)stack.push(grid[i][j - 1]);
                    if (j < grid[0].length)stack.push(grid[i][j + 1]);
                }
            }
        }
    }
    return ret;
};
var hasCount = function (grid, x, y) {
    // let ret = true;
    // if (x > 0 && grid[x - 1][y] == 2)ret = false;
    // // if (x < grid.length && grid[x + 1][y] == 2)ret = false;
    // if (y > 0 && grid[x][y - 1] == 2)ret = false;
    // // if (x > 0 && grid[x][y + 1] == 2)ret = false;
    return x > 0 && grid[x - 1][y] == 1 || y > 0 && grid[x][y - 1] == 1;
}

// console.log(numIslands([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]));
console.log(numIslands([["1", "1", "1"], ["0", "1", "0"], ["1", "1", "1"]]));
