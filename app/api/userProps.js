'use server'
import { notFound } from 'next/navigation';
import revalidateCache from './cache';
import fetchDataHandler from './fetchDataHandler';

// Get user PUUID by Riot Tag, e.g. Account-0000. PUIID is the ID shared across servers and is immutable.
export async function getUserPUUID(params, region) {
    const paramsId = params.Id;
    const base_url = process.env.RIOT_API_BASE_URL;
    const account_url = process.env.RIOT_API_ACCOUNT_URL;
    const id = paramsId.replace('-', '/');
    const tag = id;
    const INCLUDE_API_KEY = true; // Include an API key
    const url = `https://${region}.${base_url}/${account_url}/by-riot-id/${id}`;

    try {

        const response = await fetchDataHandler(url, tag, INCLUDE_API_KEY)
        return response;
    } catch (error) {
        revalidateCache(tag)
        if (error.status === 404 || error.status === 403) {
            notFound()
        }
    }
}

export async function getUserInfo(puuid, server, refreshCache = false) {
    const base_url = process.env.RIOT_API_BASE_URL;
    const summoner_url = process.env.RIOT_API_SUMMONER_URL;
    const INCLUDE_API_KEY = true; // Include an API key
    const url = `https://${server}.${base_url}/${summoner_url}/by-puuid/${puuid}`;
    const tag = puuid;

    try {
        if (refreshCache) {
            revalidateCache(tag)
        }
        const response = await fetchDataHandler(url, tag, INCLUDE_API_KEY)
        return response;
    } catch (error) {
        // Clear cache if an error occurs
        revalidateCache(tag)
        if (error.status === 404 || error.status === 403) {
            notFound()
        }
        return {
            status: error.status,
            reason: error.reason,
            error: error.message
        }
    }
}

export async function getRankedInfo(leagueId, server, refreshCache = false) {
    const base_url = process.env.RIOT_API_BASE_URL;
    const entries_url = process.env.RIOT_API_ENTRIES_URL;
    const INCLUDE_API_KEY = true; // Include an API key
    const url = `https://${server}.${base_url}/${entries_url}/by-summoner/${leagueId}`;
    const tag = leagueId;

    try {
        if (refreshCache) {
            revalidateCache(tag)
        }
        const response = await fetchDataHandler(url, tag, INCLUDE_API_KEY)
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

export async function getMatchHistory(puuid, region, refreshCache = false) {
    const base_url = process.env.RIOT_API_BASE_URL;
    const matches_url = process.env.RIOT_API_MATCHES_URL;
    const INCLUDE_API_KEY = true; // Include an API key
    const url = `https://${region}.${base_url}/${matches_url}/by-puuid/${puuid}/ids?start=0&count=20`;
    const tag = `Match-History ${puuid}`;

    try {
        if (refreshCache) {
            revalidateCache(tag)
        }
        const response = await fetchDataHandler(url, tag, INCLUDE_API_KEY)
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
    const INCLUDE_API_KEY = true; // Include an API key
    const url = `https://${region}.${base_url}/${matches_url}/${matchId}`;
    const tag = `${matchId}`;

    try {
        const response = await fetchDataHandler(url, tag, INCLUDE_API_KEY)
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

export async function getLiveGameDetails(server, summonerId) {
    const base_url = process.env.RIOT_API_BASE_URL;
    const spectator_url = process.env.RIOT_API_SPECTATOR_URL;
    const INCLUDE_API_KEY = true; // Include an API key
    const url = `https://${server}.${base_url}/${spectator_url}/by-summoner/${summonerId}`;
    const tag = `Live-Game-${summonerId}`;

    try {
        revalidateCache(tag)
        const response = await fetchDataHandler(url, tag, INCLUDE_API_KEY)
        return response;
    } catch (error) {
        revalidateCache(tag)
        return {
            status: error.status,
            reason: error.reason,
            error: error.message
        }
    }
}

export async function getUserNameAndTag(puuid, server) {
    const base_url = process.env.RIOT_API_BASE_URL;
    const account_url = process.env.RIOT_API_ACCOUNT_URL;
    const INCLUDE_API_KEY = true; // Include an API key
    const url = `https://${server}.${base_url}/${account_url}/by-puuid/${puuid}`;
    const tag = `UserAndTag-${puuid}`;

    try {
        const response = await fetchDataHandler(url, tag, INCLUDE_API_KEY)
        return response;
    } catch (error) {
        revalidateCache(tag)
        return {
            status: error.status,
            reason: error.reason,
            error: error.message
        }
    }
}