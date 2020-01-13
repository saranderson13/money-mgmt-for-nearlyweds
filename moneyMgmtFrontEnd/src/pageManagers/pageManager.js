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


    // !!!!!SHARED WITH EXPENSE DATA - COULD INHERIT?
    formatCostForDisplay(num) {
        // Takes a number (ex: 1000) and returns a string (=> "$1,000")
        const numArray = num.toString().split("").reverse()
        const commaCount = Math.floor(numArray.length / 3)
        for (let i = commaCount; i > 0; i--) {
            let placement = i * 3
            numArray.splice(placement, 0, ',')
        }
        if (numArray[numArray.length - 1] === ",") { numArray.pop() }
        return numArray.reverse().join("")
    }

    // !!!!!SHARED WITH ENCUMBRANCE DATA - COULD SET UP INHERITANCE?
    formatCostForCalculation(num) {
        // Takes a string (ex: "$1,000") and returns a number (=> 1000)
        return parseInt(string.replace(/[^0-9]/g, ""), 10)
    }

}