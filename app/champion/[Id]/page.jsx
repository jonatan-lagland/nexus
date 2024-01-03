import Profile from "@components/Profile/Profile";
import Timeout from "@app/timeout";
import { revalidateTag } from 'next/cache'

export default async function Page({ params }) {

    const championProps = await getChampionProps(params);
    const itemProps = await getItemProps();
    const errorProps = (championProps && championProps.error) ? championProps : (itemProps && itemProps.error) ? itemProps : null;

    // Render a loader while fetching data
    if (!championProps || !itemProps) {
        return (
            <section className='profile'>
                <div className="loader-container">
                    <div className="loader-lg"></div>
                </div>
            </section>
        )
    }

    // Render a custom error page if data fetching fails
    if (errorProps) {
        return (
            <Timeout error={errorProps}></Timeout>
        )
    }

    // Render profile page if all correct props are found
    return (
        <Profile championProps={championProps} itemProps={itemProps}></Profile>
    )
}


// Fetch JSON of a specific champion in the game
// Uses Next.js server-side caching to drastically reduce calls to Riot API
async function getChampionProps(params) {
    const championName = params.Id;
    const route = process.env.URL + `/api/champion/${championName}`;

    const response = await fetch(route, { next: { tags: [championName] } });
    const responseData = await response.json();
    if (responseData.error) {
        // Clear cache if an error occurs
        revalidateTag(championName)
        return {
            status: responseData.status,
            reason: responseData.reason,
            error: responseData.error
        };
    }
    const championData = responseData.res.data[championName];
    return championData;
}

// Fetch a JSON list of all items in the game
// Uses Next.js server-side caching to drastically reduce calls to Riot API
async function getItemProps() {
    const route = process.env.URL + `/api/item`;

    const response = await fetch(route, { next: { tags: ['items'] } });
    const responseData = await response.json();
    if (responseData.error) {
        // Clear cache if an error occurs
        revalidateTag('items')
        return {
            status: responseData.status,
            reason: responseData.reason,
            error: responseData.error
        };
    }
    return responseData;
}