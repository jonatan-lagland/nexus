'use client'
import React from 'react';
import { useState } from 'react';
import { MatchHistoryContext } from '@utils/context/matchHistoryContext';

/* Context provider used when rendering details for a single match history card component  */

const MatchProvider = ({ children }) => {
    const [matchData, setMatchData] = useState(null);

    return (
        <MatchHistoryContext.Provider value={{ matchData, setMatchData }}>
            {children}
        </MatchHistoryContext.Provider>
    );
};

export default MatchProvider;