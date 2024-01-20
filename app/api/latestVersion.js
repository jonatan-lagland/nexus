'use server'
import revalidateCache from "./cache";
import fetchDataHandler from "./fetchDataHandler";

export async function getLatestVersion() {
    const URL = process.env.RIOT_DDRAGON_LATEST_URL;
    const tag = "latest_version";
    const duration = 24 * 60 * 60; // re-validate patch every 24 hours

    try {
        const response = await fetchDataHandler(URL, { next: { revalidate: duration, tags: [tag] } })
        return response[0];
    } catch (error) {
        // Clear cache if an error occurs
        revalidateCache(tag)
        return {
            status: error.status,
            reason: error.reason,
            error: error.message
        }
    }
}