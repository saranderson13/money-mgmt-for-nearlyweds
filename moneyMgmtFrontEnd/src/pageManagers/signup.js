class SignupPage {


    constructor(container) {
        this.container = container;
    }

    setRadioListeners() {
        this.partnerPendingRadio = document.getElementById('partnerPendingRadio');
        this.partnerExistsRadio = document.getElementById('partnerExistsRadio');

        this.partnerPendingRadio.addEventListener('click', this.renderPartnerForm);
        this.partnerExistsRadio.addEventListener('click', this.renderWeddingForm);
    }

    render() {
        this.container.innerHTML = this.staticHTML()
        this.setRadioListeners()
    }

    renderWeddingForm() {
        SignupPage.prototype.removeDependentForm.call(this);
        const signupForm = document.getElementById('signup-form');
        const weddingForm = SignupPage.prototype.partnerExistsHTML.call(this);
        signupForm.appendChild(weddingForm);
    }

    renderPartnerForm() {
        SignupPage.prototype.removeDependentForm.call(this);
        const signupForm = document.getElementById('signup-form');
        const partnerForm = SignupPage.prototype.partnerPendingHTML.call(this);
        signupForm.appendChild(partnerForm);
    }

    removeDependentForm() {
        const signupForm = document.getElementById('signup-form');
        const dependent = document.getElementsByClassName('dependent-form');

        if (dependent.length > 0) {
            signupForm.removeChild(dependent[0])
        }
    }

    staticHTML() {
        return (`
            <h2>Signup</h2>
            <form id="signup-form">
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
                    <input class="form-check-input" type="radio" name="partnerRadios" id="partnerPendingRadio" value="pending">
                    <label class="form-check-label" for="partnerPending">
                        My partner has not signed up yet.
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="partnerRadios" id="partnerExistsRadio" value="exists">
                    <label class="form-check-label" for="partnerExists">
                        My partner has already signed up.
                    </label>
                </div>
            </form>
        `)
    }

    partnerPendingHTML() {
        let newWeddingForm = document.createElement('div');
        newWeddingForm.className = "dependent-form";
        newWeddingForm.innerHTML = `
            <div class="form-row">
                <div class="col">
                    <input type="date" id="plannedDate" class="form-control">
                </div>
                <div class="col">
                    <input type="text" id="guestCount" class="form-control" placeholder="Estimated Guest Count">
                </div>
            </div>
            <div class="form-row">
                <div class="col">
                    <input type="url" id="website" class="form-control" placeholder="Website Link">
                </div>
                <div class="col">
                    <input type="url" id="registry" class="form-control" placeholder="Registry Link">
                </div>
            </div>
        `;
        return newWeddingForm;
    }

    partnerExistsHTML() {
        let existingPartnerForm = document.createElement('div')
        existingPartnerForm.className = "dependent-form";
        existingPartnerForm.innerHTML = `
        <div class="form-row">
            <div class="col">
                <input type="email" id="partnerEmail" class="form-control" placeholder="Enter your partner's email address.">
            </div>
        </div>
        `;
        return existingPartnerForm;
    }


}