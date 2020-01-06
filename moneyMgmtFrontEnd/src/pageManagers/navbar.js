class Navbar extends PageManager{
    
    constructor(container, adapter) {
        super(container)
        this.adapter = adapter
    }

    get is_authenticated() {
        return !!this.adapter.token
    }

    initBindingsAndEventListeners() {
        this.container.addEventListener('click', this.handleClick.bind(this))
    }

    async handleClick(e){
        if(e.target.tagName === "A") {
            e.preventDefault()
            if (e.target.id != 'logout-link') {
                const route = e.target.id.split('-')[0]
                if (route !== this.currentPage() ) { this.redirect(route) }
            } else {
                this.handleLogout()
            }
        }
    }

    
    handleLogout() {
        this.adapter.token = null
        this.handleAlert("Logout Successful", "success")
        this.redirect('welcome')
    }

    get staticHTML() {

        if(this.is_authenticated) {
            return (`
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" id="wedding-link" href="#">Wedding<span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="profile-link" href="#">Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="budget-link" href="#">Budget</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="encumbrances-link" href="#">Encumbrances</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="savings-link" href="#">My Savings Plan</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="logout-link" href="#">Log Out</a>
                        </li>
                    </ul>
                </nav>
            `)
        } else {
            return (`
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" id="welcome-link" href="#">Welcome<span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="signup-link" href="#">Sign Up</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="login-link" href="#">Log In</a>
                        </li>
                    </ul>
                </nav>
            `)
        }
    }

}