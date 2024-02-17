'use client'
import MatchProvider from './Match/MatchProvider';
import { StaticSkeleton } from '../../ui/Loading';
import { MatchSkeleton } from '../../ui/Loading';
import dynamic from 'next/dynamic';
const Match = dynamic(() => import('./Match/Match'), {
    loading: () => <MatchSkeleton></MatchSkeleton>
})
import { useMatchHistoryUtils } from '@utils/matchHistoryUtils';
import { useContext } from 'react';
import { MatchHistoryContext } from '@utils/context/matchHistoryContext';
import NoMatches from '@components/ui/no-matches';

function MatchList({ user, region }) {
    const { matchHistoryData } = useContext(MatchHistoryContext)
    const { data, ref, hasNoMatches, inView } = useMatchHistoryUtils(matchHistoryData, region)

    /* Render if no matches have been played */
    if (hasNoMatches) {
        return (
            <NoMatches></NoMatches>
        )
    }

    /* Render an array of skeleton containers until X amount of pages are loaded in */
    if (!data || !data.pages || data.pages.length < 1) {
        return (
            <>
                <section className="profile-grid-section">
                    {[...Array(20)].map((_, index) => (
                        <MatchSkeleton key={index}></MatchSkeleton>
                    ))}
                </section>
            </>
        )
    }

    /* Render all "pages". One page is equal to one match in a player's match history. */
    /* The term "page" is used in context of useInfiniteQuery hook that enables infinite scroll of matches */
    return (
        <section className="profile-grid-section">
            {data.pages.map((page) => {
                if (!page) return null;
                return (
                    <MatchProvider key={page.metadata.matchId}>
                        <Match
                            key={page.metadata.matchId}
                            matchHistoryDetails={page}
                            puuid={user.puuid}
                        />
                    </MatchProvider>
                );
            })}
            <div>
                <div ref={ref} className="profile-grid-section">
                    {Array(Math.max(20 - data.pages.length, 0)).fill().map((_, i) => (
                        inView ? <MatchSkeleton key={i} /> : <StaticSkeleton key={i} />
                    ))}
                </div>
                {/* Render up to 20 skeletons, depending on the amount of pages remaining*/}
                {/* If not in view, render a static skeleton instead of an animated one */}
            </div>
        </section>
    );
}
export default MatchList;