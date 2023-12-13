import path from '@data/path.json';

async function fetchDataHandler(folder, subfolders = "", route, format) {

    const url = `${path.address}/${path.cdn}/${path.patch}/${folder}/${path.language}${subfolders ? `/${subfolders}` : ''}/${route}.${format}`;
    try {
        const query = await fetch(url);
        const response = await query.json();
        return { status: 200, response };
    } catch (err) {
        console.log(url)
        return { status: 500, error: 'Failed to load data.' };
    }
}

export default fetchDataHandler;