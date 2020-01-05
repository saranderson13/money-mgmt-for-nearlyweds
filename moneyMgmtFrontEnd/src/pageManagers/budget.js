class BudgetPage extends PageManager {

    constructor(container, adapter) {
        super(container)
        this.adapter = new BudgetAdapter(adapter);
    }

    initBindingsAndEventListeners() {
        return null
    }

    get staticHTML() {
        return (`
            <h1>Budget Page</h1>
        `)
    }
}