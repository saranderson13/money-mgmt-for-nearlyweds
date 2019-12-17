class App {
    constructor() {  
        this.initBindingsAndEventListeners()
        this.renderPage(new SignupPage(this.pageContainer))
    }

    initBindingsAndEventListeners() {
        this.container = document.querySelector('#app-container');
        this.alertContainer = document.querySelector('#alert-container')
        this.navbarContainer = document.querySelector('#navbar-container');
        this.pageContainer = document.querySelector('#page-container');
    }

    renderPage(page) {
        page.render();
    }
}