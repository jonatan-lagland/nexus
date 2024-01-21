import Match from './Match/Match';
import Provider from './Match/Provider';

function Section({ matchHistory, matchHistoryDetails, userData }) {

    if (!matchHistory || !matchHistoryDetails || !userData) {
        return null;
    }

    return (
        <section className="profile-grid-section">
            {matchHistory.map((matchId, index) => (
                <Provider key={`${matchId}${index}`}>
                    <Match
                        matchHistoryDetails={matchHistoryDetails}
                        puuid={userData.puuid}
                    />
                </Provider>
            ))}
        </section>
    );
}

export default Section;

