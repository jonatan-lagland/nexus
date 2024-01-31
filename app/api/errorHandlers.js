'use server'

export async function serverErrorHandler(response) {
    switch (response.status) {
        case 408:
            throwTimeOutError();
            break;
        case 429:
            await rateLimitHandler();
            break;
        default:
            throwServerError()
            break;
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

    /* In the event of a 429 Rate Limit error from Riot API, create a Promise that resolves after the time in Retry-After header is over */

    async function rateLimitHandler() {
        console.log("Rate limit handler initiating...")
        const retryAfter = response.headers.get('Retry-After');
        const delayInMilliseconds = parseInt(retryAfter) * 1000;
        const delayPromise = new Promise(resolve => {
            setTimeout(() => {
                resolve(delayInMilliseconds);
            }, delayInMilliseconds);
        });

        await delayPromise;
        const error = new Error('Rate limit was reached.');
        error.status = 429;
        error.reason = "Rate Limit"
        throw error;
    }
}