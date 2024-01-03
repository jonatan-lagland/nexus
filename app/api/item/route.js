import fetchDataHandler from "@utils/fetchDataHandler";

export async function GET(req) {

    const baseURL = process.env.RIOT_API_BASE_URL;
    const gameVersion = process.env.GAME_VERSION;
    const url = `${baseURL}${gameVersion}/data/en_US/item.json`;

    try {
        const res = await fetchDataHandler(url)
        return Response.json({ res })
    } catch (error) {
        return Response.json({ status: error.status, reason: error.reason, error: error.message });
    }
}