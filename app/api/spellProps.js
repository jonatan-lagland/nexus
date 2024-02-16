'use server'
import revalidateCache from "./cache";
import fetchDataHandler from "./fetchDataHandler";

// Fetch a JSON list of all runes in the game
export async function getRuneProps(gameVersion) {
    const baseURL = process.env.RIOT_DDRAGON_BASE_URL_CDN;
    const url = `${baseURL}${gameVersion}/data/en_US/runesReforged.json`;
    const tag = 'runes';

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

export async function getSummonerSpellProps() {
    const baseURL = process.env.RAW_COMMUNITY_DRAGON_URL;
    const url = `${baseURL}/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells.json`;
    const tag = 'summonerSpells';

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