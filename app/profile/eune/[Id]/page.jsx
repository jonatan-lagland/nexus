import Profile from "@components/Profile/Profile";

export default function Page({ params }) {
    return (
        <Profile params={params} region="europe" server="EUNE1"></Profile>
    )
}