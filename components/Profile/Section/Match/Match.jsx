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
        <div className={`${containerTheme}`}>
            <div className='flex flex-col sm:flex-row sm:space-y-0 items-center'>
                <div className='flex flex-grow justify-center'>
                    <div className='flex justify-center'>
                        <div className='flex justify-center'>
                            <GameResult />
                        </div>
                        <div className='sm:hidden flex'>
                            <PlayerStatistics />
                        </div>
                    </div>
                    <div className='hidden sm:flex'>
                        <PlayerStatistics />
                    </div>
                </div>
                <div className='flex flex-row p-1'>
                    <Teams isFullDetail={false} />
                </div>
            </div>
        </div>
    );
}

export default React.memo(Match)