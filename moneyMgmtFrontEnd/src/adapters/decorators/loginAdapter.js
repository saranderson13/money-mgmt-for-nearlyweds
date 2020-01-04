class LoginAdapter {

    constructor(baseAdapter){
        this.baseAdapter = baseAdapter
        this.baseURL = this.baseAdapter.baseURL
    }

    get token() {
        return this.baseAdapter.token;
    }

    get headers() {
        return this.baseAdapter.headers;
    }

    async login(params) {
        const resp = await fetch(`${this.baseURL}/login`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(params)
        })
        this.baseAdapter.checkStatus(resp);
        this.baseAdapter.token = resp.headers.get('authorization').split(" ")[1]
        console.log(this.baseAdapter.token)
    }


}