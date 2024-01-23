'use client'
import React from 'react'
import { useContext, useEffect } from 'react';
import { ColorblindContext } from '@utils/context/colorBlindContext';
import { MatchHistoryContext } from '@utils/context/matchHistoryContext';
import { ItemDataContext } from '@utils/context/itemDataContext';
import { useCardDetails } from '@utils/matchHistoryUtils';
import GameResult from './Grid/GameResult';
import PlayerStatistics from './Grid/PlayerStatistics';
import Teams from './Grid/Teams';

function Match({ matchHistoryDetails, puuid }) {
    // Build match history data to be passed to MatchHistoryContext
    const completeListOfItems = useContext(ItemDataContext)
    const { isColorblindMode } = useContext(ColorblindContext);
    const { matchData, setMatchData } = useContext(MatchHistoryContext);

    const details = useCardDetails(matchHistoryDetails, puuid, completeListOfItems)

    useEffect(() => {
        setMatchData(details);
    }, []);

    if (!completeListOfItems || !matchData) {
        return null;
    }

    // Set container colors based on match outcome and colorblind mode
    const { win } = matchData;
    const containerTheme = win
        ? (isColorblindMode ? 'container-victory-colorblind' : 'container-victory')
        : (isColorblindMode ? 'container-defeat-colorblind' : 'container-defeat');

    return (
        <div className={`${containerTheme} match px-2`}>
            <div>
                <GameResult />
            </div>
            <div>
                <PlayerStatistics />
            </div>
            <div className='flex items-center justify-center'>
                <Teams isFullDetail={false} />
            </div>
        </div>
    );
}

export default React.memo(Match)