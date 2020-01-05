class AuthorizationError extends Error {

    constructor(msg) {
        super(msg)
        this.name = "Authorization Error"
    }

}

class ValidationError extends Error {

    constructor(msg) {
        super(msg)
        this.name = "Validation Error"
    }

}