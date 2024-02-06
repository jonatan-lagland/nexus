'use server'

export async function serverErrorHandler(response) {
    switch (response.status) {
        case 408:
            await throwTimeOutError();
            break;
        case 429:
            await throwRateLimitError();
            break;
        default:
            await throwServerError()
            break;
    }

    async function throwServerError() {
        const error = new Error('An error has occurred. Please try again later.');
        error.status = response.status;
        error.reason = "Server Error"
        throw error;
    }

    async function throwTimeOutError() {
        const error = new Error('We were unable to resolve a response from Riot Games API. Please try again later.');
        error.status = 408;
        error.reason = "Request Timeout"
        throw error;
    }

    async function throwRateLimitError() {
        const retryAfter = response.headers.get('Retry-After');
        const error = new Error('Rate limit was reached.');
        error.status = 429;
        error.reason = "Rate Limit"
        error.retryAfter = retryAfter;
        throw error;
    }
}

/* In the event of a 429 Rate Limit error from Riot API, create a Promise that resolves after the time in Retry-After header is over */
export async function rateLimitHandler(retryAfter) {
    const delayInMilliseconds = parseInt(retryAfter) * 1000;
    const delayPromise = new Promise(resolve => {
        setTimeout(() => {
            resolve(delayInMilliseconds);
        }, delayInMilliseconds);
    });
    await delayPromise;
}