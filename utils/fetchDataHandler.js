export default async function fetchDataHandler(url, timeoutDuration = 0) {
    // By default, data fetching has no set timeout
    // A timeout can be manually set in each API route, often when fetching crucial data like champion page data
    // in order to redirect user to an error page rather than have the user wait forever for the Riot API to respond
    if (timeoutDuration > 0) {
        const response = await fetchWithTimeout(url, timeoutDuration);
        return response;
    } else {
        const response = await standardFetch(url);
        return response;
    }
}

async function standardFetch(url) {
    const response = await fetch(url);
    if (!response.ok) {
        const error = new Error('An error has occurred. Please try again later.');
        error.status = response.status;
        error.reason = "Server Error"
        throw error;
    }
    return response.json();
}

async function fetchWithTimeout(url, timeoutDuration) {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => {
            const error = new Error('We were unable to resolve a response from Riot Games API. Please try again later.');
            error.status = 408;
            error.reason = "Request Timeout"
            reject(error);
        }, timeoutDuration);
    });

    const response = await Promise.race([
        fetch(url),
        timeout
    ]);

    if (!response.ok) {
        const error = new Error('An error has occurred. Please try again later.');
        error.status = response.status;
        error.reason = "Server Error"
        throw error;
    }
    return response.json();
}