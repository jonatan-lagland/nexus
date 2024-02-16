"use client";
import { useState, useEffect } from "react";
import { ColorblindContext } from "@utils/context/colorBlindContext";

function ColorBlindProvider({ children }) {
    // Initialize state with value from local storage
    const [isColorblindMode, setIsColorblindMode] = useState(() => {
        // Check for window and localStorage availability
        if (typeof window !== 'undefined') {
            const localData = localStorage.getItem('colorblindMode');
            return localData ? JSON.parse(localData) : false;
        }
        return false;
    });

    const toggleColorblindMode = () => {
        setIsColorblindMode(!isColorblindMode);
    };

    // Update local storage when state changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('colorblindMode', JSON.stringify(isColorblindMode));
        }
    }, [isColorblindMode]);

    return (
        <ColorblindContext.Provider value={{ isColorblindMode, toggleColorblindMode }}>
            {children}
        </ColorblindContext.Provider>
    )
}

export default ColorBlindProvider