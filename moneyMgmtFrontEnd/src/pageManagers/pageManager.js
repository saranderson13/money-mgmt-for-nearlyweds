class PageManager {

    constructor(container) {
        this.container = container
    }

    fetchAndRenderPageResources() {
        return null
    }

    // Individual page managers will need to have versions of #staticHTML(), 
    // #initBindingsAndEventListners(), and optionally #fetchAndRenderPageResources()
    render() {
        this.container.innerHTML = this.staticHTML
        this.initBindingsAndEventListeners()
        this.fetchAndRenderPageResources()
    }

}