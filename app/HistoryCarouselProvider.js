"use client";
import { useState, useEffect } from "react";
import { HistoryCarouselContext } from "@utils/context/historyCarouselContext";
import { usePathname } from "next/navigation";

function HistoryCarouselProvider({ children, userDetails, user }) {
    // Initialize state with value from local storage

    const path = usePathname()

    const [historyCarousel, setHistoryCarousel] = useState(() => {
        // Check for window and localStorage availability
        if (typeof window !== 'undefined') {
            const localData = localStorage.getItem('historyCarousel');
            return localData ? JSON.parse(localData) : [];
        }
        return false;
    });

    // Update local storage when state changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('historyCarousel', JSON.stringify(historyCarousel));
        }
    }, [historyCarousel]);


    /* Whenever user navigates to a new page, add a new entry to history state */
    useEffect(() => {
        const lastIndex = path.lastIndexOf("/");
        // Find the index of the "/" before the last one
        const secondLastIndex = path.lastIndexOf("/", lastIndex - 1);
        // Extract the part of the string between these two positions
        const server = path.substring(secondLastIndex + 1, lastIndex);

        setHistoryCarousel((prevHistory) => {
            const index = prevHistory.findIndex(entry => entry.user.puuid === user.puuid);

            // If the user is already in history, remove that entry to add it at the end
            let updatedHistory = prevHistory;
            if (index > -1) {
                updatedHistory.splice(index, 1);
            }

            updatedHistory = [...updatedHistory, { userDetails, user, server }];

            // Ensure the history does not exceed 5 entries
            while (updatedHistory.length > 5) {
                updatedHistory.shift(); // Remove the oldest entry
            }

            return updatedHistory;
        });
    }, [userDetails, user, path]);

    return (
        <HistoryCarouselContext.Provider value={{ historyCarousel }}>
            {children}
        </HistoryCarouselContext.Provider>
    )
}

export default HistoryCarouselProvider