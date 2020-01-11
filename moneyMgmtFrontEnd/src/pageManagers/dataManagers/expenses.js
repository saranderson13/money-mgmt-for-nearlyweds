class ExpenseData {

    constructor(adapter) {
        this.adapter = adapter
    }

    insertExpenses(expenses) {
        const editForm = document.getElementById('editExpenseTable')
        editForm.dataset.expenseId = expenses.id
        const expenseInputs = document.querySelectorAll('td[data-expense-category]')
        expenseInputs.forEach( function(exp) {
            let expenseType = exp.dataset.expenseCategory
            let formattedCost = this.formatCostForDisplay(expenses[expenseType])
            exp.innerHTML = `$${formattedCost}`
        }.bind(this))
    }

    insertUpdatedExpenses(expenses) {
        const expenseInputs = document.querySelectorAll('td[data-expense-category]')
        expenseInputs.forEach( function(exp) {
            let expenseType = exp.dataset.expenseCategory
            let formattedCost = this.formatCostForDisplay(expenses[expenseType])
            exp.innerHTML = `$${formattedCost}`
        }.bind(this))
        this.updateSummaryTotals()

        // Remove Submit
        const submitButton = document.getElementById('expenseSubmit')
        const buttonRow = submitButton.parentNode
        buttonRow.removeChild(submitButton)

        // Add Edit Button
        const editButton = document.createElement('button')
        editButton.className = "editExpense"
        editButton.innerText = "Edit"
        buttonRow.appendChild(editButton)
        this.setEditButtonListener()
    }

    formatCostForDisplay(num) {
        const numArray = num.toString().split("").reverse()
        const commaCount = Math.floor(numArray.length / 3)
        for (let i = commaCount; i > 0; i--) {
            let placement = i * 3
            numArray.splice(placement, 0, ',')
        }
        if (numArray[numArray.length - 1] === ",") { numArray.pop() }
        return numArray.reverse().join("")
    }

    formatCostForCalculation(string) {
        return parseInt(string.replace(/[^0-9]/g, ""), 10)
    }

    updateSummaryTotals() {
        this.insertTotalExpenses()
    }

    insertTotalExpenses() {
        const totalBox = document.querySelector('td[data-summary-category="totalExpenses"')
        const numBoxes = document.querySelectorAll('td[data-expense-category]')
        const amounts = Array.from(numBoxes).map( b => this.formatCostForCalculation(b.innerText) )
        totalBox.innerText = this.formatCostForDisplay(`$${amounts.reduce((a, c) => a + c, 0)}`)
    }

    setEditButtonListener() {
        const editButton = document.querySelector('.tableButton .editExpense');
        const buttonRow = editButton.parentNode
        const allFields = document.querySelectorAll('[data-expense-category]');

        editButton.addEventListener("click", e => {
            e.preventDefault();

            // For each field, set id, name and value
            for (let ea of Array.from(allFields)) {
                let currentValue = ea.innerText.replace(/[^0-9]/g, "")
                let inputId = ea.dataset.expenseCategory
                ea.innerHTML = `<input type="text" id=${inputId} name=${inputId} value="${currentValue}"></input>`
            }
            // Remove edit button
            buttonRow.removeChild(editButton);

            // Add submit button
            const submitButton = document.createElement('input')
            submitButton.type = "submit"
            submitButton.id = "expenseSubmit"
            submitButton.className = "editExpense"
            submitButton.innerText = "Submit"
            buttonRow.appendChild(submitButton)

        }, {once: true})
    }

    async handleExpenseEditSubmit(event) {
        event.preventDefault();
        // console.log(event)

        // Set form; used to grab input values
        this.editForm = document.getElementById('editExpenseTable')

        // Map all input values to variables
        const [venue, catering, photography, videography, flowers, cake, attire, band, djmc, invitations, favors, officiant, beauty, jewelry, rentals, other] = Array.from(this.editForm.querySelectorAll('input')).map(i => i.value)

        // Set expense variable separately because it isn't an input
        const id = this.editForm.dataset.expenseId

        // Define params from variables
        const params = {
            expenses: {
                id, venue, catering, photography, videography, flowers, cake, attire, band, djmc, invitations, favors, officiant, beauty, jewelry, rentals, other
            }
        }

        // Attempt PATCH request
        try {
            const resp = await this.adapter.updateExpenses(params)
            // reload values
            console.log(resp)
            this.insertUpdatedExpenses(resp)
            // reset edit button
        } catch(err) {
            console.log(err)
            // this.handleAlert(err, 'danger')
        }
        // console.log(params)
    }

}