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
        // It uses the page's own #render(), which is inherited from pageManager.js
        this.routes[page].render()

        // Because 'navbar' is not a route, it needs to be specifically rendered.
        if(this.navbar) { this.navbar.render() }

        // Every time a page is rendered the currentPage instance variable is updated.
        // the currentPage becomes the string that is passed in as an argument.
        // Without this, clicking the link for the page that is already rendered
        // will create some weird endless loop.
        this.currentPage = page
    }

    assignRedirect(callback) {
        this.assignCallback(callback, 'redirect')
    }

    assignAlertHandler(callback) {
        this.assignCallback(callback, 'handleAlert')
    }

    // In app.js, assigns the #pageManagerRedirect function to each route as #redirect
    // so anywhere that this.redirect('pageName') is called, #pageManagerRedirect
    // is triggered, and renders the appropriate page.
    assignCallback(callback, name) {
        for(let route in this.routes) {
            this.routes[route][name] = callback
        }
        // Because 'navbar' is not technically a route, this specifically assigns 
        // the callbacks for the navbar
        if(this.navbar && name === "redirect") { 
            this.navbar.redirect = callback 
        } else if (this.navbar && name === "handleAlert") {
            this.navbar.handleAlert = callback
        }
    }

    assignNavbar(navbar) {
        this.navbar = navbar
        // When the navbar is created, the currentPage is assigned via a callback,
        // the navbar.currentPage gets the value from the router instance's currentPage,
        // which is redefined whenever a new page is loaded.
        // so the navbar and the router both know the current page.
        // in the navbar pageManager, when a new click is handled, (in #handlClick)
        // the page is only redirected if navbar.currentPage does not equal the target.
        this.navbar.currentPage = () => {
            return this.currentPage
        }
    }


}