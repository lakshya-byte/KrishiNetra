class ApiError extends Error {
    constructor(type, message, statusCode, details = {}) {
        super(message)
        this.type = type
        this.statusCode = statusCode
        this.details = details
        Error.captureStackTrace(this, this.constructor)
    }
}

export { ApiError }