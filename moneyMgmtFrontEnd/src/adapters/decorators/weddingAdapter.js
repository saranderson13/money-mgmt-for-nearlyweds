class WeddingAdapter {

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
            headers: this.headers
        })
        const json = this.baseAdapter.checkStatus(resp)
        return await json
    }

    // async getBudget
    
}