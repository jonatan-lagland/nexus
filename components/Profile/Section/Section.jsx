'use client'
import LazyMatch from './LazyMatch';
import MatchProvider from './Match/MatchProvider';
import { useFetchMatchHistoryData } from '@app/api/matchHistoryProps';
import { useRouter } from 'next/navigation'
import useDelayedToast from '@utils/toastUtils';
import { AlertDialogRateLimit } from '@components/ui/alerts';

function Section({ user, region }) {
    const { matchHistory, matchHistoryDetails, error, setError } = useFetchMatchHistoryData(user, region)
    const router = useRouter()
    // In the event of a rate limit, show a toast
    const showToast = useDelayedToast(matchHistory, matchHistoryDetails);

    if (!matchHistory || !matchHistoryDetails) {
        return (
            <div className="profile-grid-section h-full w-full justify-center items-center">
                <div className='loader-lg'></div>
                {showToast && <AlertDialogRateLimit></AlertDialogRateLimit>}
            </div>
        )
    }

    // Refresh page if fetch fails ( very likely due to rate limits with Riot API )
    if (error) {
        setError(null);
        router.refresh();
    }

    // "LazyMatch" is a component that is made out of the "Match" component. Allows dynamic loading of content when the user scrolls. 
    return (
        <section className="profile-grid-section">
            {matchHistory.map((matchId) => {
                // Find the match details for the current matchId in the nested structure
                const matchDetails = matchHistoryDetails.find(details => details.metadata.matchId === matchId);
                return (
                    <MatchProvider key={`${matchId}`}>
                        <LazyMatch
                            matchId={matchId}
                            matchHistoryDetails={matchDetails} // Pass the specific match details
                            user={user}
                        />
                    </MatchProvider>
                );
            })}
        </section>
    );
}
export default Section;