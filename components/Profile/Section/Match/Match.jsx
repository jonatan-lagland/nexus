'use client'
import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { ColorblindContext } from '@utils/context/colorBlindContext';
import { MatchHistoryContext } from '@utils/context/matchHistoryContext';
import { useCalculateOPScore, useCardDetails, useGetQueueType } from '@utils/matchHistoryUtils';
import GameResult from './Grid/GameResult';
import PlayerStatistics from './Grid/PlayerStatistics';
import Teams from './Grid/Teams';
import RoleIcon from './Icons/RoleIcon';
import ScoreStatistics from './Grid/ScoreStatistics';
import { KillsEmblem } from '@components/ui/killsEmblem';
import { KillParticipationEmblem } from '@components/ui/killParticipationEmblem';
import SidebarDropdown from './Icons/SidebarDropdown';
import { QueueContext } from '@utils/context/queueContext';

function Match({ matchHistoryDetails, puuid }) {
    const { isColorblindMode } = useContext(ColorblindContext);
    const { matchData, setMatchData } = useContext(MatchHistoryContext);
    const queueTypes = useContext(QueueContext)
    const [containerClass, setContainerClass] = useState('');
    const [isRemake, setIsRemake] = useState(false)

    const details = useCardDetails(matchHistoryDetails, puuid);
    const { mainPlayerScore } = useCalculateOPScore(matchHistoryDetails, puuid);
    const queueType = useGetQueueType(matchHistoryDetails, queueTypes);

    useEffect(() => {
        if (matchData == null) {
            return;
        }
        const { win } = matchData;
        const { gameEndedInEarlySurrender } = matchData.mainPlayer;
        const { gameDuration } = matchData;
        const remake = gameEndedInEarlySurrender && gameDuration < 300;
        const containerTheme = remake ?
            (isColorblindMode ? 'container-remake-colorblind' : 'container-remake') :
            win
                ? (isColorblindMode ? 'container-victory-colorblind' : 'container-victory')
                : (isColorblindMode ? 'container-defeat-colorblind' : 'container-defeat');
        setContainerClass(containerTheme)
        setIsRemake(remake)
    }, [matchData, isColorblindMode, containerClass]);

    useEffect(() => {
        setMatchData(details);
    }, [setMatchData, details]);

    if (!matchData) {
        return null;
    }

    const {
        mainPlayer,
        participants,
        itemIdList,
        gameMode,
        gameDuration,
    } = matchData;

    return (
        <div className=''>
            <div className={`container-header py-1 px-3 flex flex-row justify-between min-h-[42px] gap-2 rounded-t-lg border-t border-x border-x-slate-700 border-t-slate-700`}>
                <div className='flex flex-grow flex-row flex-wrap justify-between gap-1'>
                    <div className='flex flex-row justify-center text-center items-center space-x-3'>
                        <h3 className={`text-gray-300 font-abel text-lg`}>{queueType.shortName}</h3>
                        {mainPlayer.teamPosition && <RoleIcon role={mainPlayer.teamPosition} />}
                        <KillParticipationEmblem killParticipation={mainPlayerScore.killParticipation}></KillParticipationEmblem>
                        <KillsEmblem kills={mainPlayer.largestMultiKill}></KillsEmblem>
                    </div>
                    <ScoreStatistics
                        totalMinionsKilled={mainPlayer.totalMinionsKilled}
                        neutralMinionsKilled={mainPlayer.neutralMinionsKilled}
                        goldEarned={mainPlayer.goldEarned}
                        gameDuration={gameDuration}
                    ></ScoreStatistics>
                </div>
            </div>
            <div className={`${containerClass} border rounded-b-lg lg:min-h-[150px] min-h-[270px] match lg:ps-2`}>
                <div className='flex flex-col items-center justify-center'>
                    <GameResult isRemake={isRemake} />
                </div>
                <div className='flex justify-center items-center'>
                    <PlayerStatistics
                        kills={mainPlayer.kills}
                        deaths={mainPlayer.deaths}
                        assists={mainPlayer.assists}
                        kdaRatio={mainPlayerScore.kdaRatio}
                        championName={mainPlayer.championName}
                        championId={mainPlayer.championId}
                        champLevel={mainPlayer.champLevel}
                        itemIdList={itemIdList}
                        visionScore={mainPlayer.visionScore}
                        perks={mainPlayer.perks}
                        summoner1Id={mainPlayer.summoner1Id}
                        summoner2Id={mainPlayer.summoner2Id}
                    />
                </div>
                <div className='hidden lg:flex items-center justify-center'>
                    <Teams participants={participants} gameMode={gameMode} />
                </div>
                <div>
                    <SidebarDropdown isRemake={isRemake}></SidebarDropdown>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Match);