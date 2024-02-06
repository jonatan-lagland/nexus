'use server'
import revalidateCache from "./cache";
import fetchDataHandler from "./fetchDataHandler";

// Fetch a JSON list of all items in the game
export async function getItemProps(gameVersion) {
    const baseURL = process.env.RIOT_DDRAGON_BASE_URL_CDN;
    const url = `${baseURL}${gameVersion}/data/en_US/item.json`;
    const tag = 'items';

    try {
        const response = await fetchDataHandler(url, tag)
        return response.data;
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