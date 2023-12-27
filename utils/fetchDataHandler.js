import path from '@data/path.json';

async function fetchDataHandler(folder, subfolders = "", route, format) {
    const url = `${path.address}/${path.cdn}/${path.patch}/${folder}/${path.language}${subfolders ? `/${subfolders}` : ''}/${route}.${format}`;

    try {
        const query = await fetch(url);

        if (!query.ok) { // Check if the response was not ok
            return {
                status: query.status,
                error: `Failed to load data. Status: ${query.status}`
            };
        }

        const response = await query.json();
        return { status: 200, response };
    } catch (err) {
        // This is likely a network error
        console.log(`Error fetching data from ${url}:`, err);
        return {
            status: 'Network Error',
            error: 'Network error or unable to reach the server.'
        };
    }
}

export default fetchDataHandler;
