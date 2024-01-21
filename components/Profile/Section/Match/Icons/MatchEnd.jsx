'use client'
import { useContext } from "react";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";
import IconGeneric from "./StatIcon";

const MatchEnd = () => {
    const { matchData } = useContext(MatchHistoryContext);
    const { timestampGameDuration } = matchData;
    return (
        <>
            <IconGeneric icon="clock"></IconGeneric>
            <p className={`font-oswald font-light text-base md:text-lg`}>{timestampGameDuration}</p>
        </>
    );
}
export default MatchEnd