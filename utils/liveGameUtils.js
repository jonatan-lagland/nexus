import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

export function useLiveGameTooltip(isLoading, isGameFound, hasClicked) {
    const [showTooltip, setShowTooltip] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        // Clear any existing timer when the button is clicked and hide the tooltip
        if (hasClicked) {
            clearTimeout(timerRef.current);
            setShowTooltip(false);
        }

        // When user clicks button, loading finishes and no game is found, show the tooltip
        if (!isLoading && !isGameFound && hasClicked) {
            setShowTooltip(true);
            // Hide tooltip after timer runs out
            timerRef.current = setTimeout(() => setShowTooltip(false), 4000);
        }

        // Cleanup function to clear the timer
        return () => clearTimeout(timerRef.current);
    }, [isLoading, isGameFound, hasClicked]);

    return showTooltip;
}

export function useLiveGameTimer(gameStartTime) {
    // useCallback to prevent function from being re-created every render
    const calculateTime = useCallback(() => {
        const currentTime = Date.now(); // Current time in milliseconds
        const elapsedSeconds = Math.floor((currentTime - gameStartTime) / 1000);
        return {
            minutes: Math.floor(elapsedSeconds / 60),
            seconds: elapsedSeconds % 60,
        };
    }, [gameStartTime]);

    const [time, setTime] = useState(calculateTime());

    // Set time interval every second
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(calculateTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [calculateTime]);

    const formatTime = (value) => {
        return value.toString().padStart(2, '0');
    };

    return { time, formatTime }
}

export function useLiveGameDetails(liveGameDetails) {
    return useMemo(() => {
        const { participants, gameMode, gameLength, gameStartTime, bannedChampions, gameQueueConfigId } = liveGameDetails;
        console.log(liveGameDetails)
        return (
            { participants, gameMode, gameLength, gameStartTime, bannedChampions, gameQueueConfigId }
        )
    }, [liveGameDetails]);
}
