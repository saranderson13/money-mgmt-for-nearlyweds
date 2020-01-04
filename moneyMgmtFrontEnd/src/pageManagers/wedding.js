class WeddingPage extends PageManager {

    constructor(container, adapter) {
        super(container)
        this.adapter = new WeddingAdapter(adapter);
    }

    initBindingsAndEventListeners() {
        return null
    }

    get staticHTML() {
        return (`
            <h1>Wedding Page</h1>
        `)
    }

}