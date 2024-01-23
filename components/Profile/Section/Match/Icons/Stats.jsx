'use client'
import { useContext } from "react";
import { ColorblindContext } from "@utils/context/colorBlindContext";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";


const Stats = ({ kills, deaths, assists }) => {

    const { isColorblindMode } = useContext(ColorblindContext);
    const { matchData } = useContext(MatchHistoryContext);
    const { win } = matchData;
    const deathsTheme = win
        ? (isColorblindMode ? 'text-amber-500' : 'text-bright-red')
        : (isColorblindMode ? 'text-amber-500' : 'text-bright-red');
    const killAndAssistTheme = win
        ? (isColorblindMode ? 'text-white' : 'text-white')
        : (isColorblindMode ? 'text-white' : 'text-white');
    const dividerTheme = win
        ? (isColorblindMode ? 'text-slate-400' : 'text-slate-400')
        : (isColorblindMode ? 'text-slate-400' : 'text-slate-400');

    return (
        <p className='font-oswald text-2xl truncate'>
            <span className={`${killAndAssistTheme}`}>{kills}</span>
            <span className={`${dividerTheme}`}> / </span>
            <span className={`${deathsTheme}`}>{deaths}</span>
            <span className={`${dividerTheme}`}> / </span>
            <span className={`${killAndAssistTheme}`}>{assists}</span>
        </p>
    );
}

export default Stats