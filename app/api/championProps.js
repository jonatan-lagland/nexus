'use server'
import revalidateCache from './cache';
import fetchDataHandler from './fetchDataHandler';

export async function getChampionListProps() {
    const baseURL = process.env.RIOT_API_BASE_URL;
    const gameVersion = process.env.GAME_VERSION;
    const url = `${baseURL}${gameVersion}/data/en_US/champion.json`;
    const result = await fetchDataHandler(url);
    return result;
}

// Fetch JSON of a specific champion in the game
// Uses Next.js server-side caching to drastically reduce calls to Riot API
export async function getChampionProps(params) {
    const championName = params.Id;
    const baseURL = process.env.RIOT_API_BASE_URL;
    const gameVersion = process.env.GAME_VERSION;
    const url = `${baseURL}${gameVersion}/data/en_US/champion/${championName}.json`;

    try {
        const response = await fetchDataHandler(url, { next: { tags: [championName] } })
        return response.data[championName];
    } catch (error) {
        // Clear cache if an error occurs
        revalidateCache(championName)
        return {
            status: error.status,
            reason: error.reason,
            error: error.message
        }
    }
}