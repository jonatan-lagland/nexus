'use client'
import { useContext } from "react";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";
import { ColorblindContext } from "@utils/context/colorBlindContext";
import { calculateGameDuration } from "@utils/matchHistoryUtils";

const MatchEnd = () => {
    const { matchData } = useContext(MatchHistoryContext);
    const { isColorblindMode } = useContext(ColorblindContext);
    const { gameDuration, win } = matchData;
    const timestampGameDuration = calculateGameDuration(gameDuration)
    const timestampTheme = win
        ? (isColorblindMode ? 'text-zinc-300' : 'text-zinc-300')
        : (isColorblindMode ? 'text-zinc-200' : 'text-zinc-300');

    return (
        <>
            <p className={`${timestampTheme} font-oswald font-light text-base md:text-lg`}>{timestampGameDuration}</p>
        </>
    );
}
export default MatchEnd