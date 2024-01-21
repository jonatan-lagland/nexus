'use client'
import ChampionIcon from "../Icons/ChampionIcon";
import SummonerSpell from "../Icons/SummonerSpell";
import Rune from "../Icons/Rune";
import Stats from "../Icons/Stats";
import Items from "../../Items";
import ScoreStatistics from "./ScoreStatistics";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";
import { useContext } from "react";

const PlayerStatistics = () => {
    const { matchData } = useContext(MatchHistoryContext);
    const {
        kills,
        deaths,
        assists,
        championName,
        champLevel,
        items,
        visionScore
    } = matchData;

    return (
        <div className='flex flex-col space-y-3 p-2 flex-grow max-w-lg items-stretch'>
            <div className='flex flex-row items-center justify-center space-x-2'>
                <div className='relative h-20 w-20'>
                    <ChampionIcon championName={championName}></ChampionIcon>
                    <div className='champion-level-container'>
                        <p>{champLevel}</p>
                    </div>
                </div>
                <div className='flex flex-row space-x-2'>
                    <div className='space-y-1'>
                        <SummonerSpell spell="SummonerFlash"></SummonerSpell>
                        <SummonerSpell spell="SummonerTeleport"></SummonerSpell>
                    </div>
                    <div className='space-y-1'>
                        <Rune rune="SummonerFlash"></Rune>
                        <Rune rune="SummonerTeleport"></Rune>
                    </div>
                </div>
                <div className='hidden sm:flex flex-row flex-grow justify-center space-x-2'>
                    <div className='flex flex-col space-y-1 text-center'>
                        <Stats kills={kills} deaths={deaths} assists={assists} />
                    </div>
                </div>
            </div>
            <div className='sm:hidden flex flex-row flex-grow justify-center space-x-2'>
                <div className='flex flex-col space-y-1 text-center'>
                    <Stats kills={kills} deaths={deaths} assists={assists} />
                </div>
            </div>
            <div>
                <Items items={items} visionScore={visionScore}></Items>
            </div>
            <div>
                <ScoreStatistics />
            </div>
        </div>
    );
}

export default PlayerStatistics