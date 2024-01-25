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
        gameMode
    } = matchData;

    const { perks } = matchData;

    return (
        <div className={`${containerClass} lg:min-h-[205px] md:min-h-[415px] min-h-[415px] match lg:ps-2`}>
            <div>
                <GameResult />
            </div>
            <div>
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
    );
}

export default React.memo(Match)