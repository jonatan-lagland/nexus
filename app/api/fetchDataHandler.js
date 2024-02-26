'use server'
import { serverErrorHandler } from "./errorHandlers";
import { rateLimitHandler } from "./errorHandlers";

export default async function fetchDataHandler(url, tag, includeApiKey = false, cacheDuration = 1209600) {
    // By default, no API key is included in header. API key isn't needed when fetching data from DDragon API.
    // 2 week cache duration by default
    const headers = {};
    if (includeApiKey) {
        headers[process.env.API_KEY] = process.env.API_KEY_VALUE;
    }

    // In case of a rate limit error, attempt fetch for a total of 3 times after delay
    const maxRetries = 3;
    // If no tag is included for on-demand revalidation purposes, include a revalidate duration instead

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        const response = await fetch(url, {
            headers,
            next: { tags: [tag], revalidate: cacheDuration }
        });

        if (response.status === 429 && attempt < maxRetries - 1) {
            const retryAfter = response.headers.get('Retry-After');
            await rateLimitHandler(retryAfter)
            continue; // Jump back to start of the loop and retry the fetch
        }
        if (!response.ok) {
            await serverErrorHandler(response);
        }
        return response.json();
    }
}