import path from '@data/path.json';

/* Fetch JSON data from the ddragon endpoint for a specific champion. e.g. Aatrox*/

export default async function handler(req, res) {
    const { route } = req.query;
    const url = `${path.address}/${path.cdn}/${path.patch}/${path.folder}/${path.language}/${path.champion}/${route}.json`;
    try {
        const query = await fetch(url);
        const response = await query.json();
        res.status(200).json({ response })
    } catch (err) {
        res.status(500).json({ error: 'Failed to load data.' })
    }
}