'use client'
import Player from "./Player";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";
import { useContext } from "react";

const Teams = ({ isFullDetail }) => {
    const { matchData } = useContext(MatchHistoryContext);
    const { participants, gameMode } = matchData;
    let firstHalf = [];
    let secondHalf = [];

    if (gameMode === "CLASSIC") {
        firstHalf = participants.slice(0, 5);
        secondHalf = participants.slice(5);
        return (
            <div className='flex flex-row flex-grow text-center space-x-1 sm:py-0 py-6'>
                <div className='flex flex-col space-y-1'>
                    {firstHalf.map((player) => (
                        <div key={player.puuid} className='flex flex-row'>
                            <Player player={player}></Player>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col space-y-1'>
                    {secondHalf.map((player) => (
                        <div key={player.puuid} className='flex flex-row'>
                            <Player player={player}></Player>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default Teams