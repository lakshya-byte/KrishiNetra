class ApiError extends Error {
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
        this.details = message
        Error.captureStackTrace(this, this.constructor)
    }
}

export { ApiError }