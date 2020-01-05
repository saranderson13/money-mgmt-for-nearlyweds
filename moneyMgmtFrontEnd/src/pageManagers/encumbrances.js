class EncumbrancesPage extends PageManager {

    constructor(container, adapter) {
        super(container)
        this.adapter = new EncumbrancesAdapter(adapter);
    }

    initBindingsAndEventListeners() {
        return null
    }

    get staticHTML() {
        return (`
            <h1>Encumbrances Page</h1>
        `)
    }
}