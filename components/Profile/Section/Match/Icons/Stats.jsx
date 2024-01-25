'use client'
import { useContext, useState, useEffect } from "react";
import { ColorblindContext } from "@utils/context/colorBlindContext";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";


const Stats = ({ kills, deaths, assists }) => {
    const { isColorblindMode } = useContext(ColorblindContext);
    const { matchData } = useContext(MatchHistoryContext);
    const { win } = matchData;
    const [deathsTheme, setDeathsTheme] = useState('')
    const [killAndAssistTheme, setKillAndAssistTheme] = useState('')
    const [dividerTheme, setDividerTheme] = useState('')

    useEffect(() => {
        const deathsTheme = win
            ? (isColorblindMode ? 'text-amber-500' : 'text-bright-red')
            : (isColorblindMode ? 'text-amber-500' : 'text-bright-red');
        const killAndAssistTheme = win
            ? (isColorblindMode ? 'text-white' : 'text-white')
            : (isColorblindMode ? 'text-white' : 'text-white');
        const dividerTheme = win
            ? (isColorblindMode ? 'text-slate-400' : 'text-slate-400')
            : (isColorblindMode ? 'text-slate-400' : 'text-slate-400');
        setDeathsTheme(deathsTheme)
        setKillAndAssistTheme(killAndAssistTheme)
        setDividerTheme(dividerTheme)
    }, [win, isColorblindMode]);

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