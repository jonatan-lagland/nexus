'use client'
import { RegionContext } from "@utils/context/regionContext";
import { useState, useEffect } from "react";

/* Requires an additional check for mounting (hasMounted) to prevent hydration errors as the initial value is rendered on server */

export const RegionProvider = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false);
    const [region, setRegion] = useState('NA');

    useEffect(() => {
        setHasMounted(true); // Indicate the component has mounted
        // Now safe to access window and localStorage
        if (typeof window !== 'undefined') {
            const localData = localStorage.getItem('selectedRegion');
            const storedRegion = localData ? JSON.parse(localData) : 'NA';
            setRegion(storedRegion); // Update state with stored value or default
        }
    }, []);

    // Update local storage when region changes, only if component has mounted
    useEffect(() => {
        if (hasMounted && typeof window !== 'undefined') {
            localStorage.setItem('selectedRegion', JSON.stringify(region));
        }
    }, [region, hasMounted]);

    return (
        <RegionContext.Provider value={{ region, setRegion }}>
            {children}
        </RegionContext.Provider>
    )
};