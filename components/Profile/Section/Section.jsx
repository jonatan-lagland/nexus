import Items from './Items';
import Match from './Match';

function Section({ matchHistory, matchHistoryDetails, userData }) {

    if (!matchHistory || !matchHistoryDetails || !userData) {
        return null;
    }

    return (
        <section className="profile-grid-section">
            {matchHistory.map(matchId => (
                <Match
                    key={matchId}
                    matchHistoryDetails={matchHistoryDetails}
                    puuid={userData.puuid}
                />
            ))}
        </section>
    );
}

export default Section;

