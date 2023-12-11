import path from '@data/path.json';

/* Fetch JSON data from the ddragon endpoint, e.g. item.json champion.json with a full list of details */

export default async function handler(req, res) {
    const { route } = req.query;
    const url = `${path.address}/${path.cdn}/${path.patch}/${path.folder}/${path.language}/${route}.json`;
    try {
        const query = await fetch(url);
        const response = await query.json();
        res.status(200).json({ response })
    } catch (err) {
        res.status(500).json({ error: 'Failed to load data.' })
    }
}