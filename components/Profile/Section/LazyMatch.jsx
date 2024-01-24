'use client'
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { ProgressBar } from './Loading';

const Match = dynamic(() => import('./Match/Match'), { loading: () => <ProgressBar></ProgressBar>, ssr: false });

const LazyMatch = ({ matchId, index, matchHistoryDetails, userData }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '100px 0px',
        threshold: 0.1
    });

    return (
        <div ref={ref}>
            {inView && (
                <Match
                    key={`${matchId}${index}`}
                    matchHistoryDetails={matchHistoryDetails}
                    puuid={userData.puuid}
                />
            )}
        </div>
    );
};

export default LazyMatch;