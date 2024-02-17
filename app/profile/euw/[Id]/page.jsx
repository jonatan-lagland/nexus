import Profile from "@components/Profile/Profile";

export default function Page({ params }) {
    return (
        <Profile params={params} region="europe" server="EUW1"></Profile>
    )
}
