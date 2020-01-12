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

    async getAsset(assetName) {
        const resp = await fetch(`${this.baseURL}/${assetName}`, {
            headers: this.headers
        })
        const json = this.baseAdapter.checkStatus(resp)
        return await json
    }

    async updateExpenses(params) {
        const resp = await fetch(`${this.baseURL}/expenses/${params.expenses.id}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(params)
        })
        const json = await this.baseAdapter.checkStatus(resp)
        return await json
    }
    
}