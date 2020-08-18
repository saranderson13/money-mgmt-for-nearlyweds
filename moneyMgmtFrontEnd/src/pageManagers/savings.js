class SavingsPage extends PageManager {

    constructor(container, adapter, parent) {
        super(container)
        this.adapter = new SavingsAdapter(adapter);
        this.encumbrances = new EncumbranceData(this.adapter, this)
        this.encumbrances.parent = this
        this.parent = parent
    }

    initBindingsAndEventListeners() {
        this.encumbrances.setAddEncumbranceLineButtonListener();
        this.encumbrances.setEditEncumbrancesButtonListener();
        this.setAddSavingsButtonListener();
        this.setEditValuesButtonListener();

        // Listeners for dynamic buttons.
        const savingsPage = this.parent.router.routes.savings
        this.container.addEventListener('click',function(e){
            if (e.target.type !== "checkbox" && e.target.type !== "radio" && e.target.id !== "login-button" && e.target.id !== "signup-button") {
                e.preventDefault()
                if(e.target && e.target.id === "saveEdits") {
                    savingsPage.handleEncumbranceEditSubmit(e)
                } else if(e.target && e.target.id === "editSummarySubmit") {
                    savingsPage.handleValueEditSubmit(e)
                } else if(e.target && e.target.id === "saveLine") {
                    savingsPage.encumbrances.handleAddLineSubmit(e)
                }
            }
         });
    }

    async fetchAndRenderPageResources() {
        try {
            // fetch data
            const savingsPlan = await this.adapter.getAsset("savings")
            const wedding = await this.adapter.getAsset("wedding")

            // call insert functions
            this.encumbrances.insertEncumbrances(savingsPlan.encumbrances, savingsPlan.id);
            this.insertSavingsIdToForms(savingsPlan)
            this.insertSavingsSummary(savingsPlan, wedding.date);
            this.insertUserName(wedding.users, savingsPlan.user_id);
        } catch(err) {
            this.handleAuthorizationError(err)
        }
    }

    insertUserName(users, user_id) {
        const planTitle = document.getElementById('planName');
        const user = users.find( (user) => {
            return user.id == user_id
        })
        planTitle.innerHTML = `Savings Plan for ${user.first_name}`
    }

    // This is to make sure submitted forms will pass the savings plan to the backend.
    insertSavingsIdToForms(savings) {
        // Add id to Add Savings form.
        const addForm = document.querySelector('form#addSavingsForm')
        addForm.dataset.savingsId = savings.id

        // Add id to Edit Summary form.
        const summaryForm = document.querySelector('form#savingsSummary')
        summaryForm.dataset.savingsId = savings.id
    }

    // This inserts values into the summary table on INITIAL LOAD
    insertSavingsSummary(plan, weddingDate) {
        // Grab all calculated values.
        const fieldValues = this.summaryCalculations(plan, weddingDate)

        // Add values that do not need to be calculated to the object. (pulled straight from plan object)
        fieldValues.income = plan.income_per_month;
        fieldValues.currentSavings = plan.current_savings;
        fieldValues.declaredGoal = plan.monthly_savings_goal;

        // Grab all fields from the summary table.
        const summaryFields = document.querySelectorAll('[data-summary-category]')

        // Iterate over the summary fields to add appropriate data.
        summaryFields.forEach( function(field) {
            // The data-summary category will correspond to a key in the fieldValues object.
            let fieldCategory = field.dataset.summaryCategory;
            let formattedValue = this.formatCostForDisplay(fieldValues[fieldCategory])
            field.innerHTML = `$${formattedValue}`
        }.bind(this))
    }

    // This calculates values for the summary table that are not pulled from the plan object.
    summaryCalculations(plan, weddingDate) {
        let encTotal = 0
        if( plan.encumbrances.length > 0 ){
            encTotal = plan.encumbrances.map(e => e.amount).reduce((a,c) => a + c)
        }
        const remainingIncome = plan.income_per_month - encTotal
        const recommendedGoal = Math.ceil(remainingIncome / 2)
        const projectedOnPlan = plan.monthly_savings_goal * this.remainingMonths(weddingDate)
        // Return as an object with keys that correspond to the data-summary-category's in the table.
        return {encTotal, remainingIncome, recommendedGoal, projectedOnPlan}
    }

    // This inserts values into the summary table when encumbrances are updated.
    // Separate function because not all fields need to be updated, and wedding date is not available.
    insertSavingsSummaryOnEncEdit(plan) {
        // Calculate total encumbrances and set value in cell.
        let encTotal = 0
        if( plan.encumbrances.length > 0 ){
            encTotal = plan.encumbrances.map(e => e.amount).reduce((a,c) => a + c)
        }
        const totalEncCell = document.querySelector('[data-summary-category = encTotal]')
        totalEncCell.innerHTML = `$${this.formatCostForDisplay(encTotal)}`

        // Calculate remaining income and set value in cell
        const remainingIncomeCell = document.querySelector('[data-summary-category = remainingIncome]')
        const remainingIncome = plan.income_per_month - encTotal
        remainingIncomeCell.innerHTML = `$${this.formatCostForDisplay(remainingIncome)}`

        // Calculate recommended goal and set value in cell
        const recommendedGoalCell = document.querySelector('[data-summary-category = recommendedGoal]')
        const recommendedGoal = Math.ceil(remainingIncome / 2)
        recommendedGoalCell.innerHTML = `$${this.formatCostForDisplay(recommendedGoal)}`
    }

    // Calculates the remaining months. Used to calculate future savings on the current plan.
    remainingMonths(weddingDate) {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const weddingMonth = new Date(weddingDate.split(".")[0]).getMonth()
        const weddingYear = new Date(weddingDate.split(".")[0]).getFullYear()
        if(currentMonth > weddingMonth && currentYear !== weddingYear) {
            return 12 - currentMonth + weddingMonth - 1
        } else if(currentYear !== weddingYear) {
            return ((weddingYear - currentYear) * 12) + weddingMonth
        } else {
            return weddingMonth - currentMonth
        }
    }

    setAddSavingsButtonListener() {
        const addSubmit = document.querySelector('button#savingsSubmit')
        addSubmit.addEventListener("click", e => this.handleAddSavings(e))
    }

    async handleAddSavings(event) {
        event.preventDefault();
        // grab form
        // grab amount from form
        // maybe set savings id?
        const amount = document.querySelector('input#savingsEntry').value
        const id = document.querySelector('form#addSavingsForm').dataset.savingsId
        // put amount into params
        const params = {
            savings: {
                id, amount
            }
        }
        // attempt patch
        try {
            const resp = await this.adapter.updateSavings(params)
            const wedding = await this.adapter.getAsset("wedding")
            this.insertSavingsSummary(resp, wedding.date)
            document.querySelector('input#savingsEntry').value = ""
            this.handleAlert("Savings successfully added.", 'success')
        } catch(err) {
            console.log(err)
        }
    }

    setEditValuesButtonListener() {
        const editButton = document.querySelector('.tableButton .editValues');
        const buttonRow = editButton.parentNode
        const allFields = document.querySelectorAll('[data-editable="true"]');

        editButton.addEventListener("click", e => {
            e.preventDefault();
            
            for(let ea of Array.from(allFields)) {
                let currentValue = this.formatCostForCalculation(ea.innerText)
                let inputId = ea.dataset.summaryCategory
                ea.innerHTML = `<input type="text" id=${inputId} name=${inputId} value="${currentValue}"></input>`
            }

            buttonRow.removeChild(editButton)

            const submitButton = document.createElement('input')
            submitButton.type = "submit"
            submitButton.id = "editSummarySubmit"
            submitButton.className = "editSavings"
            submitButton.innerText = "Submit"
            buttonRow.appendChild(submitButton)
            
        })
    }

    async handleValueEditSubmit(event) {
        event.preventDefault();

        const summaryForm = document.getElementById('savingsSummary')

        const [income, monthly_savings_goal] = Array.from(summaryForm.querySelectorAll('input[type="text"]')).map(i => i.value.replace(/[^0-9]/g, ""))
        const id = summaryForm.dataset.savingsId
        const params = {
            savings: {
                id, income, monthly_savings_goal
            }
        }

        if(income !== "" && monthly_savings_goal !== "") {
            try {
                const resp = await this.adapter.updateSavings(params)
                const wedding = await this.adapter.getAsset("wedding")
                console.log(resp)
                this.insertSavingsSummary(resp, wedding.date)

                // Remove Submit
                const submitButton = document.getElementById('editSummarySubmit')
                if(submitButton) {
                    const buttonRow = submitButton.parentNode
                    buttonRow.removeChild(submitButton)

                    // Add Edit Button
                    const editButton = document.createElement('button')
                    editButton.className = "editValues"
                    editButton.innerText = "Edit Values"
                    buttonRow.appendChild(editButton)
                    this.setEditValuesButtonListener()
                }
                
            } catch (err) {
                console.log(err)
            }
        } else {
            this.handleAlert("Fields must not be empty", "danger")
        }
    }


    async handleEncumbranceEditSubmit(event) {
        event.preventDefault();
        const eForm = document.getElementById('encumbranceForm')
        const eRows = document.querySelectorAll('#encumbranceTable tr.eLine')
        const params = { encumbrances: { savings_id: eForm.dataset.planId, lines: [] } }
        let alerted = false

        eRows.forEach( row => {
            let encSet = {
                id: row.dataset.eId,
                deletable: row.querySelector('[type=checkbox]').checked,
                encumbrance_name: row.querySelector('.tableText input').value,
                amount: row.querySelector('.tableNum input').value.replace(/[^0-9]/g, "")
            }
            if(encSet.encumbrance_name === "" || encSet.amount === "") {
                this.handleAlert("Encumbrance fields must not be empty", "danger")
                alerted = true
            } else {
                params.encumbrances.lines.push(encSet)
            }
        })

        console.log(params)
        console.log(alerted)

        if(!alerted) {
            try {
                const resp = await this.adapter.editEncumbrances(params)
                this.encumbrances.insertUpdatedEncumbrances(resp.encumbrances, resp.id)

                // Update summary table
                this.insertSavingsSummaryOnEncEdit(resp)
            } catch(err) {
                console.log(err)
            }
        }
        

    }


    get staticHTML() {
        return (`
            <div id="summaryContainer">
                <!-- Begin Top Section - savings plan info -->
                <div id="savingsInfoContainer">
                    <div id="planName">
                        
                    </div>
                </div>
            </div>
            <!-- End Top Section -->






            <!-- Begin Bottom Section - numbers tables -->
            <div id="tablesContainer">

                <!-- Begin Left Column -->
                <div id="leftTablesContainer" class="savingsLeft">

                    <!-- Begin Encumbrance Table -->
                    <div class="leftTable">
                        <form id ="encumbranceForm">
                            <table id="encumbranceTable">
                                <th class="savingsPageTableHeader" colspan="2">Monthly Encumbrances</th>
                                <!-- ROWS WILL GO HERE -->
                                <tr id="encButtonRow">
                                    <td class="tableButton"><button class="addLine">Add Line</button></td>
                                    <td class="tableButton"><button class="editLines">Edit Lines</button></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <!-- End Encumbrance Table -->
                </div>
                <!-- End Left Column -->




                <!-- Begin Savings/Summary Column -->
                <div id="rightTablesContainer" class="savingsRight">

                    <!-- Begin Add to Savings Table -->
                        <div class="rightTable">
                            <form id="addSavingsForm">
                                <table id="addSavingsTable">
                                    <th class="savingsPageTableHeader">Add to Savings</th>
                                    <tr>
                                        <td class="fullRowEntry"><input type="text" id="savingsEntry" data-form="addSavings" placeholder="Numbers only, no $ or commas."></input></td>
                                    </tr>
                                    <tr>
                                        <td class="tableButton"><button type="submit" id="savingsSubmit" class="addSavingsButton">Add</button></td>
                                    </tr>
                                </table>
                            </form>
                        </div>  
                    <!-- End Add to Savings Table -->
                    

                    <!-- Begin Edit Values Table -->
                    <div class="rightTable">
                        <form id="savingsSummary">
                            <table id="savingsSummaryTable">
                                <th class="savingsPageTableHeader" colspan="2">Savings Summary</th>
                                <tr>
                                    <td class="tableText">Income per Month</td>
                                    <td class="tableNum" data-editable="true" data-summary-category="income"></td>
                                </tr>
                                <tr>
                                    <td class="tableText">Encumbrances Per Month</td>
                                    <td class="tableNum" data-editable="false" data-summary-category="encTotal"></td>
                                </tr>
                                <tr>
                                    <td class="tableText">Total Remaining After Encumbrances</td>
                                    <td class="tableNum" data-editable="false" data-summary-category="remainingIncome"></td>
                                </tr>
                                <tr>
                                    <td class="tableText">Current Personal Savings</td>
                                    <td class="tableNum" data-editable="false" data-summary-category="currentSavings"></td>
                                </tr>
                                <tr>
                                    <td class="tableText">Recommended Monthly Savings Goal</td>
                                    <td class="tableNum" data-editable="false" data-summary-category="recommendedGoal"></td>
                                </tr>   
                                <tr>
                                    <td class="tableText">Monthly Savings Goal</td>
                                    <td class="tableNum" data-editable="true" data-summary-category="declaredGoal"></td>
                                </tr>
                                <tr>
                                    <td class="tableText">Projected Future Savings on Plan</td>
                                    <td class="tableNum" data-editable="false" data-summary-category="projectedOnPlan"></td>
                                </tr>
                                <td class="tableButton"colspan="2"><button class="editValues">Edit Values</button></td>
                            </table>
                        </form>
                    </div> 
                    <!-- End Savings Table -->
                </div>
                <!-- End Savings/Summary Column -->
            </div>
            <!-- End Bottom Section -->
        `)
    }
}