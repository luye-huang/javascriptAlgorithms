/**
 * Created by luye on 28/03/2019.
 */
/**
 * 735
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function (asteroids) {
    const res = [];
    let temp;
    asteroids.forEach(a => {
        temp = res.pop();
        while (temp) {
            if (temp * a > 0 || temp < 0 && a > 0) {
                res.push(temp);
                res.push(a);
                break;
            } else if (Math.abs(temp) > Math.abs(a)) {
                res.push(temp);
                break;
            } else if (Math.abs(temp) < Math.abs(a)) {
                temp = res.pop();
            } else {
                break;
            }
        }
        !temp && res.push(a);
    });
    return res;
};

// console.log(asteroidCollision([1,-2,-2,-2]));
// console.log(asteroidCollision([-2,-1,1,2]));
// console.log(asteroidCollision([5,10,-5]));