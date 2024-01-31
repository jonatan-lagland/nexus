'use client';

import { createContext, useContext, useState } from 'react';

export const SearchBarContext = createContext(null);

export default function SearchBarContextProvider({ children }) {
    const [selectedOption, setSelectedOption] = useState('');

    return (
        <SearchBarContext.Provider value={[
            selectedOption, setSelectedOption
        ]}>
            {children}
        </SearchBarContext.Provider>
    );
}

export function useSearchBarContext() {
    const context = useContext(SearchBarContext);
    if (!context) {
        throw new Error(
            "useSearchBarContext must be used within a SearchBarContextProvider"
        );
    }
    return context;
}