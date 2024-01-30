'use server'
import revalidateCache from './cache';
import fetchDataHandler from './fetchDataHandler';
import { getLatestVersion } from './latestVersion';

export async function getChampionListProps() {
    const baseURL = process.env.RIOT_DDRAGON_BASE_URL_CDN;
    const gameVersion = await getLatestVersion()
    const url = `${baseURL}${gameVersion}/data/en_US/champion.json`;
    const tag = "championList";
    const revalidateDuration = 60 * 60 * 24; // 24 hours

    try {
        const response = await fetchDataHandler(url, { next: { tags: [tag], revalidate: revalidateDuration } })
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

// Fetch JSON of a specific champion in the game
export async function getChampionProps(params) {
    const championName = params.Id;
    const baseURL = process.env.RIOT_DDRAGON_BASE_URL_CDN;
    const gameVersion = await getLatestVersion()
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