/**
 * Created by luye on 28/03/2019.
 */

/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
    const len = s.length, times = {}, visited = {}, stack = new Stack();
    for (let i = 0; i < len; i++) {
        const c = s.charAt(i);
        if (times[c]) {
            times[c]++;
        } else {
            times[c] = 1;
        }
    }
    for (let i = 0; i < len; i++) {
        const c = s.charAt(i);
        times[c]--;
        if (visited[c]) {
            continue;
        }
        while (stack.size() && stack.peek() > c && times[stack.peek()]) {
            const dump = stack.pop();
            visited[dump] = false;
        }
        stack.push(c);
        visited[c] = true;
    }
    return stack.stringfy();
}

class Stack{
    constructor(value){
        this.list = value || [];
    }

    peek() {
        return this.list[this.size() - 1];
    }

    pop() {
        return this.list.pop();
    }

    push(el) {
        this.list.push(el);
    }

    size() {
        return this.list.length;
    }

    stringfy(){
        let res = '';
        this.list.forEach(el => {
            res += el;
        });
        return res;
    }
}

console.log(removeDuplicateLetters("bcabc"));
console.log(removeDuplicateLetters("cbacdcbc"));

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