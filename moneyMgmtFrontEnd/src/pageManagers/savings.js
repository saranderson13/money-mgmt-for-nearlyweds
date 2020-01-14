class SavingsPage extends PageManager {

    constructor(container, adapter, parent) {
        super(container)
        this.adapter = new SavingsAdapter(adapter);
        this.encumbrances = new EncumbranceData(this.adapter)
        this.parent = parent
    }

    initBindingsAndEventListeners() {
        this.encumbrances.setAddEncumbranceLineButtonListener();
        // this.encumbrances.setEditEncumbrancesButtonListener();
        this.setAddSavingsButtonListener();
        this.setEditValuesButtonListener();

        // Listeners for dynamic buttons.
        const savingsPage = this.parent.router.routes.savings
        this.container.addEventListener('click',function(e){
            e.preventDefault()
            if(e.target && e.target.id === "encumbrancesSubmit") {
                savingsPage.encumbrances.handleEncumbranceEditSubmit(e)
            } else if(e.target && e.target.id === "editSummarySubmit") {
                savingsPage.handleValueEditSubmit(e)
            } else if(e.target && e.target.id === "saveLine") {
                savingsPage.encumbrances.handleAddLineSubmit(e)
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
        } catch {
            this.handleAuthorizationError(err)
        }
    }

    insertSavingsIdToForms(savings) {
        const addForm = document.querySelector('form#addSavingsForm')
        addForm.dataset.savingsId = savings.id

        const summaryForm = document.querySelector('form#savingsSummary')
        summaryForm.dataset.savingsId = savings.id
    }

    insertSavingsSummary(plan, weddingDate) {
        const fieldValues = this.summaryCalculations(plan, weddingDate)
        fieldValues.income = plan.income_per_month;
        fieldValues.currentSavings = plan.current_savings;
        fieldValues.declaredGoal = plan.monthly_savings_goal;
        const summaryFields = document.querySelectorAll('[data-summary-category]')
        summaryFields.forEach( function(field) {
            let fieldCategory = field.dataset.summaryCategory;
            let formattedValue = this.formatCostForDisplay(fieldValues[fieldCategory])
            field.innerHTML = `$${formattedValue}`
        }.bind(this))
    }

    summaryCalculations(plan, weddingDate) {
        let encTotal = 0
        if( plan.encumbrances.length > 0 ){
            encTotal = plan.encumbrances.map(e => e.amount).reduce((a,c) => a + c)
        }
        const remainingIncome = plan.income_per_month - encTotal
        const recommendedGoal = remainingIncome / 2
        const projectedOnPlan = plan.monthly_savings_goal * this.remainingMonths(weddingDate)
        return {encTotal, remainingIncome, recommendedGoal, projectedOnPlan}
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

        console.log(editButton)
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

        const [income, monthly_savings_goal] = Array.from(summaryForm.querySelectorAll('input[type="text"]')).map(i => i.value)
        const id = summaryForm.dataset.savingsId
        const params = {
            savings: {
                id, income, monthly_savings_goal
            }
        }

        try {
            const resp = await this.adapter.updateSavings(params)
            const wedding = await this.adapter.getAsset("wedding")
            console.log(resp)
            this.insertSavingsSummary(resp, wedding.date)

            // Remove Submit
            const submitButton = document.getElementById('editSummarySubmit')
            const buttonRow = submitButton.parentNode
            buttonRow.removeChild(submitButton)

            // Add Edit Button
            const editButton = document.createElement('button')
            editButton.className = "editValues"
            editButton.innerText = "Edit Values"
            buttonRow.appendChild(editButton)
            this.setEditValuesButtonListener()
        } catch {
            console.log(err)
        }
    }


    get staticHTML() {
        return (`
            <div id="summaryContainer">
                <!-- Begin Top Section - savings plan info -->
                <div id="savingsInfoContainer">
                    <div id="planName">
                        Savings Plan for Sarah
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