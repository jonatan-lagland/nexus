export function serverErrorHandler(response) {
    switch (response.status) {
        case 408:
            throwTimeOutError();
        case 429:
            rateLimitHandler();
        default:
            throwServerError()
    }

    function throwServerError() {
        const error = new Error('An error has occurred. Please try again later.');
        error.status = response.status;
        error.reason = "Server Error"
        throw error;
    }

    function throwTimeOutError() {
        const error = new Error('We were unable to resolve a response from Riot Games API. Please try again later.');
        error.status = 408;
        error.reason = "Request Timeout"
        throw error;
    }

    function rateLimitHandler() {
        try {
            const rateLimitType = response.headers.get(process.env.API_RATE_LIMIT_KEY);
            console.log(rateLimitType);
        } catch (error) {
            console.log("Failed to parse rate limit header", error)
        }
        const error = new Error('Rate limit reached');
        error.status = response.status;
        error.reason = "Server Error"
        throw error;
    }
}
