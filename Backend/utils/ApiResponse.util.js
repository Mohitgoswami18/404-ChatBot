class ApiResponse {
    constructor(statusCode, data, message = "Fetched Successfully" ) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}

export { ApiResponse };