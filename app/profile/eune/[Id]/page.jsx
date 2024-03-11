import Profile from "@components/Profile/Profile";

export async function generateMetadata({ params }) {
    // read route params
    const id = decodeURIComponent(params.Id)

    return {
        title: {
            absolute: `${id}'s Profile - Win Rate, Match History and Live Game`,
            default: 'Nexus'
        },
        description: `Explore ${id}'s League of Legends profile on Nexus! Discover up-to-date win rates, rank divisions, comprehensive match history details, and real-time game insights. Excellent for players seeking to analyze performance and track progress.`,
    }
}

export default function Page({ params }) {
    return (
        <Profile params={params} region="europe" server="EUN1"></Profile>
    )
}