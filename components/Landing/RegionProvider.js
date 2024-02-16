'use client'
import { RegionContext } from "@utils/context/regionContext";
import { useState } from "react";

export const RegionProvider = ({ children }) => {
    const [region, setRegion] = useState('NA');

    return (
        <RegionContext.Provider value={{ region, setRegion }}>
            {children}
        </RegionContext.Provider>
    )
};