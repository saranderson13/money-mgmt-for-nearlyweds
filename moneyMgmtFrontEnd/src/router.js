class Router {
    // The router is created in app.js. There will only be one instance of a Router object.
    // Router makes it easy to get page managers by a string identifier
    // When the router is created in app.js, all page routes are passed as key-value pairs
    // ex: { 'welcome': new WelcomePage(this.pageContainer, this.adapter) }
    // Above example will create a new WelcomePage when either of these two functions are called:
    // #this.renderPage('welcome')
    // #this.pageManagerRedirect('welcome')
    // (this being the App object)


    // kvpairs will be a hash (object in js terminology)
    constructor(kvpairs) {
        this.routes = kvpairs
    }

    set rootPage(rootPageKey) {
        this.rootPage = this.routes[rootPageKey]
    }
    
    // The page argument will be a string representing the name of the route
    // ex: 'welcome'
    // This function is called inside #renderPage(), which is defined in app.js
    render(page) {
        this.routes[page].render() 
    }

    assignCallback(callback) {
        for(let route in this.routes) {
            this.routes[route].redirect = callback
        }
    }
}