import Profile from "@components/Profile/Profile";
import Provider from "../../Provider";

export default function Page({ params }) {
    return (
        <Provider params={params} region="europe" server="EUW1">
            <Profile></Profile>
        </Provider>
    )
}