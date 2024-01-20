'use client'
import Image from 'next/image';
import React from 'react'
import Items from './Items';
import { useState, useContext } from 'react';
import Tooltip from './Tooltip';
import { useItemHover } from '@utils/tooltipUtils';
import { useCardDetails } from '@utils/matchHistoryUtils';
import { useImagePathChampion } from '@utils/paths';
import { ColorblindContext } from '@utils/context/colorBlindContext';

function Match({ matchHistoryDetails, puuid }) {

    const {
        timestampGameEnd,
        timestampGameDuration,
        individualPosition,
        kills,
        deaths,
        assists,
        totalMinionsKilled,
        visionScore,
        goldEarned,
        champLevel,
        championName,
        items,
        participants,
        gameMode,
        win
    } = useCardDetails(matchHistoryDetails, puuid)

    const { isColorblindMode } = useContext(ColorblindContext);

    const outcome = win ? "Victory" : "Defeat";
    const stylesContainerMatch = win
        ? (isColorblindMode ? 'bg-colorblind-win-primary border-colorblind-win-secondary' : 'bg-forest border-grass')
        : (isColorblindMode ? 'bg-colorblind-loss-primary border-colorblind-loss-secondary' : 'bg-dark-wine border-red-800');

    const bgColorDropdown = win
        ? (isColorblindMode ? 'bg-colorblind-win-secondary hover:bg-colorblind-win-tertiary' : 'bg-green-800 hover:bg-green-700')
        : (isColorblindMode ? 'bg-colorblind-loss-secondary hover:bg-colorblind-loss-tertiary' : 'bg-red-900 hover:bg-red-800');

    const stylesOutcomeText = win
        ? (isColorblindMode ? 'text-indigo-950' : 'text-bright-green')
        : (isColorblindMode ? 'text-amber-500' : 'text-grapefruit');

    const stylesGenericText = win
        ? (isColorblindMode ? 'text-black-900' : 'text-cream')
        : (isColorblindMode ? 'text-cream' : 'text-cream');

    const stylesStatsText = win
        ? (isColorblindMode ? 'text-black-900' : 'text-zinc-200')
        : (isColorblindMode ? 'text-zinc-200' : 'text-zinc-200');

    const stylesDeathText = win
        ? (isColorblindMode ? 'text-black-950' : 'text-bright-red')
        : (isColorblindMode ? 'text-orange-500' : 'text-bright-red');

    const stylesGamemode = (gameMode === "CLASSIC") ? '' : ''

    const stylesKillAndAssistText = isColorblindMode ? 'text-indigo-800' : 'text-white';

    // State to manage the visibility of the TeamList
    const [isTeamListVisible, setIsTeamListVisible] = useState(false);

    // Function to toggle the visibility
    const toggleTeamList = () => {
        setIsTeamListVisible(!isTeamListVisible);
    };

    const teamsArray = [
        {
            teamName: 'Blue Team',
            players: [
                { name: 'Player A1' },
                { name: 'Player A2' },
                { name: 'Player A3' },
                { name: 'Player A4' },
                { name: 'Player A5' }
            ]
        },
        {
            teamName: 'Red Team',
            players: [
                { name: 'Player B1' },
                { name: 'Player B2' },
                { name: 'Player B3' },
                { name: 'Player B4' },
                { name: 'Player B5' }
            ]
        }
    ];


    const ExpandDetailsButton = () => {
        return (
            <Image
                style={{ userSelect: 'none', pointerEvents: 'none' }}
                src={'/assets/icons/dropdown.svg'}
                alt='Dropdown'
                width={32}
                height={32}
            />
        );
    };

    const GameResult = () => {
        return (
            <>
                <div className='flex flex-row sm:flex-col items-center flex-grow justify-center space-x-3 sm:space-x-0 sm:justify-around px-2 py-2'>
                    <div className='flex flex-col items-center text-center space-y-1'>
                        <div className='sm:hidden flex'>
                            <RoleIcon />
                        </div>
                        <span className={`text-4xl font-bebas drop-shadow-md ${stylesOutcomeText}`}>{outcome}</span>
                        <p className={`${stylesGenericText} font-abel text-xl`}>{timestampGameEnd}</p>
                    </div>
                    <div className='hidden sm:flex'>
                        <RoleIcon />
                    </div>
                    <div className='hidden sm:flex flex-row items-center space-x-2'>
                        <TimeComponent></TimeComponent>
                    </div>
                </div>
            </>
        );
    }

    const TimeComponent = () => {
        return (
            <>
                <IconGeneric icon="clock"></IconGeneric>
                <p className={`${stylesStatsText} font-oswald font-light text-base md:text-xl`}>{timestampGameDuration}</p>
            </>
        );
    }

    const PlayerStatistics = () => {
        return (
            <div className='flex flex-col space-y-3 p-2 flex-grow max-w-lg items-stretch'>
                <div className='flex flex-row items-center justify-center space-x-2'>
                    <div className='relative h-20 w-20'>
                        <ChampionIcon></ChampionIcon>
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
                            <Stats />
                        </div>
                    </div>
                </div>
                <div className='sm:hidden flex flex-row flex-grow justify-center space-x-2'>
                    <div className='flex flex-col space-y-1 text-center'>
                        <Stats />
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

    const Teams = ({ isFullDetail }) => {
        if (gameMode === "CLASSIC") {
            const firstHalf = participants.slice(0, 5);
            const secondHalf = participants.slice(5);

            if (isFullDetail) {

                return (
                    <div className='flex flex-row flex-grow text-center space-x-1 sm:py-0 py-6'>
                        <div className='flex flex-col space-y-1'>
                            <span className='text-zinc-400' >Blue Team</span>
                            {firstHalf.map((player, index) => (
                                <div className='flex flex-row'>
                                    <Player isFullDetail={isFullDetail} key={player.puuid} player={player}></Player>
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <span className='text-zinc-400' >Red Team</span>
                            {secondHalf.map((player, index) => (
                                <Player isFullDetail={isFullDetail} key={player.puuid} player={player}></Player>
                            ))}
                        </div>
                    </div>
                );
            }

            return (
                <div className='flex flex-row flex-grow text-center space-x-1 sm:py-0 py-6'>
                    <div className='flex flex-col space-y-1'>
                        {firstHalf.map((player, index) => (
                            <Player key={player.puuid} player={player}></Player>
                        ))}
                    </div>
                    <div className='flex flex-col space-y-1'>
                        {secondHalf.map((player, index) => (
                            <Player key={player.puuid} player={player}></Player>
                        ))}
                    </div>
                </div>
            );
        }
    };

    const Player = ({ isFullDetail, player }) => {

        if (isFullDetail) {
            const isSmall = true;
            return (
                <div className='flex flex-row items-center space-x-1'>
                    <TeamPlayerIcon puuid={player.puuid} championName={player.championName}></TeamPlayerIcon>
                    <div className='flex flex-row space-x-1'>
                        <div className='space-y-1'>
                            <SummonerSpell styles={isSmall} spell="SummonerFlash"></SummonerSpell>
                            <SummonerSpell styles={isSmall} spell="SummonerTeleport"></SummonerSpell>
                        </div>
                        <div className='space-y-1'>
                            <Rune styles={isSmall} rune="SummonerFlash"></Rune>
                            <Rune styles={isSmall} rune="SummonerTeleport"></Rune>
                        </div>
                    </div>
                    <p className='font-abel text-lg text-zinc-300 truncate'>{player.riotIdGameName}</p>
                </div>
            );
        }

        return (
            <div className='flex flex-row items-center space-x-1'>
                <TeamPlayerIcon puuid={player.puuid} championName={player.championName}></TeamPlayerIcon>
                <p className='font-abel text-lg text-zinc-300 truncate'>{player.riotIdGameName}</p>
            </div>
        );
    };


    const ScoreStatistics = () => {
        return (
            <>
                <div className='game-stats-container'>
                    <div className='flex flex-row space-x-2 items-center sm:hidden'>
                        <TimeComponent></TimeComponent>
                    </div>
                    <div className='flex flex-row space-x-2 items-center'>
                        <IconGeneric icon="minions"></IconGeneric>
                        <p className={`${stylesStatsText} font-oswald font-light text-base md:text-xl`}>{totalMinionsKilled}</p>
                    </div>
                    <div className='flex flex-row space-x-2 items-center'>
                        <IconGeneric icon="gold"></IconGeneric>
                        <p className={`${stylesStatsText} font-oswald font-light text-base md:text-xl`}>{goldEarned}</p>
                    </div>
                </div>
            </>
        );
    }

    const Stats = () => {
        return (
            <p className='font-oswald space-x-1 text-2xl'>
                <span className='text-white'>{kills}</span>
                <span className='text-zinc-400'> / </span>
                <span className={`${stylesDeathText}`}>{deaths}</span>
                <span className='text-zinc-400'> / </span>
                <span className=' text-white'>{assists}</span>
            </p>
        );
    }

    const IconGeneric = ({ icon }) => {
        return (
            <Image
                src={`/assets/icons/stats/icon_${icon}.png`}
                alt={`${icon} Icon`}
                width={20}
                height={20}
            />
        )
    }

    const IconRank = ({ icon }) => {
        return (
            <Image
                src={`/assets/icons/stats/icon_${icon}.png`}
                alt={`${icon} Icon`}
                width={64}
                height={64}
            />
        )
    }

    const RoleIcon = () => {
        return (
            <Image
                src={`/assets/icons/roles/icon-position-banner-primary-${individualPosition}.png`}
                alt={"Role Icon"}
                width={36}
                height={36}
                className='object-contain'
            />
        )
    }

    const ChampionIcon = () => {
        const { handleMouseHover, tooltipItemId, event } = useItemHover();
        return (
            <div
                key={championName}
                style={{ width: '80px', height: '80px' }}
                className='border-black border-4 rounded-full overflow-hidden'
                onMouseOver={handleMouseHover(championName)}
                onMouseLeave={handleMouseHover(championName)}>
                <Image
                    src={useImagePathChampion(championName)}
                    alt={"Champion Icon"}
                    width={120}
                    height={120}
                //style={{ userSelect: 'none', pointerEvents: 'none' }}
                />
            </div>
        )
    }

    const TeamPlayerIcon = ({ championName, puuid }) => {
        const { handleMouseHover, tooltipItemId, event } = useItemHover();
        return (
            <div
                key={puuid}
                style={{ width: '32px', height: '32px' }}
                className='border border-black object-none rounded-sm select-none'>
                <Image
                    onMouseOver={handleMouseHover(puuid)}
                    onMouseLeave={handleMouseHover(puuid)}
                    src={useImagePathChampion(championName)}
                    alt={championName}
                    width={32}
                    height={32}
                    style={{ minWidth: '32px', minWidth: '32px' }}
                />
            </div>
        )
    }

    const SummonerSpell = ({ styles, spell }) => {
        if (styles) {
            return (
                <Image
                    src={`/assets/images/${spell}.png`}
                    alt={"Champion Icon"}
                    width={16}
                    height={16}
                    className='rounded-sm'
                />
            )
        }
        return (
            <Image
                src={`/assets/images/${spell}.png`}
                alt={"Champion Icon"}
                width={32}
                height={32}
                className='rounded-sm'
                style={{ minWidth: '32px', minWidth: '32px' }}
            />
        )
    }

    const Rune = ({ styles, rune }) => {
        if (styles) {
            return (
                <Image
                    src={`/assets/images/${rune}.png`}
                    alt={"Champion Icon"}
                    width={16}
                    height={16}
                    className='rounded-sm'
                />
            )
        }
        return (
            <Image
                src={`/assets/images/${rune}.png`}
                alt={"Champion Icon"}
                width={32}
                height={32}
                className='rounded-sm'
                style={{ minWidth: '32px', minWidth: '32px' }}
            />
        )
    }

    return (
        <>
            <div className={`container-match ${stylesContainerMatch}`}>
                <div className='flex flex-col sm:flex-row sm:space-y-0  items-center'>
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
                    <div className='hidden sm:flex flex-row p-1'>
                        <Teams isFullDetail={false} />
                    </div>
                    <div className='sm:hidden flex flex-row p-1'>
                        <Teams isFullDetail={true} />
                    </div>
                </div>
                {isTeamListVisible && <div><Teams /></div>}
            </div>
        </>
    );
}

export default Match