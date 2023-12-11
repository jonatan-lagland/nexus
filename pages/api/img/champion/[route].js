import path from '@data/imgPath.json';

export default async function handler(req, res) {
    const { route } = req.query;
    const url = `${path.address}/${path.cdn}/${path.patch}/${path.folder}/${path.champion}/${route}.png`;

    try {
        const imageResponse = await fetch(url);

        if (!imageResponse.ok) {
            throw new Error(`Failed to fetch image. Status: ${imageResponse.status}`);
        }

        // Get the binary data of the image
        const imageBuffer = await imageResponse.buffer();

        // Set appropriate headers for a PNG image
        res.setHeader('Content-Type', 'image/png');
        res.status(200).send(imageBuffer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to load image.' });
    }
}
