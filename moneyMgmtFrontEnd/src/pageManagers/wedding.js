class WeddingPage extends PageManager {

    constructor(container, adapter) {
        super(container)
        this.adapter = new WeddingAdapter(adapter);
    }

    initBindingsAndEventListeners() {
        return null
    }

    async fetchAndRenderPageResources() {
        try {
            const wedding = await this.adapter.getWedding()
            this.insertFormattedWeddingName(wedding.users)
            this.insertWeddingDate(wedding)
            this.insertCountdown(wedding)

        } catch (err) {
            this.handleAuthorizationError(err)
        }
    }

    insertFormattedWeddingName(users) {
        const nameContainer = document.getElementById('weddingName');
        const roles = users.map( u => u.role )
        let weddingName;

        if (roles.length === 2) {
            if ( roles[1] === "Bride" ) {
                weddingName = `${users[1].last_name} - ${users[0].last_name} Nuptuals`
            } else {
                weddingName = `${users[0].last_name} - ${users[1].last_name} Nuptuals`
            }
        } else {
            weddingName = `${users[0].last_name} - ??? Nuptuals`
        }

        nameContainer.innerHTML = weddingName;
    }

    insertWeddingDate(wedding) {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const dateContainer = document.getElementById('weddingDate')
        const date = new Date(wedding.date.split(".")[0])
        const formattedDate = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
        dateContainer.innerHTML = `${formattedDate}`
    }

    insertCountdown(wedding) {
        const countdownContainer = document.getElementById('weddingCountdown')
        const now = new Date().getTime();
        const date = new Date(wedding.date.split(".")[0]).getTime()
        const countdownDays = Math.floor((date - now) / (1000 * 60 * 60 * 24))
        const countdownString = `${countdownDays} days until the big day!`
        countdownContainer.innerHTML = countdownString
    }

    accessBudget(wedding) {
        // wedding.budget.map( kv )
        console.log(wedding.budget)
    }

    get staticHTML() {
        return (`
        <div id="summaryContainer">
            <!-- Begin Top Section - wedding info -->
            <div id="weddingInfoContainer">
                <div id="weddingName">
                    
                </div>
                <div id="weddingDate">
                    
                </div>
                <div id="weddingCountdown">
                    
                </div>
            </div>
        </div>
        <!-- End Top Section -->

        <!-- Begin Bottom Section - numbers tables -->
        <div id="tablesContainer">

            <!-- Begin Budget Column -->
            <div id="budgetTableContainer">
                <table id="budgetTable">
                    <th class="weddingPageTable" colspan="3">Projected Expenses</th class="weddingPageTable">
                    <tr>
                        <td class="tableText">Venue</td>
                        <td class="tableNum" data-expense-category="venue"></td>
                        <td class="tableButton"><button class="editExpense" data-expense-category="venue">Edit</button></td>
                    </tr>
                    <tr>
                        <td class="tableText">Catering</td>
                        <td class="tableNum" data-expense-category="catering"></td>
                        <td class="tableButton"><button class="editExpense" data-expense-category="catering">Edit</button></td>
                    </tr>
                    <tr>
                        <td class="tableText">Photography</td>
                        <td class="tableNum" data-expense-category="photography"></td>
                        <td class="tableButton"><button class="editExpense" data-expense-category="photography">Edit</button></td>
                    </tr>
                    <tr>
                        <td class="tableText">Videography</td>
                        <td class="tableNum" data-expense-category="vidography"></td>
                        <td class="tableButton"><button class="editExpense" data-expense-category="vidography">Edit</button></td>
                    </tr>
                    <tr>
                        <td class="tableText">Flowers</td>
                        <td class="tableNum" data-expense-category="flowers"></td>
                        <td class="tableButton"><button class="editExpense" data-expense-category="flowers">Edit</button></td>
                    </tr>
                    <tr>
                        <td class="tableText">Cake</td>
                        <td class="tableNum" data-expense-category="cake"></td>
                        <td class="tableButton"><button class="editExpense" data-expense-category="cake">Edit</button></td>
                    </tr>
                    <tr>
                        <td class="tableText">Gown & Tux</td>
                        <td class="tableNum" data-expense-category="attire"></td>
                        <td class="tableButton"><button class="editExpense" data-expense-category="attire">Edit</button></td>
                    </tr>
                    <tr>
                        <td class="tableText">Band</td>
                        <td class="tableNum" data-expense-category="band"></td>
                        <td class="tableButton"><button class="editExpense" data-expense-category="band">Edit</button></td>
                    </tr>
                    <tr>
                        <td class="tableText">DJ & MC</td>
                        <td class="tableNum" data-expense-category="djmc"></td>
                        <td class="tableButton"><button class="editExpense" data-expense-category="dj-mc">Edit</button></td>
                    </tr>
                    <tr>
                        <td class="tableText">Invitations / Stationary</td>
                        <td class="tableNum" data-expense-category="invitations"></td>
                        <td class="tableButton"><button class="editExpense" data-expense-category="invitations">Edit</button></td>
                    </tr>
                    <tr>
                        <td class="tableText">Favors</td>
                        <td class="tableNum" data-expense-category="favors"></td>
                        <td class="tableButton"><button class="editExpense" data-expense-category="favors">Edit</button></td>
                    </tr>
                    <tr>
                        <td class="tableText">Officiant</td>
                        <td class="tableNum" data-expense-category="officiant"></td>
                        <td class="tableButton"><button class="editExpense" data-expense-category="officiant">Edit</button></td>
                    </tr>
                    <tr>
                        <td class="tableText">Salon & Beauty</td>
                        <td class="tableNum" data-expense-category="beauty"></td>
                        <td class="tableButton"><button class="editExpense" data-expense-category="beauty">Edit</button></td>
                    </tr>
                    <tr>
                        <td class="tableText">Wedding Bands</td>
                        <td class="tableNum" data-expense-category="jewelry"></td>
                        <td class="tableButton"><button class="editExpense" data-expense-category="jewelry">Edit</button></td>
                    </tr>
                    <tr>
                        <td class="tableText">Equipment Rentals</td>
                        <td class="tableNum" data-expense-category="rentals"></td>
                        <td class="tableButton"><button class="editExpense" data-expense-category="rentals">Edit</button></td>
                    </tr>
                    <tr>
                        <td class="tableText">Miscellaneous / Buffer</td>
                        <td class="tableNum" data-expense-category="other"></td>
                        <td class="tableButton"><button class="editExpense" data-expense-category="misc">Edit</button></td>
                    </tr>
                </table>
            </div>
            <!-- End Budget Column -->


            <!-- Begin Savings/Summary Column -->
            <div id="rightTablesContainer">
                
                <!-- Begin Savings Table -->
                <div class="rightTable"><table id="savingsTable">
                    <th class="weddingPageTable" colspan="3">Savings Summary</th>
                    <tr>
                        <th class="weddingPageTable"> </th>
                        <th class="weddingPageTable">User 1</th>
                        <th class="weddingPageTable">User 2</th>
                    </tr>
                    <tr>
                        <td class="tableText">Income per Month</td>
                        <td class="tableNum"data-savings-category="u1Income"></td>
                        <td class="tableNum"data-savings-category="u2Income"></td>
                    </tr>
                    <tr>
                        <td class="tableText">Expenses per Month</td>
                        <td class="tableNum"data-savings-category="u1Expenses"></td>
                        <td class="tableNum"data-savings-category="u2Expenses"></td>
                    </tr>
                    <tr>
                        <td class="tableText">Recommended Monthly Savings Goal</td>
                        <td class="tableNum"data-savings-category="u1Recommendation"></td>
                        <td class="tableNum"data-savings-category="u2Recommendation"></td>
                    </tr>   
                </table></div> 
                <!-- End Savings Table -->


                <!-- Begin Summary Table -->
                <div class="rightTable"><table id="summaryTable">
                    <th class="weddingPageTable" colspan="2">Summary</th>
                    <tr>
                        <td class="tableText">Total Projected Expenses</td>
                        <td class="tableNum" data-summary-category="totalExpenses"></td>
                    </tr>
                    <tr>
                        <td class="tableText">Total Current Savings</td>
                        <td class="tableNum" data-summary-category="currentSavings"></td>
                    </tr>
                    <tr>
                        <td class="tableText">Remaining Needed to Meet Goal</td>
                        <td class="tableNum" data-summary-category="remainingInGoal"></td>
                    </tr>
                    <tr>
                        <td class="tableText">Anticipated Savings on Recommended Plan</td>
                        <td class="tableNum" data-summary-category="anticipatedOnPlan"></td>
                    </tr>
                    <tr>
                        <td class="tableText">Bottom Line</td>
                        <td class="tableNum" data-summary-category="bottomLine"></td>
                    </tr>
                    <tr>
                        <td class="tableText recommendation" colspan="2">
                            You will need to increase the amount you save per paycheck to reach your goal.
                        </td>
                    </tr>
                </table></div>
                <!-- End Summary Table -->

            </div>
            <!-- End Savings/Summary Column -->
        </div>
        <!-- End Bottom Section -->
        `)
    }

}