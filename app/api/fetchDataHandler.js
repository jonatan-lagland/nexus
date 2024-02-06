'use server'
import { serverErrorHandler } from "./errorHandlers";

export default async function fetchDataHandler(url, tag, includeApiKey = false) {
    // By default, no API key is included in header. API key isn't needed when fetching data from DDragon API.
    const headers = {};
    if (includeApiKey) {
        headers[process.env.API_KEY] = process.env.API_KEY_VALUE;
    }
    const response = await fetch(url, {
        headers,
        next: { tags: [tag] }
    });
    if (!response.ok) {
        await serverErrorHandler(response);
    }
    return response.json();
}