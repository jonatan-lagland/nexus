'use client'
import { useContext, useState, useEffect } from "react";
import RoleIcon from "../Icons/RoleIcon";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";
import { ColorblindContext } from "@utils/context/colorBlindContext";
import { useCalculateGameEnd } from "@utils/matchHistoryUtils";

const GameResult = () => {
    const { matchData } = useContext(MatchHistoryContext);
    const { win, gameEndTimestamp, individualPosition } = matchData;
    const { isColorblindMode } = useContext(ColorblindContext);
    const [outcome, setOutcome] = useState('');
    const [outcomeTheme, setOutcomeTheme] = useState('');

    useEffect(() => {
        const outcome = win ? "Victory" : "Defeat";
        const outcomeTheme = win
            ? (isColorblindMode ? 'text-amber-400' : 'text-bright-green')
            : (isColorblindMode ? 'text-neutral-300' : 'text-grapefruit');
        setOutcome(outcome)
        setOutcomeTheme(outcomeTheme)
    }, [win, isColorblindMode]);

    const timestampGameEnd = useCalculateGameEnd(gameEndTimestamp)

    return (
        <>
            <div className="flex flex-col justify-center text-center items-center outcome-label">
                <h3 className={`text-3xl font-bebas drop-shadow-md ${outcomeTheme}`}>{outcome}</h3>
                <h4 className={`font-abel text-lg text-zinc-300`}>{timestampGameEnd}</h4>
            </div>
        </>
    );
}

export default GameResult