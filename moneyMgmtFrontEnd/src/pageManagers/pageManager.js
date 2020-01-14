class PageManager {

    constructor(container) {
        this.container = container
    }

    async fetchAndRenderPageResources() {
        return null
    }

    // Individual page managers will need to have versions of #staticHTML(), 
    // #initBindingsAndEventListners(), and optionally #fetchAndRenderPageResources()
    render() {
        this.container.innerHTML = this.staticHTML
        this.initBindingsAndEventListeners()
        this.fetchAndRenderPageResources()
    }

    handleAuthorizationError(err) {
        this.handleAlert(err.message, 'danger')
        this.redirect('welcome')
    }

    formatCostForDisplay(num) {
        // Takes a number (ex: 1000) and returns a string (=> "$1,000")
        const numArray = num.toString().split("").reverse()
        let negative = false
        if (num < 0) {
            negative = true
            numArray.pop()
        }
        const commaCount = Math.floor(numArray.length / 3)
        for (let i = commaCount; i > 0; i--) {
            let placement = i * 3
            numArray.splice(placement, 0, ',')
        }
        if (numArray[numArray.length - 1] === ",") { numArray.pop() }
        if (negative === true) { numArray.push("-") }
        return numArray.reverse().join("")
    }

    formatCostForCalculation(string) {
        // Takes a string (ex: "$1,000") and returns a number (=> 1000)
        return parseInt(string.replace(/[^0-9]/g, ""), 10)
    }

    remainingMonths(weddingDate) {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const weddingMonth = new Date(weddingDate.split(".")[0]).getMonth()
        const weddingYear = new Date(weddingDate.split(".")[0]).getFullYear()
        if(currentYear !== weddingYear) {
            return ((weddingYear - currentYear) * 12) + weddingMonth
        } else {
            return weddingMonth - currentMonth
        }
    }

}