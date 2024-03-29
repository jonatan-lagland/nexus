'use server'
import revalidateCache from './cache';
import fetchDataHandler from './fetchDataHandler';
import { getLatestVersion } from './gameData';

export async function getChampionListProps(gameVersion) {
    const baseURL = process.env.RIOT_DDRAGON_BASE_URL_CDN;
    const url = `${baseURL}${gameVersion}/data/en_US/champion.json`;
    const tag = "championList";

    try {
        const response = await fetchDataHandler(url, tag)
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
    const tag = championName;
    const baseURL = process.env.RIOT_DDRAGON_BASE_URL_CDN;
    const gameVersion = await getLatestVersion()
    const url = `${baseURL}${gameVersion}/data/en_US/champion/${championName}.json`;

    try {
        const response = await fetchDataHandler(url, tag)
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