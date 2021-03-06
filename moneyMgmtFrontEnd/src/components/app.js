class App {
    constructor() {
        this.adapter = new BaseAdapter()
        this.initBindingsAndEventListeners()

        this.alertManager = new Alert(this.alertContainer)

        this.router = new Router({
            // All routes are created here.
            'welcome': new WelcomePage(this.pageContainer, this.adapter),
            'login': new LoginPage(this.pageContainer, this.adapter),
            'signup': new SignupPage(this.pageContainer, this.adapter),
            'settings': new SettingsPage(this.pageContainer, this.adapter),
            'wedding': new WeddingPage(this.pageContainer, this.adapter, this),
            'savings': new SavingsPage(this.pageContainer, this.adapter, this)
        })

        this.router.assignNavbar(new Navbar(this.navbarContainer, this.adapter))
        this.router.assignAlertHandler(this.handleAlert.bind(this))
        this.router.assignRedirect(this.pageManagerRedirect.bind(this))
        this.router.render('welcome')
    }

    initBindingsAndEventListeners() {
        this.container = document.querySelector('#app-container');
        this.alertContainer = document.querySelector('#alert-container')
        this.navbarContainer = document.querySelector('#navbar-container');
        this.pageContainer = document.querySelector('#page-container');
    }

    handleAlert(msg, type, timeout = 5000) {
        this.alertManager.render(msg, type, timeout)
    }

    // This on first glance looks redundant - but it enables redirect to be
    // managed by the App object as opposed to the Router.
    pageManagerRedirect(page) {
        this.router.render(page)
        // console.log(page)
    }
}