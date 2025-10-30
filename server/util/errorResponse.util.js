class ErrorResponse extends Error {
    constructor(statusCode,message){
        super(message);
        this.statuscode = statusCode;
    }
}

export {
    ErrorResponse
}