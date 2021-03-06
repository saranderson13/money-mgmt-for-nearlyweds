class SignupAdapter {

    constructor(baseAdapter){
        this.baseAdapter = baseAdapter;
        this.baseURL = this.baseAdapter.baseURL;
    }

    get token() {
        return this.baseAdapter.token;
    }

    get headers() {
        return this.baseAdapter.headers;
    }

    async signup(params) {
        const resp = await fetch(`${this.baseURL}/signup`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(params)
        })
        await this.baseAdapter.checkStatus(resp);
        this.baseAdapter.token = resp.headers.get('authorization').split(" ")[1]
    }

}