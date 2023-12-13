'use client'
import SearchBar from "./SearchBar"
import Dropdown from "./Dropdown";
import countries from '@data/countries.json';
import { useChampionList } from '@utils/champion';

const CHAMPION_URL = "/champion/";
const SEARCH_PLACEHOLDER = "Search a champion..."
const arr_filler = [
    {
        "value": "",
        "label": ""
    }
]

export default function Feed() {
    const { championList, error } = useChampionList();

    return (
        <section className="feed">
            <Dropdown options={countries}></Dropdown>

            {/* Render the SearchBar with a list of champions, populate with a placeholder if fails */}
            <SearchBar
                url={CHAMPION_URL}
                placeholder={SEARCH_PLACEHOLDER}
                className={"search_input w-full"}
                options={championList ? (
                    championList
                ) : (
                    arr_filler
                )}
            />
        </section>
    );
}