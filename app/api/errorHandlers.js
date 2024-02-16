'use server'

export async function serverErrorHandler(response) {
    switch (response.status) {
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