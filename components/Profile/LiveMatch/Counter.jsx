import React from 'react'
import { useLiveGameTimer } from '@utils/liveGameUtils';

function Counter({ gameStartTime }) {
    const { time, formatTime } = useLiveGameTimer(gameStartTime);

    if (!formatTime || !time) {
        return null;
    }

    return (
        <span className="text-white">{formatTime(time.minutes)}:{formatTime(time.seconds)}</span>
    )
}

export default Counter