class EncumbranceData extends DataManager {

    constructor(adapter) {
        super(adapter)
    }

    insertEncumbrances(encumbrances) {
        const eTableBody = document.querySelector('#encumbranceTable tbody')
        if (encumbrances.length === 0) {
            const row = eTableBody.insertRow(1)
            row.id = "instructionRow"
            row.innerHTML = "<td colspan='2'>Click 'Add Line' to add a new encumbrance</td>"
        } else {
            for (let enc of encumbrances) {
                let numRows = document.getElementById('encumbranceTable').rows.length
                let row = eTableBody.insertRow(numRows - 1)

                let nameCell = row.insertCell(0)
                nameCell.className = "tableText"
                nameCell.innerText = enc.encumbrance_name

                let amountCell = row.insertCell(1)
                amountCell.className = "tableNum"
                amountCell.dataset.encumbranceName = enc.encumbrance_name
                amountCell.innerText = `$${this.formatCostForDisplay(enc.amount)}`
            }
        }
    }

    insertUpdatedEncumbrances(encumbrances) {

    }

    updateSummaryTotals() {

    }


    // BUTTON LISTENERS

    setAddEncumbranceLineButtonListener() {
        const addButton = document.querySelector('.tableButton .addLine')
        addButton.addEventListener("click", e => {
            const eTableBody = document.querySelector('#encumbranceTable tbody')
            const numRows = document.getElementById('encumbranceTable').rows.length
        })
    }

    setEditEncumbrancesButtonListener() {

    }



    async handleEncumbranceEditSubmit(event) {
        event.preventDefault();

    }



}