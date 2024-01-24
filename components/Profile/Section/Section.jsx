import LazyMatch from './LazyMatch';
import Provider from './Match/Provider';

function Section({ matchHistory, matchHistoryDetails, userData }) {
    return (
        <section className="profile-grid-section">
            {matchHistory.map((matchId, index) => (
                <Provider key={`${matchId}${index}`}>
                    <LazyMatch
                        matchId={matchId}
                        index={index}
                        matchHistoryDetails={matchHistoryDetails}
                        userData={userData}
                    />
                </Provider>
            ))}
        </section >
    );
}
export default Section;


