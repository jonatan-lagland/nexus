'use client'
import LazyMatch from './LazyMatch';
import MatchProvider from './Match/MatchProvider';
import { useFetchMatchHistoryData } from '@app/api/matchHistoryProps';

function Section({ user, region }) {
    const { matchHistory, matchHistoryDetails } = useFetchMatchHistoryData(user, region)

    if (!matchHistory || !matchHistoryDetails) {
        return null;
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


