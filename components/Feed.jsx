'use client'
import SearchBar from "./SearchBar"
import Dropdown from "./Dropdown";
import countries from '@data/countries.json';
import champions from '@data/champions.json';

const CHAMPION_URL = "/champion/";
const SEARCH_PLACEHOLDER = "Search a champion..."

export default function Feed() {
    return (
        <section className="feed">
            <Dropdown options={countries}></Dropdown>
            <SearchBar
                url={CHAMPION_URL}
                placeholder={SEARCH_PLACEHOLDER}
                className={"search_input w-full"}
                options={champions}></SearchBar>
        </section>
    )
}