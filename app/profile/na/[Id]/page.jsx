import Profile from "@components/Profile/Profile";
import Provider from "../../Provider";

export default function Page({ params }) {
    return (
        <Provider params={params} region="americas" server="NA1">
            <Profile></Profile>
        </Provider>
    )
}