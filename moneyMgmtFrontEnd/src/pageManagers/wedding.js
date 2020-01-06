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
            this.container.innerHTML = wedding.date
        } catch (err) {
            this.handleAuthorizationError(err)
        }
    }

    async fetchAssociatedResources() {
        try {

        } catch {
            // throw new AuthenticationError()
            // THROW ERROR?
        }
    }

    get staticHTML() {
        return (`
            <h1>Wedding Page</h1>
        `)
    }

}