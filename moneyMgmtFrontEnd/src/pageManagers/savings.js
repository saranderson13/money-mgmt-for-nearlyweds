class SavingsPage extends PageManager {

    constructor(container, adapter) {
        super(container)
        this.container.parent = this
        this.adapter = new SavingsAdapter(adapter);
        this.encumbrances = new EncumbranceData(this.adapter)
    }

    initBindingsAndEventListeners() {
        this.encumbrances.setAddSavingsButtonListener();
        this.encumbrances.setAddEncumbranceLineButtonListener();
        this.encumbrances.setEditEncumbrancesButtonListener();
        this.encumbrances.setEditValuesButtonListener();

        // Listeners for dynamic buttons.
        this.container.addEventListener('click',function(e, ){
            e.preventDefault()
            if(e.target && e.target.id === "encumbrancesSubmit") {
                this.parent.encumbrances.handleEncumbranceEditSubmit(e)
            } else if(e.target && e.target.id === "editSummarySubmit") {
                this.parent.encumbrances.handleValueEditSubmit(e)
            }
         });
    }

    async fetchAndRenderPageResources() {
        try {
            // fetch data
            const savingsPlan = await this.adapter.getAsset("savings")
            const encumbrances = await this.adapter.getAsset("encumbrances")
            // call insert functions

        } catch {
            this.handleAuthorizationError(err)
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
                    
                    <!-- Begin Edit Values Table -->
                    <div class="rightTable">
                        <form id="savingsSummary">
                            <table id="savingsSummaryTable">
                                <th class="savingsPageTableHeader" colspan="2">Savings Summary</th>
                                <tr>
                                    <td class="tableText">Income per Month</td>
                                    <td class="tableNum" data-editable="true">$1,000</td>
                                </tr>
                                <tr>
                                    <td class="tableText">Expenses Per Month</td>
                                    <td class="tableNum" data-editable="false">$1,000</td>
                                </tr>
                                <tr>
                                    <td class="tableText">Current Savings</td>
                                    <td class="tableNum" data-editable="false">$1,000</td>
                                </tr>
                                <tr>
                                    <td class="tableText">Total Savings Goal</td>
                                    <td class="tableNum" data-editable="false">$1,000</td>
                                </tr>
                                <tr>
                                    <td class="tableText">Remaining Savings Needed</td>
                                    <td class="tableNum" data-editable="false">$1,000</td>
                                </tr>
                                <tr>
                                    <td class="tableText">Recommended Monthly Savings Goal</td>
                                    <td class="tableNum" data-editable="false">$1,000</td>
                                </tr>   
                                <tr>
                                    <td class="tableText">Monthly Savings Goal</td>
                                    <td class="tableNum" data-editable="true">$1,000</td>
                                </tr>
                                <tr>
                                    <td class="tableText">Projected Future Savings on Plan</td>
                                    <td class="tableNum"  data-editable="false">$1,000</td>
                                </tr>
                                <tr>
                                    <td class="tableText">Bottom Line</td>
                                    <td class="tableNum" data-editable="false">$1,000</td>
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