'use server'
import revalidateCache from "./cache";
import fetchDataHandler from "./fetchDataHandler";

export async function getLatestVersion() {
    const URL = process.env.RIOT_DDRAGON_LATEST_URL;
    const tag = "latest_version";

    try {
        const response = await fetchDataHandler(URL, tag)
        console.log(response[0])
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

export async function getQueueTypes() {
    const URL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/queues.json';
    const tag = "queue_types";

    try {
        const response = await fetchDataHandler(URL, tag)
        return response;
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