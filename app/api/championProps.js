import { revalidateTag } from 'next/cache'
import fetchDataHandler from './fetchDataHandler';

export async function getChampionListProps() {
    const url = "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion.json";
    const result = await fetchDataHandler(url);
    return result;
}

// Fetch JSON of a specific champion in the game
// Uses Next.js server-side caching to drastically reduce calls to Riot API
export async function getChampionProps(params) {
    const championName = params.Id;
    const route = `/api/champion/${championName}`;

    const response = await fetch(route, { next: { tags: [championName] } });
    const data = await response.json();
    if (data.error) {
        // Clear cache if an error occurs
        revalidateTag(championName)
        return {
            status: data.status,
            reason: data.reason,
            error: data.error
        };
    }
    const championData = data.res.data[championName];
    return championData;
}