import path from '@data/path.json';

async function fetchDataHandler(folder, subfolders = "", route, format, timeoutDuration = 0) {
    const url = `${path.address}/${path.cdn}/${path.patch}/${folder}/${path.language}${subfolders ? `/${subfolders}` : ''}/${route}.${format}`;
    try {
        const response = await fetchFromURL(url, timeoutDuration);
        return okResponse(response);
    } catch (e) {
        return errorResponse(e);
    }
}

async function fetchFromURL(url, timeoutDuration) {
    // By default, data fetching has no set timeout
    // A timeout can be manually set in each API route, often when fetching crucial data like champion page data
    // in order to redirect user to an error page rather than have the user wait forever for the Riot API to respond
    if (timeoutDuration > 0) {
        return fetchWithTimeout(url, timeoutDuration);
    } else {
        return standardFetch(url);
    }
}

async function standardFetch(url) {
    const response = await fetch(url);

    if (!response.ok) {
        const error = new Error();
        error.status = response.status;
        throw error;
    }

    return response.json();
}

async function fetchWithTimeout(url, timeoutDuration) {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => {
            const error = new Error();
            error.status = 408;
            reject(error);
        }, timeoutDuration);
    });

    const response = await Promise.race([
        fetch(url),
        timeout
    ]);

    if (!response.ok) {
        const error = new Error();
        error.status = response.status;
        throw error;
    }

    return response.json();
}

async function okResponse(response) {
    return {
        status: 200,
        response
    };
}

async function errorResponse(error) {
    if (error.status === 404) {
        return notFoundError();
    }

    if (error.status === 408) {
        return timeOutError();
    }

    // If error is out of scope return either the values or populate with a default error
    return {
        status: error.status || 500,
        error: error.message || `Network response failed. Try again later.`
    };
}

async function notFoundError() {
    return {
        status: 404,
        error: `We were unable to find what you were looking for.`
    };
}

async function timeOutError() {
    return {
        status: 408,
        error: 'We were unable to resolve a response from Riot Games API. Please try again later.'
    };
}

export default fetchDataHandler;