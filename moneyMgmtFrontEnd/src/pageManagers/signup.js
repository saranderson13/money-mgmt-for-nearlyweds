class SignupPage extends PageManager{

    // #render IS NOT NECESSARY BECAUSE CLASS EXTENDS FROM PageManager
    // Radio listeners are set in #initBindingsAndEventListners()

    constructor(container, adapter) {
        super(container)
        this.adapter = new SignupAdapter(adapter)
    }
    
    initBindingsAndEventListeners() {
        this.form = this.container.querySelector('#signup-form')
        this.setRadioListeners()
        this.form.addEventListener('submit', this.handleSubmit.bind(this))
    }

    async handleSubmit(e) {
        e.preventDefault()
        const weddingFormRadio = document.getElementById('partnerPendingRadio')
        const partnerFormRadio = document.getElementById('partnerExistsRadio')

        const inputs = Array.from(e.target.querySelectorAll('input'))
        const [first_name, last_name, email, password] = inputs.slice(0, 4).map(input => input.value)
        const role = e.target.querySelector('select').value

        const params = {
            user: {
                first_name, last_name, email, password, role
            }
        }
        
        if(weddingFormRadio.checked) {
            params.wedding = {}
            params.wedding.date = inputs[6].value
            params.wedding.guest_count = inputs[7].value
        } else if(partnerFormRadio.checked) {
            params.partner= {}
            params.partner.email = inputs[6].value
        }
        try{
            await this.adapter.signup(params)
            this.redirect('wedding');
        } catch(err) {
            this.handleAlert(err, 'danger')
        }
        
    }

    setRadioListeners() {
        // This gets the elements that need listeners.
        // Because this method is called after the page content is loaded, it is able to grab them.
        // If you tried to grab them before the content was there it would return null.
        this.partnerPendingRadio = document.getElementById('partnerPendingRadio');
        this.partnerExistsRadio = document.getElementById('partnerExistsRadio');

        // This sets the listeners.
        this.partnerPendingRadio.addEventListener('click', this.renderPartnerForm);
        this.partnerExistsRadio.addEventListener('click', this.renderWeddingForm);
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

    get staticHTML() {
        return (`
            <h2>Signup</h2>
            <form id="signup-form">
                <div class="form-row">
                    <div class="col">
                        <input type="text" id="first_name" class="form-control" placeholder="First name" required >
                    </div>
                    <div class="col">
                        <input type="text" id="last_name" class="form-control" placeholder="Last name" required >
                    </div>
                </div>
                <div class="form-row">
                    <div class="col">
                        <input type="email" id="userEmail" class="form-control" placeholder="Email Address" required >
                    </div>
                    <div class="col">
                        <input type="password" id="userPassword" class="form-control" placeholder="Password" required >
                    </div>
                </div>
                <select id="role" class="form-control" required>
                    <option value="">I'm the...</option>
                    <option>Bride</option>
                    <option>Groom</option>
                    <option>Nearlywed</option>
                </select>
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
                    <input type="date" id="date" class="form-control" required >
                </div>
                <div class="col">
                    <input type="text" id="guest_count" class="form-control" placeholder="Estimated Guest Count" required >
                </div>
            </div>
            <button type="submit" id="signup-button" class="btn btn-primary">Sign Up</button>
        `;
        return newWeddingForm;
    }

    partnerExistsHTML() {
        let existingPartnerForm = document.createElement('div')
        existingPartnerForm.className = "dependent-form";
        existingPartnerForm.innerHTML = `
        <div class="form-row">
            <div class="col">
                <input type="email" id="partner_email" class="form-control" placeholder="Enter your partner's email address." required>
            </div>
        </div>
        <button type="submit" id="signup-button" class="btn btn-primary">Sign Up</button>
        `;
        return existingPartnerForm;
    }


}