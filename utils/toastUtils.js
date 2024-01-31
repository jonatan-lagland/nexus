import { useEffect, useState } from 'react';

/* Display a toast after 10s if fetch hasn't resolved (likely) due to rate limits */
const useDelayedToast = (matchHistory, matchHistoryDetails, delay = 7000) => {
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        let timeoutId;

        if (!matchHistory || !matchHistoryDetails) {
            // Set a timeout to show the toast after 5 seconds
            timeoutId = setTimeout(() => {
                setShowToast(true);
            }, delay);
        }
        return () => {
            // Clear the timeout if the component unmounts before the delay
            clearTimeout(timeoutId);
        };
    }, [matchHistory, matchHistoryDetails, delay]);

    return showToast;
};
export default useDelayedToast;
