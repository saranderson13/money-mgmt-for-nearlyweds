class SavingsPage extends PageManager {

    constructor(container, adapter, parent) {
        super(container)
        this.adapter = new SavingsAdapter(adapter);
        this.encumbrances = new EncumbranceData(this.adapter)
        this.parent = parent
    }

    initBindingsAndEventListeners() {
        this.encumbrances.setAddSavingsButtonListener();
        this.encumbrances.setAddEncumbranceLineButtonListener();
        this.encumbrances.setEditEncumbrancesButtonListener();
        this.encumbrances.setEditValuesButtonListener();

        // Listeners for dynamic buttons.
        const savingsPage = this.parent.router.routes.savings
        this.container.addEventListener('click',function(e, ){
            e.preventDefault()
            if(e.target && e.target.id === "encumbrancesSubmit") {
                savingsPage.encumbrances.handleEncumbranceEditSubmit(e)
            } else if(e.target && e.target.id === "editSummarySubmit") {
                savingsPage.encumbrances.handleValueEditSubmit(e)
            }
         });
    }

    async fetchAndRenderPageResources() {
        try {
            // fetch data
            const savingsPlan = await this.adapter.getAsset("savings")
            const wedding = await this.adapter.getAsset("wedding")

            // call insert functions
            // this.encumbrances.insertEncumbrances();
            this.insertSavingsSummary(savingsPlan, wedding.date);
        } catch {
            this.handleAuthorizationError(err)
        }
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
        const encTotal = plan.encumbrances.map(e => e.amount).reduce((a,c) => a + c)
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

    // // !!!!!SHARED WITH EXPENSE DATA - COULD INHERIT?
    // formatCostForDisplay(num) {
    //     // Takes a number (ex: 1000) and returns a string (=> "$1,000")
    //     const numArray = num.toString().split("").reverse()
    //     const commaCount = Math.floor(numArray.length / 3)
    //     for (let i = commaCount; i > 0; i--) {
    //         let placement = i * 3
    //         numArray.splice(placement, 0, ',')
    //     }
    //     if (numArray[numArray.length - 1] === ",") { numArray.pop() }
    //     return numArray.reverse().join("")
    // }

    // // !!!!!SHARED WITH ENCUMBRANCE DATA - COULD SET UP INHERITANCE?
    // formatCostForCalculation(num) {
    //     // Takes a string (ex: "$1,000") and returns a number (=> 1000)
    //     return parseInt(string.replace(/[^0-9]/g, ""), 10)
    // }



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
                                <tr>
                                    <td class="tableText">Example Line</td>
                                    <td class="tableNum" data-expense-category="lineName">
                                        $1,000
                                    </td>
                                </tr>
                                <tr>
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
                        <div class="leftTable">
                            <form id="editValues">
                                <table id="addSavingsTable">
                                    <th class="savingsPageTableHeader">Add to Savings</th>
                                    <tr>
                                        <td class="fullRowEntry"><input type="text" id="savingsEntry" placeholder="Enter only numbers, no '$' or commas."></input></td>
                                    </tr>
                                    <td class="tableButton"><button type="submit" class="addLine">Add</button></td>
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
                                    <td class="tableNum" data-editable="true" data-summary-category="income">$1,000</td>
                                </tr>
                                <tr>
                                    <td class="tableText">Encumbrances Per Month</td>
                                    <td class="tableNum" data-editable="false" data-summary-category="encTotal">$1,000</td>
                                </tr>
                                <tr>
                                    <td class="tableText">Total Remaining After Encumbrances</td>
                                    <td class="tableNum" data-editable="false" data-summary-category="remainingIncome">$1,000</td>
                                </tr>
                                <tr>
                                    <td class="tableText">Current Personal Savings</td>
                                    <td class="tableNum" data-editable="false" data-summary-category="currentSavings">$1,000</td>
                                </tr>
                                <tr>
                                    <td class="tableText">Recommended Monthly Savings Goal</td>
                                    <td class="tableNum" data-editable="false" data-summary-category="recommendedGoal">$1,000</td>
                                </tr>   
                                <tr>
                                    <td class="tableText">Monthly Savings Goal</td>
                                    <td class="tableNum" data-editable="true" data-summary-category="declaredGoal">$1,000</td>
                                </tr>
                                <tr>
                                    <td class="tableText">Projected Future Savings on Plan</td>
                                    <td class="tableNum" data-editable="false" data-summary-category="projectedOnPlan">$1,000</td>
                                </tr>
                                <td class="tableButton"colspan="2"><button class="addLine">Edit Values</button></td>
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