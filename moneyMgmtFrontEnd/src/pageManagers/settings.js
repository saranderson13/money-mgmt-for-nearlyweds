class SettingsPage extends PageManager {

    constructor(container, adapter) {
        super(container)
        this.adapter = new SettingsAdapter(adapter);
    }

    initBindingsAndEventListeners() {
        return null
    }

    get staticHTML() {
        return (`
            <h1>Settings Page</h1>
        `)
    }

}