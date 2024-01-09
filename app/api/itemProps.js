'use server'
import revalidateCache from "./cache";
import fetchDataHandler from "./fetchDataHandler";

// Fetch a JSON list of all items in the game
export async function getItemProps() {
    const baseURL = process.env.RIOT_API_BASE_URL;
    const gameVersion = process.env.GAME_VERSION;
    const url = `${baseURL}${gameVersion}/data/en_US/item.json`;

    try {
        const response = await fetchDataHandler(url, { next: { tags: ['items'] } })
        return response.data;
    } catch (error) {
        // Clear cache if an error occurs
        revalidateCache('items')
        return {
            status: error.status,
            reason: error.reason,
            error: error.message
        }
    }
}