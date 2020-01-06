class BaseAdapter {

    constructor(baseURL = 'http://localhost:3000') {
        this.baseURL = baseURL;
        this.token = null;
    }

    get headers() {
        let baseHeaders = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }

        if (this.token) {
            baseHeaders = { ...baseHeaders, "Authorization": `Bearer ${this.token}` }
        }
        return baseHeaders
    }

    async checkStatus(resp) {
        const msg = await resp.json()
        if (resp.status === 401) {
            this.token = null
            throw new AuthorizationError(msg.error)
        } else if(resp.status < 200 || resp.status > 299) {
            let errorMsg = msg.error
            if (!errorMsg) { errorMsg = msg.errors.detail }
            throw new Error(errorMsg);
        }
        // If no error is thrown, I want it to return the response.json() to avoid
        // the 'Response body stream is locked' error - which is a result of two
        // 'response.json()' calls within a single block.
        // In this case, it was being called in both the function that called 
        // #checkStatus, and also check status.
        return msg
    }

}



