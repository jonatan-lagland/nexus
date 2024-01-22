'use server'
import revalidateCache from "./cache";
import fetchDataHandler from "./fetchDataHandler";

// Fetch a JSON list of all runes in the game
export async function getRuneProps() {
    const baseURL = process.env.RIOT_DDRAGON_BASE_URL_CDN;
    const gameVersion = process.env.GAME_VERSION;
    const url = `${baseURL}${gameVersion}/data/en_US/runesReforged.json`;

    try {
        const response = await fetchDataHandler(url, { next: { tags: ['runes'] } })
        return response;
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