"use client";
import { useState } from "react";
import { ColorblindContext } from "@utils/context/colorBlindContext";

function ColorBlindProvider({ children }) {
    const [isColorblindMode, setIsColorblindMode] = useState(false);

    const toggleColorblindMode = () => {
        setIsColorblindMode(!isColorblindMode);
    };

    return (
        <ColorblindContext.Provider value={{ isColorblindMode, toggleColorblindMode }}>
            {children}
        </ColorblindContext.Provider>
    )
}

export default ColorBlindProvider