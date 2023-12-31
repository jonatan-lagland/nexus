'use client'
import SearchBar from "./SearchBar"
import Dropdown from "./Dropdown";
import countries from '@data/countries.json';
import { useChampionList } from "@utils/champion";

const CHAMPION_URL = "/champion/";
const SEARCH_PLACEHOLDER = "Search a champion..."

export default function Feed({ champions }) {
    const { championList, error } = useChampionList(champions)
    return (
        <section className="feed">
            <section className="search">
                <Dropdown options={countries}></Dropdown>

                {/* Render the SearchBar with a list of champions, populate with a placeholder if fails */}
                <SearchBar
                    url={CHAMPION_URL}
                    placeholder={SEARCH_PLACEHOLDER}
                    options={championList ? (championList) : (error)}
                />
            </section>
        </section>
    );
}