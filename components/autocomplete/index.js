function Input(data, el, throttle = 500) {
    this.data = data
    this.el = el
    console.log(data, el)
    this.render()
    this.handleEvents()
}

Input.prototype = {
    handleEvents() {
        // this.el.addEventListener('keyup', throttle(() => {
        //     console.log(888)
        // }, 3000))
        this.el.addEventListener('keyup', this.refresh.bind(this))
    },

    render() {
        console.log(this.el.getBoundingClientRect())
        const autoDiv = document.createElement('ul')
        this.el.parentNode.appendChild(autoDiv)
        this.autoDiv = autoDiv
        autoDiv.style.position = 'absolute'
    },

    refresh() {
        if (!this.autoDiv) {
            return
        }
        this.autoDiv.innerHTML = ''
        const fragment = document.createDocumentFragment()
        this.data.forEach((r) => {
            if (this.el.value && r.startsWith(this.el.value)) {
                const li = document.createElement('li')
                li.innerHTML = r
                fragment.appendChild(li)
            }
        });
        this.autoDiv.appendChild(fragment)
    }
}

function throttle(fn, wait) {
    let previous = 0
    return function () {
        let now = new Date()
        let context = this
        if (now - previous >= wait) {
            fn.apply(context, arguments)
            previous = now
        }
    }
}