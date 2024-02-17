import Profile from "@components/Profile/Profile";

export default function Page({ params }) {
    return (
        <Profile params={params} region="americas" server="NA1"></Profile>
    )
}