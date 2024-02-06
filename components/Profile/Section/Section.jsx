'use client'
import MatchProvider from './Match/MatchProvider';
import { AlertDialogRateLimit } from '@components/ui/alerts';
import ContainerSkeleton, { StaticSkeleton } from './Loading';
import Match from './Match/Match';
import { useMatchHistoryUtils } from '@utils/matchHistoryUtils';
import { useContext } from 'react';
import { MatchHistoryContext } from '@utils/context/matchHistoryContext';


function Section({ user, region }) {
    const { matchHistoryData } = useContext(MatchHistoryContext)
    const { data, ref, alert, inView } = useMatchHistoryUtils(matchHistoryData, region)

    /* Render an array of skeleton containers until X amount of pages are loaded in */
    if (!data || !data.pages || data.pages.length < 4) {
        return (
            <>
                {alert && <AlertDialogRateLimit></AlertDialogRateLimit>} {/* Alert user when rate limit has been reached */}
                <section className="profile-grid-section">
                    {[...Array(20)].map((_, index) => (
                        <ContainerSkeleton key={index}></ContainerSkeleton>
                    ))}
                </section>
            </>
        )
    }

    /* Render all "pages". One page is equal to one match in a player's match history. */
    /* The term "page" is used in context of useInfiniteQuery hook that enables infinite scroll of matches */
    return (
        <section className="profile-grid-section">
            {alert && <AlertDialogRateLimit></AlertDialogRateLimit>} {/* Alert user when rate limit has been reached */}
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
                        inView ? <ContainerSkeleton key={i} /> : <StaticSkeleton key={i} />
                    ))}
                </div>
                {/* Render up to 20 skeletons, depending on the amount of pages remaining*/}
            </div>
        </section>
    );
}
export default Section;