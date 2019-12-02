// const Prom = require('./sample')
function PromiseLike(fn) {
    if (typeof fn !== 'function') {
        throw TypeError('it has to be a function to initialize')
    }
    const self = this
    self.status = 'pending'
    self.value = null
    self.resolveList = []
    self.rejectList = []

    function _resolve(value) {
        self.status = 'resolved'
        self.value = value
        self.resolveList.forEach(fn => fn())
    }
    function _reject(err) {
        self.status = 'rejected'
        throw Error(err)
    }

    try {
        fn(_resolve.bind(this), _reject.bind(this))
    } catch (err) {
        _reject(err)
    }
}

function resolvePromise(promise, val, resolve, reject) {
    resolve(val)
}

PromiseLike.prototype.then = function (onResolve, onReject) {
    onResolve = typeof onResolve == 'function' ? onResolve : (value) => { return value }
    onResolve = typeof onReject == 'function' ? onReject : (err) => { throw err }
    const self = this
    const p = new Promise(function (resolve, reject) {
        if (self.status == 'resolved') {
            setTimeout(() => {
                const val = onResolve(self.value)
                resolvePromise(p, val, resolve, reject)
            }, 0)
        } else if (self.status == 'pending') {
            self.resolveList.push(() => {
                setTimeout(() => {
                    const val = onResolve(self.value)
                    resolvePromise(p, val, resolve, reject)
                }, 0)
            })
            self.rejectList.push(() => {
                setTimeout(() => {
                    onReject(self.value)
                    // _resolvePromise(p, val)
                }, 0)
            })
        } else if (self.status == 'rejected') {
            self.rejectList.push(() => {
                setTimeout(() => {
                    onReject(self.value)
                    // _resolvePromise(p, val)
                }, 0)
            })
        }
    })
    return p;
}

PromiseLike.all = function (list) {
    return new PromiseLike((resolve, reject) => {
        let ret = [], count = 0
        list.forEach((p, idx) => {
            p.then((data) => {
                ret[i] = data
                count++
                if (count == list.length) {
                    resolve(ret)
                }
            }, reject)
        });
    })
}


let promise
//test1: then
// promise = new PromiseLike((resolve, reject) => {
//     resolve(123);
// });
// promise.then((value) => {
//     console.log('value1', value);
// });

// test2: async then

// promise = new PromiseLike(function (resolve, reject) {
//     setTimeout(function () {
//         resolve(123);
//     }, 1000);
// });

// promise.then(function (value) {
//     console.log('value1', value);
// }, function (reason) {
//     console.log('reason1', reason);
// });


// test3: then chain

promise = new PromiseLike((resolve, reject) => {
    resolve(123);
});

promise.then((value) => {
    console.log('value1', value);
    return 456;
}).then((value) => {
    console.log('value2', value);
});