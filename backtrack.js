/**
 * Created by luye on 04/01/2018.
 */
// 93
var restoreIpAddresses = function (s) {
    const res = [], indexes = [];
    split(s, 4, [], indexes);
    indexes.forEach((v) => {
        const ip = [];
        let left = 0;
        for (let i = 0; i < v.length; i++) {
            ip.push(s.substr(left, v[i]));
            left += v[i];
        }
        res.push(ip.join('.'));
    });
    return res;
};

var split = function (s, level) {
    const array = arguments[2] ? arguments[2] : [];
    const res = arguments[3] ? arguments[3] : [];
    if (level == 1) {
        const num = Number.parseInt(s);
        if (num < 256 && (num + '').length == s.length) {
            array.push(s.length);
            const path = [...array];
            res.push(path);
            array.pop();
        }
    } else {
        for (let i = 1; i < 4; i++) {
            const num = Number.parseInt(s.substr(0, i));
            if (num < 256 && s.length - i <= (level - 1) * 3 && (num + '').length == i) {
                array.push(i);
                arguments.callee(s.substr(i), level - 1, array, res);
                array.pop();
            }
        }
    }
}

console.log(restoreIpAddresses("010010"));