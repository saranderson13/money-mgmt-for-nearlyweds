class SignupPage {

    constructor(container) {
        this.container = container
    }

    staticHTML() {
        return (`
            <h2>Signup</h2>
            <form>
                <div class="form-row">
                    <div class="col">
                        <input type="text" id="firstName" class="form-control" placeholder="First name">
                    </div>
                    <div class="col">
                        <input type="text" id="lastName" class="form-control" placeholder="Last name">
                    </div>
                </div>
                <div class="form-row">
                    <div class="col">
                        <input type="email" id="userEmail" class="form-control" placeholder="Email Address">
                    </div>
                    <div class="col">
                        <input type="password" id="userPassword" class="form-control" placeholder="Password">
                    </div>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="partnerRadios" id="partnerPending" value="pending">
                    <label class="form-check-label" for="partnerPending">
                        My partner has not signed up yet.
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="partnerRadios" id="partnerExists" value="exists">
                    <label class="form-check-label" for="partnerExists">
                        My partner has already signed up.
                    </label>
                </div>
            </form>
        `)
    }

    render() {
        this.container.innerHTML = this.staticHTML()
    }


}