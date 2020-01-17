class LoginPage extends PageManager {

    constructor(container, adapter) {
        super(container)
        this.adapter = new LoginAdapter(adapter);
    }

    initBindingsAndEventListeners() {
        this.form = this.container.querySelector('form#login-form');
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e){
        e.preventDefault();
        const [email, password] = Array.from(e.target.querySelectorAll('input')).map(i => i.value)
        const params = {
            user: {email, password}
        }
        try{
            await this.adapter.login(params)
            this.redirect('wedding');
        } catch(err) {
            this.handleAlert(err, 'danger')
        }
    }

    get staticHTML() {
        return(`
        <h2>Login</h2>
        <form id="login-form">
            <div class="form-row">
                <div class="col">
                    <input type="email" id="userEmail" class="form-control" placeholder="Email Address" required >
                </div>
                <div class="col">
                    <input type="password" id="userPassword" class="form-control" placeholder="Password" required >
                </div>
            </div>
            <button type="submit" id="login-button" class="btn btn-primary">Log In</button>
        </form>
        `) 
    }

}