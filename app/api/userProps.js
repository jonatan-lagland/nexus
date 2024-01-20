'use server'
import revalidateCache from './cache';
import fetchDataHandler from './fetchDataHandler';

// Fetch the PUUID for username
export async function getUserPUUID(params, region) {
    const paramsId = params.Id;
    const base_url = process.env.RIOT_API_BASE_URL;
    const account_url = process.env.RIOT_API_ACCOUNT_URL;
    const id = paramsId.replace('-', '/');
    const INCLUDE_API_KEY = true;
    const url = `https://${region}.${base_url}/${account_url}/by-riot-id/${id}`;

    try {
        const response = await fetchDataHandler(url, INCLUDE_API_KEY, { next: { tags: [paramsId] } })
        return response;
    } catch (error) {
        // Clear cache if an error occurs
        revalidateCache(paramsId)
        return {
            status: error.status,
            reason: error.reason,
            error: error.message
        }
    }
}

export async function getUserInfo(puuid, server) {
    const base_url = process.env.RIOT_API_BASE_URL;
    const summoner_url = process.env.RIOT_API_SUMMONER_URL;
    const INCLUDE_API_KEY = true;
    const url = `https://${server}.${base_url}/${summoner_url}/by-puuid/${puuid}`;
    const tag = puuid;

    try {
        const response = await fetchDataHandler(url, INCLUDE_API_KEY, { next: { tags: [tag] } })
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

export async function getMatchHistory(puuid, region) {
    const base_url = process.env.RIOT_API_BASE_URL;
    const matches_url = process.env.RIOT_API_MATCHES_URL;
    const INCLUDE_API_KEY = true;
    const url = `https://${region}.${base_url}/${matches_url}/by-puuid/${puuid}/ids?start=0&count=20`;
    console.log(url)
    const tag = `MatchHistory ${puuid}`;

    try {
        const response = await fetchDataHandler(url, INCLUDE_API_KEY, { next: { tags: [tag] } })
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

export async function getMatchHistoryDetails(matchId, region) {
    const base_url = process.env.RIOT_API_BASE_URL;
    const matches_url = process.env.RIOT_API_MATCHES_URL;
    const INCLUDE_API_KEY = true;
    const url = `https://${region}.${base_url}/${matches_url}/${matchId}`;
    const tag = `${matchId}`;

    try {
        const response = await fetchDataHandler(url, INCLUDE_API_KEY, { next: { tags: [tag] } })
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