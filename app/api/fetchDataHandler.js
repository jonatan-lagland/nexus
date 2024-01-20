'use server'
import { serverErrorHandler } from "./errorHandlers";

export default async function fetchDataHandler(url, includeApiKey = false, timeoutDuration = 0) {
    // By default, data fetching has no set timeout. TimeoutDuration above 0 indicates a time limit should be set.
    // By default, no API key is included in header. API key isn't needed when fetching data from DDragon API.
    // A timeout can be manually set in each API route, often when fetching crucial data like match history data.
    if (timeoutDuration > 0) {
        const response = await fetchWithTimeout();
        return response;
    } else {
        const response = await standardFetch();
        return response;
    }

    async function standardFetch() {
        const headers = {};
        if (includeApiKey) {
            headers[process.env.API_KEY] = process.env.API_KEY_VALUE;
        }
        const response = await fetch(url, { headers });

        if (!response.ok) {
            serverErrorHandler(response);
        }
        return response.json();
    }

    async function fetchWithTimeout() {
        const headers = {};
        if (includeApiKey) {
            headers[process.env.API_KEY] = process.env.API_KEY_VALUE;
        }
        const timeout = new Promise((_, reject) => {
            setTimeout(() => {
                const error = new Error('We were unable to resolve a response from Riot Games API. Please try again later.');
                error.status = 408;
                error.reason = "Request Timeout"
                reject(error)
            }, timeoutDuration);
        });

        const response = await Promise.race([
            fetch(url, { headers }),
            timeout
        ]);

        if (!response.ok) {
            serverErrorHandler(response);
        }
        return response.json();
    }
}