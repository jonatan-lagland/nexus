'use client'
import SearchBar from "./SearchBar"
import Dropdown from "./Dropdown";
import countries from '@data/countries.json';
import { ChampionListContext } from "@utils/context/championListContext";
import { useContext } from "react";
import { useChampionList } from "@utils/champion";


const CHAMPION_URL = "/champion/";
const SEARCH_PLACEHOLDER = "Search a champion..."

export default function Feed() {
    const context = useContext(ChampionListContext);
    const { championList, error } = useChampionList(context)
    return (
        <section className="feed">
            <section className="search">
                <Dropdown options={countries}></Dropdown>
                <SearchBar
                    url={CHAMPION_URL}
                    placeholder={SEARCH_PLACEHOLDER}
                    options={championList ? (championList) : (error)}
                />
            </section>
        </section>
    );
}