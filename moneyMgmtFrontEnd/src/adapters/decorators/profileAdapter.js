class ProfileAdapter {

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

    async getWedding() {
        const resp = await fetch(`${this.baseURL}/wedding`, {
            method: 'GET',
            headers: this.headers
        })
        this.baseAdapter.checkStatus(resp)
        return await resp.json()
    }

}