'use client'
import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { ColorblindContext } from '@utils/context/colorBlindContext';
import { MatchHistoryContext } from '@utils/context/matchHistoryContext';
import { useCardDetails } from '@utils/matchHistoryUtils';
import GameResult from './Grid/GameResult';
import PlayerStatistics from './Grid/PlayerStatistics';
import Teams from './Grid/Teams';
import SidebarDropdown from './Icons/SidebarDropdown';
import RoleIcon from './Icons/RoleIcon';
import ScoreStatistics from './Grid/ScoreStatistics';
import { RankEmblem } from '@components/ui/rankemblem';

function Match({ matchHistoryDetails, puuid }) {
    const { isColorblindMode } = useContext(ColorblindContext);
    const { matchData, setMatchData } = useContext(MatchHistoryContext);
    const [containerClass, setContainerClass] = useState('');

    const details = useCardDetails(matchHistoryDetails, puuid)

    useEffect(() => {
        if (matchData == null) {
            return
        }
        const { win } = matchData;
        const containerTheme = win
            ? (isColorblindMode ? 'container-victory-colorblind' : 'container-victory')
            : (isColorblindMode ? 'container-defeat-colorblind' : 'container-defeat');
        setContainerClass(containerTheme)
    }, [matchData, isColorblindMode, containerClass]);

    useEffect(() => {
        setMatchData(details);
    }, [setMatchData, details]);

    if (!matchData) {
        return null;
    }

    const {
        kills,
        deaths,
        assists,
        championName,
        champLevel,
        itemIdList,
        visionScore,
        participants,
        gameMode,
        individualPosition
    } = matchData;

    const { perks } = matchData;

    return (
        <div className=''>
            <div className={`container-header flex flex-row justify-between min-h-[42px] gap-2 rounded-t-lg border-t border-x border-x-slate-700 border-t-slate-700`}>
                <div className='flex flex-grow flex-row flex-wrap justify-between gap-1'>
                    <div className='flex flex-row justify-center items-center space-x-3'>
                        <h3 className={`text-dust font-oswald text-lg lg:text-2xl`}>Ranked Solo</h3>
                        {individualPosition !== "Invalid" && <RoleIcon role={individualPosition} />}
                        <RankEmblem tier={"GRANDMASTER"} rank={"II"}></RankEmblem>
                    </div>
                    <ScoreStatistics></ScoreStatistics>
                </div>
            </div>
            <div className={`${containerClass} border rounded-b-lg lg:min-h-[165px] min-h-[270px] match lg:ps-2`}>
                <div className='flex flex-col items-center justify-center'>
                    <GameResult />
                </div>
                <div className='flex justify-center items-center'>
                    <PlayerStatistics
                        kills={kills}
                        deaths={deaths}
                        assists={assists}
                        championName={championName}
                        champLevel={champLevel}
                        itemIdList={itemIdList}
                        visionScore={visionScore}
                        perks={perks}
                    />
                </div>
                <div className='hidden lg:flex items-center justify-center'>
                    <Teams participants={participants} gameMode={gameMode} />
                </div>
                <div>
                    <SidebarDropdown></SidebarDropdown>
                </div>
            </div>
        </div>
    );
}

export default Match;