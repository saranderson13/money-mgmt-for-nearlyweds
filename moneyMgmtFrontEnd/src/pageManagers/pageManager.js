class PageManager {

    constructor(container) {
        this.container = container
    }

    async fetchAndRenderPageResources() {
        return null
    }

    // Individual page managers will need to have versions of #staticHTML(), 
    // #initBindingsAndEventListners(), and optionally #fetchAndRenderPageResources()
    render() {
        this.container.innerHTML = this.staticHTML
        this.initBindingsAndEventListeners()
        this.fetchAndRenderPageResources()
    }

    handleAuthorizationError(err) {
        console.log("If you were expecting to hit the 401 in handleError, you did.")
        this.redirect('welcome')
    }

}