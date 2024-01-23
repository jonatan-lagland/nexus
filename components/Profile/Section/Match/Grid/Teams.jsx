'use client'
import Player from "./Player";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";
import { useContext } from "react";

const Teams = () => {
    const { matchData } = useContext(MatchHistoryContext);
    const { participants, gameMode } = matchData;
    let firstHalf = [];
    let secondHalf = [];

    if (gameMode === "CLASSIC") {
        firstHalf = participants.slice(0, 5);
        secondHalf = participants.slice(5);
        return (
            <div className='team'>
                <div>
                    {firstHalf.map((player) => (
                        <div key={player.puuid} className=''>
                            <Player player={player}></Player>
                        </div>
                    ))}
                </div>
                <div>
                    {secondHalf.map((player) => (
                        <div key={player.puuid} className=''>
                            <Player player={player}></Player>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default Teams