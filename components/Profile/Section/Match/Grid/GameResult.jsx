'use client'
import { useContext } from "react";
import RoleIcon from "../Icons/RoleIcon";
import MatchEnd from "../Icons/MatchEnd";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";

const GameResult = () => {
    const { matchData } = useContext(MatchHistoryContext);
    const { win, timestampGameEnd, individualPosition } = matchData;

    const outcome = win ? "Victory" : "Defeat";

    return (
        <>
            <div className='flex flex-row sm:flex-col items-center flex-grow justify-center space-x-3 sm:space-x-0 sm:justify-around px-2 py-2'>
                <div className='flex flex-col items-center text-center space-y-1'>
                    <div className='sm:hidden flex'>
                        <RoleIcon role={individualPosition} />
                    </div>
                    <span className={`text-4xl font-bebas drop-shadow-md`}>{outcome}</span>
                    <p className={`font-abel text-xl`}>{timestampGameEnd}</p>
                </div>
                <div className='hidden sm:flex'>
                    <RoleIcon role={individualPosition} />
                </div>
                <div className='hidden sm:flex flex-row items-center space-x-2'>
                    <MatchEnd />
                </div>
            </div>
        </>
    );
}

export default GameResult