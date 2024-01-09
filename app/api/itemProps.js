import { revalidateTag } from 'next/cache'

// Fetch a JSON list of all items in the game
// Uses Next.js server-side caching to drastically reduce calls to Riot API
export async function getItemProps() {
    const route = `/api/item`;

    const response = await fetch(route, { next: { tags: ['items'] } });
    const data = await response.json();
    if (data.error) {
        // Clear cache if an error occurs
        revalidateTag('items')
        return {
            status: data.status,
            reason: data.reason,
            error: data.error
        };
    }
    return data;
}