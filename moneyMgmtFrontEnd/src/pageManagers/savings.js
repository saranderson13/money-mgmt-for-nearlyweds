class SavingsPage extends PageManager {

    constructor(container, adapter) {
        super(container)
        this.adapter = new SavingsAdapter(adapter);
    }

    initBindingsAndEventListeners() {
        return null
    }

    get staticHTML() {
        return (`
            <h1>Savings Page</h1>
        `)
    }
}