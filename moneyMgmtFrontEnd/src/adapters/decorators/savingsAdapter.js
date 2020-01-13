class SavingsAdapter {

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


    async updateSavings(params) {
        const resp = await fetch(`${this.baseURL}/savings`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(params)
        })
        const json = await this.baseAdapter.checkStatus(resp)
        return await json
    }

}