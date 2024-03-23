"use client";
import { useState, useEffect } from "react";
import { SettingsContext } from "@utils/context/settingsContext";

function SettingsProvider({ children }) {
    // Initialize state with value from local storage
    const [isColorblindMode, setIsColorblindMode] = useState(() => {
        // Check for window and localStorage availability
        if (typeof window !== 'undefined') {
            const localData = localStorage.getItem('colorblindMode');
            return localData ? JSON.parse(localData) : false;
        }
        return false;
    });

    const [isAllowHistory, setIsAllowHistory] = useState(() => {
        // Check for window and localStorage availability
        if (typeof window !== 'undefined') {
            const localData = localStorage.getItem('history');
            return localData ? JSON.parse(localData) : false;
        }
        return false;
    });

    const [collapseMenu, setCollapseMenu] = useState(true);


    const toggleHistory = () => {
        setIsAllowHistory(!isAllowHistory);
    };

    const toggleColorblindMode = () => {
        setIsColorblindMode(!isColorblindMode);
    };

    const toggleCollapseMenu = () => {
        setCollapseMenu(!collapseMenu);
    }

    // Update local storage when state changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('colorblindMode', JSON.stringify(isColorblindMode));
            localStorage.setItem('history', JSON.stringify(isAllowHistory));
        }
    }, [isColorblindMode, isAllowHistory]);


    return (
        <SettingsContext.Provider value={{ isColorblindMode, toggleColorblindMode, isAllowHistory, toggleHistory, collapseMenu, toggleCollapseMenu }}>
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsProvider