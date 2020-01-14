class EncumbranceData extends DataManager {

    constructor(adapter) {
        super(adapter)
    }

    insertEncumbrances(encumbrances, planId) {
        const encForm = document.getElementById('encumbranceForm')
        encForm.dataset.planId = planId
        const eTableBody = document.querySelector('#encumbranceTable tbody')
        if (encumbrances.length === 0) {
            const row = eTableBody.insertRow(1)
            row.id = "instructionRow"
            row.innerHTML = "<td colspan='2'>Click 'Add Line' to add a new encumbrance</td>"
        } else {
            for (let enc of encumbrances) {
                let numRows = document.getElementById('encumbranceTable').rows.length
                let row = eTableBody.insertRow(numRows - 1)
                row.className = "eLine"
                row.dataset.eId = `${enc.id}`

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

    clearEncumbrances() {
        const encTable = document.getElementById('encumbranceTable')
        // const tLength = encTable.rows.length

        while(encTable.rows.length > 2) {
            encTable.deleteRow(1);
        }
    }

    resetEncumbranceButtons() {
        const encTableHeader = document.querySelector('#encumbranceTable .savingsPageTableHeader')
        encTableHeader.colSpan = "2"
        const bRow = document.getElementById('encButtonRow')
        bRow.innerHTML = '<td class="tableButton"><button class="addLine">Add Line</button></td><td class="tableButton"><button class="editLines">Edit Lines</button></td>'
        this.setAddEncumbranceLineButtonListener()
        this.setEditEncumbrancesButtonListener()  
    }

    insertUpdatedEncumbrances(encumbrances, planId) {
        this.clearEncumbrances()
        this.insertEncumbrances(encumbrances, planId)
        this.resetEncumbranceButtons()

        let encTotal = 0
        if( encumbrances.length > 0 ){
            encTotal = encumbrances.map(e => e.amount).reduce((a,c) => a + c)
        }
        const totalEncCell = document.querySelector('[data-summary-category = encTotal]')
        totalEncCell.innerHTML = `$${this.formatCostForDisplay(encTotal)}`
    }

    updateSummaryTotals() {

    }


    // BUTTON LISTENERS

    setAddEncumbranceLineButtonListener() {
        const addButton = document.querySelector('.tableButton .addLine')
        addButton.addEventListener("click", e => {
            e.preventDefault()
            const eTableBody = document.querySelector('#encumbranceTable tbody')
            const numRows = document.getElementById('encumbranceTable').rows.length
            let row = eTableBody.insertRow(numRows - 1)

            let nameCell = row.insertCell(0)
                nameCell.className = "tableText"
                nameCell.innerHTML = '<input type="text" id="newEncName" name="newEncName" placeholder="Encumbrance Name"></input>'

            let numCell = row.insertCell(1);
                numCell.className = "tableNum"
                numCell.innerHTML = '<input type="text" id="newEncAmount" name="newEncAmount" placeholder="Numbers only, no $ or commas"></input>'
        
            // Remove edit button
            const buttonCell = e.target.parentNode
            const otherCell = buttonCell.nextElementSibling
            buttonCell.removeChild(addButton);
            otherCell.removeChild(otherCell.firstChild)

            // Add submit button
            const saveLine = document.createElement('button')
            saveLine.id = "saveLine"
            saveLine.innerText = "Save Line"
            buttonCell.appendChild(saveLine)
        })
    }

    async handleAddLineSubmit(e) {
        e.preventDefault();
        
        const fields = document.querySelectorAll('#encumbranceForm input')
        const [encumbrance_name, amount] = Array.from(fields).map(i => i.value)
        const savings_plan_id = document.querySelector('#encumbranceForm').dataset.planId
        console.log(savings_plan_id)
        const params = {
            encumbrance: {
                savings_plan_id, encumbrance_name, amount
            }
        }

        try {
            const resp = await this.adapter.addEncumbrance(params)
            this.clearEncumbrances()
            this.insertEncumbrances(resp, savings_plan_id)
            this.resetEncumbranceButtons()

            // Update summary table
            const savingsPlan = await this.adapter.getAsset("savings")
            const wedding = await this.adapter.getAsset("wedding")
            this.parent.insertSavingsSummary(savingsPlan, wedding.date)

        } catch(err) {
            console.log(err)
        }
    }

    setEditEncumbrancesButtonListener() {
        const editButton = document.querySelector('.tableButton .editLines')
        editButton.addEventListener("click", e => {
            e.preventDefault()
            
            // get all encRows
            const eRows = document.querySelectorAll('#encumbranceTable tr.eLine')
            eRows.forEach( row => {
                // Get existing cells
                let nameCell = row.querySelector('.tableText')
                let numCell = row.querySelector('.tableNum')

                // Create delete cell & checkbox
                let deleteBox = row.insertCell(0)
                let eId = deleteBox.parentNode.dataset.eId
                deleteBox.className = "encDeleteCheckbox";
                let checkbox = document.createElement('input')
                checkbox.type = "checkbox"
                checkbox.dataset.eId = eId
                checkbox.name = nameCell.innerText.split(" ").join("-")
                deleteBox.appendChild(checkbox)

                // Replace nameCell & numCell with inputs
                nameCell.innerHTML = `<input type="text" name="editEncName" value="${nameCell.innerText}" required></input>`
                numCell.innerHTML = `<input type="text" name="editEncAmount" value="${this.formatCostForCalculation(numCell.innerText)}" required></input>`
            })

            // Adjust table header to fit third column
            const tableHeader = document.querySelector('#encumbranceTable .savingsPageTableHeader')
            tableHeader.colSpan = "3"

            // Remove add line button
            const buttonCell = e.target.parentNode
            const otherCell = buttonCell.previousElementSibling
            buttonCell.removeChild(editButton);
            otherCell.removeChild(otherCell.firstChild)
            otherCell.colSpan = "2"
            otherCell.className = "noteCell"
            otherCell.innerText = "**Checked lines will be deleted**"

            // Add submit button
            const saveEdits = document.createElement('button')
            saveEdits.id = "saveEdits"
            saveEdits.innerText = "Save Edits"
            buttonCell.appendChild(saveEdits)
        })
    }



}