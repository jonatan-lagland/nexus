import fetchDataHandler from "@app/api/fetchDataHandler";

export default async function handler(req, res) {
    console.log(req.query)

    const { route } = req.query;

    const folder = "data";
    const subfolders = "";
    const format = "json";

    const result = await fetchDataHandler(folder, subfolders, route, format);

    res.status(result.status).json(result.status === 200 ? { response: result.response } : { error: result.error });
}
