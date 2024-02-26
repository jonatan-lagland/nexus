import Profile from "@components/Profile/Profile";

export default function Page({ params }) {
    return (
        <Profile params={params} region="asia" server="PH2"></Profile>
    )
}