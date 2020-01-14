class DataManager {

    constructor(adapter) {
        this.adapter = adapter
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


}