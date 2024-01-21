'use client'
import React from 'react';
import { useState } from 'react';
import { MatchHistoryContext } from '@utils/context/matchHistoryContext';

const Provider = ({ children }) => {
    const [matchData, setMatchData] = useState(null);

    return (
        <MatchHistoryContext.Provider value={{ matchData, setMatchData }}>
            {children}
        </MatchHistoryContext.Provider>
    );
};

export default Provider;