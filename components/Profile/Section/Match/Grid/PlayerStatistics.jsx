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
    const styles = { width: '32', height: '32' };

    return (
        <div className='flex flex-col space-y-3 p-2 items-stretch'>
            <div className='flex flex-row items-center justify-center space-x-2'>
                <div>
                    <ChampionIcon championName={championName}></ChampionIcon>
                    <div className='champion-level-container'>
                        <span className="select-none">{champLevel}</span>
                    </div>
                </div>
                <div className='flex flex-row space-x-2'>
                    <div className='space-y-1'>
                        <SummonerSpell styles={styles} spell="SummonerFlash"></SummonerSpell>
                        <SummonerSpell styles={styles} spell="SummonerTeleport"></SummonerSpell>
                    </div>
                    <div className='space-y-1'>
                        <Rune styles={styles} rune="SummonerFlash"></Rune>
                        <Rune styles={styles} rune="SummonerTeleport"></Rune>
                    </div>
                </div>
                <div className='flex flex-row justify-center'>
                    <div className='flex flex-col space-y-1 text-center'>
                        <Stats kills={kills} deaths={deaths} assists={assists} />
                    </div>
                </div>
            </div>
            <div className="space-x-2">
                <Items items={items} visionScore={visionScore}></Items>
            </div>
            <div>
                <ScoreStatistics />
            </div>
        </div>
    );
}

export default PlayerStatistics