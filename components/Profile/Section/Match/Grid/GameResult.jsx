'use client'
import { useContext, useState, useEffect } from "react";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";
import { SettingsContext } from "@utils/context/SettingsContext";
import { useCalculateGameEnd } from "@utils/matchHistoryUtils";

const GameResult = ({ isRemake }) => {
    const { matchData } = useContext(MatchHistoryContext);
    const { win, gameEndTimestamp } = matchData;
    const { isColorblindMode } = useContext(SettingsContext);
    const [outcome, setOutcome] = useState('');
    const [outcomeTheme, setOutcomeTheme] = useState('');

    useEffect(() => {
        const outcome = isRemake ? 'Remake'
            : win ? "Victory" : "Defeat";
        const outcomeTheme = isRemake ? 'text-white'
            : win
                ? (isColorblindMode ? 'text-amber-400' : 'text-bright-green')
                : (isColorblindMode ? 'text-neutral-300' : 'text-grapefruit');
        setOutcome(outcome)
        setOutcomeTheme(outcomeTheme)
    }, [win, isColorblindMode, isRemake]);

    const timestampGameEnd = useCalculateGameEnd(gameEndTimestamp)

    return (
        <>
            <div className="flex flex-col justify-center text-center items-center outcome-label">
                <h3 className={`text-2xl font-bebas drop-shadow-md ${outcomeTheme}`}>{outcome}</h3>
                <h4 className={`font-abel text-zinc-300`}>{timestampGameEnd}</h4>
            </div>
        </>
    );
}

export default GameResult