import fetchDataHandler from "@utils/fetchDataHandler";

export default async function handler(req, res) {
    const { route } = req.query;
    const folder = "img";
    const subfolders = "item";
    const format = "png";

    const result = await fetchDataHandler(folder, subfolders, route, format);

    res.status(result.status).json(result.status === 200 ? { response: result.response } : { error: result.error });
}