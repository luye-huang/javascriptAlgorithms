function promiseLike(fn) {
    if (typeof fn !== 'function') {
        throw TypeError('it has to be a function to initialize')
    }
    this.status = 'pending'
    this.value = null
    this.fulfills = []

    this._resolve = function (value) {
        this.status = 'fulfilled'
        this.value = value
        this.fulfills.forEach(fn => fn())
    }
    this._reject = function () {
        this.status = 'rejected'
    }
    try {
        fn(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
        this.reject()
    }
}

promiseLike.prototype.then = function (resolve, reject) {
    const self = this
    return new promiseLike(function () {
        if (self.status == 'fulfilled') {
            resolve(self.value)
        } else if (self.status == 'pending') {
            self.fulfills.push(() => {
                resolve(self.value)
            })
        }
    })
}

promiseLike.all = function () {
    console.log('all')
}

const res = 10
// let p = new promiseLike(1)
p = new promiseLike(function (resolve, reject) {
    setTimeout(function () {
        if (res) {
            resolve(res)
        } else {
            reject('error')
        }
    }, 1000)
})
p.then(function (v) {
    console.log(v)
})

promiseLike.all()


//test of then chain
let promise = new promiseLike((resolve, reject) => {
    resolve(123);
});

promise.then((value) => {
    console.log('value1', value);
    return 456;
}).then((value) => {
    console.log('value2', value);
});
