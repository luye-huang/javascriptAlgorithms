/**
 * Created by luye on 29/03/2019.
 */
/**
 * 1001
 * @param {number} N
 * @param {number[][]} lamps
 * @param {number[][]} queries
 * @return {number[]}
 */
var gridIllumination = function (N, lamps, queries) {
    const res = [];
    for (let i = 0; i < queries.length; i++) {
        const toKill = [];
        let status = 0, killed = 0;
        for (let j = 0; j < lamps.length; j++) {
            if (!status) {
                if (queries[i][0] == lamps[j][0] || queries[i][1] == lamps[j][1] || Math.abs(queries[i][0] - lamps[j][0]) == Math.abs(queries[i][1] - lamps[j][1])) {
                    status = 1;
                }
            }
            if (Math.abs(queries[i][0] - lamps[j][0]) <= 1 && Math.abs(queries[i][1] - lamps[j][1]) <= 1) {
                toKill.push(j);
            }
        }
        for (let j = 0; j < toKill.length; j++) {
            lamps.splice(toKill[j] - killed, 1);
            killed++;
        }
        res.push(status);
    }
    return res;
};


//    5
//            [[0,0],[4,4]]
//            [[1,1],[1,0]]
console.log(gridIllumination(10, [[6,9],[6,4],[4,5],[7,1],[9,4],[1,1],[2,3],[4,2],[9,1]], [[7,8],[7,7],[8,2],[4,3],[8,9]]));
//console.log(numDecodings('101'));
//    console.log(numDecodings('110'));
//    console.log(numDecodings('611'));
//    console.log(numDecodings('226'));
//    console.log(numDecodings('1212'));