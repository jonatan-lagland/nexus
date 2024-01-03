import Feed from "@components/Feed"
import fetchDataHandler from "@utils/fetchDataHandler";

export default async function Home() {
    const championListData = await getChampionListProps();

    return (
        <>
            <Feed champions={championListData}></Feed>
        </>
    )
}

export async function getChampionListProps() {
    const url = "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion.json";
    const result = await fetchDataHandler(url);
    return result;
}