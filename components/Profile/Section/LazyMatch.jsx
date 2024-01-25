'use client'
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { ProgressBar } from './Loading';

const Match = dynamic(() => import('./Match/Match'), { loading: () => <ProgressBar></ProgressBar>, ssr: true });

const LazyMatch = ({ matchId, matchHistoryDetails, user }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '400px 0px',
        threshold: 0.1
    });

    return (
        <div ref={ref}>
            {inView && (
                <Match
                    key={`${matchId}`}
                    matchHistoryDetails={matchHistoryDetails}
                    puuid={user.puuid}
                />
            )}
        </div>
    );
};

export default LazyMatch;