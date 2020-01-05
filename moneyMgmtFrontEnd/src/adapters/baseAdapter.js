class BaseAdapter {

    constructor(baseURL = 'http://localhost:3000') {
        this.baseURL = baseURL;
        this.token = null;
    }

    get headers() {
        const baseHeaders = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }

        if (this.token) {
            console.log(baseheaders)
            baseheaders = { ...baseHeaders, "Authorization": `Bearer ${this.token}` }
        }
        return baseHeaders
    }

    async checkStatus(resp) {
        if(resp.status < 200 || resp.status > 299) {
            const msg = await resp.json()
            let errorMsg = msg.error
            if (!errorMsg) { errorMsg = msg.errors.detail || msg.errors[0].detail }
            throw new Error(errorMsg);
        }
    }

}



