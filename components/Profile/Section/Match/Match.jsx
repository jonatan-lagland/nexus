'use client'
import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from "@utils/context/settingsContext";
import { MatchHistoryContext } from '@utils/context/matchHistoryContext';
import { useCalculateOPScore, useCardDetails, getQueueTypes } from '@utils/matchHistoryUtils';
import GameResult from './Grid/GameResult';
import PlayerStatistics from './Grid/PlayerStatistics';
import Teams from './Grid/Teams';
import RoleIcon from './Icons/RoleIcon';
import ScoreStatistics from './Grid/ScoreStatistics';
import { KillsEmblem } from '@components/ui/killsEmblem';
import { KillParticipationEmblem } from '@components/ui/killParticipationEmblem';
import { QueueContext } from '@utils/context/queueContext';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@components/ui/accordion';
import TeamsFull from './Grid/Teamsfull';

function Match({ matchHistoryDetails, puuid }) {
    const { isColorblindMode } = useContext(SettingsContext);
    const { matchData, setMatchData } = useContext(MatchHistoryContext);
    const queueTypes = useContext(QueueContext)
    const [containerClass, setContainerClass] = useState('');
    const [isRemake, setIsRemake] = useState(false)
    const [queueType, setQueueType] = useState('')
    const details = useCardDetails(matchHistoryDetails, puuid);
    const { mainPlayerScore, playerScores } = useCalculateOPScore(matchHistoryDetails, puuid);

    useEffect(() => {
        if (matchData == null) {
            return;
        }
        const { win } = matchData;
        const { gameEndedInEarlySurrender } = matchData.mainPlayer;
        const { gameDuration } = matchData;
        const { queueId } = matchData;
        const remake = gameEndedInEarlySurrender && gameDuration < 300;
        const containerTheme = remake ?
            'container-remake-colorblind' :
            win
                ? (isColorblindMode ? 'container-victory-colorblind' : 'container-victory')
                : (isColorblindMode ? 'container-defeat-colorblind' : 'container-defeat');
        const queueType = getQueueTypes(queueId, queueTypes);
        setQueueType(queueType)
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
        <Accordion type="single" collapsible>
            <AccordionItem className='border-none' value="item-1">
                <div className={`container-header py-1 px-3 flex flex-row justify-between gap-2 min-h-[37px] rounded-t-lg border-t border-x border-x-slate-700 border-t-slate-700`}>
                    <div className='flex flex-grow flex-row flex-wrap justify-between gap-1'>
                        <div className='flex flex-row justify-center text-center items-center space-x-3'>
                            <div>
                                <span className={`text-white`}>{queueType && queueType.name}</span>
                            </div>
                            <div>
                                {mainPlayer.teamPosition && <RoleIcon role={mainPlayer.teamPosition} />}
                            </div>
                            <div>
                                <KillParticipationEmblem killParticipation={mainPlayerScore.killParticipation}></KillParticipationEmblem>
                            </div>
                            <div>
                                <KillsEmblem kills={mainPlayer.largestMultiKill}></KillsEmblem>
                            </div>
                        </div>
                        <ScoreStatistics
                            totalMinionsKilled={mainPlayer.totalMinionsKilled}
                            neutralMinionsKilled={mainPlayer.neutralMinionsKilled}
                            goldEarned={mainPlayer.goldEarned}
                            gameDuration={gameDuration}
                        ></ScoreStatistics>
                    </div>
                </div>
                <div className={`${containerClass} border rounded-b-lg lg:min-h-[134px] min-h-[222px] match lg:ps-2`}>
                    <div className='flex flex-col items-center justify-center'>
                        <GameResult isRemake={isRemake} />
                    </div>
                    <div className='flex justify-center items-center py-1'>
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
                    <AccordionTrigger className={`flex containerClass hover:backdrop-brightness-100 backdrop-brightness-150 justify-center items-center md:p-1  rounded-br-md rounded-bl-md md:rounded-bl-none`}>
                    </AccordionTrigger>
                </div>
                <div>
                    <AccordionContent className='pt-4'>
                        <TeamsFull
                            isRemake={isRemake}
                            playerScores={playerScores}
                            participants={participants}
                            gameMode={gameMode}
                        ></TeamsFull>
                    </AccordionContent>
                </div>
            </AccordionItem>
        </Accordion>
    );
}

export default React.memo(Match);