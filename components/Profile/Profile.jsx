'use server'
import Header from '@components/Profile/Header/Header'
import Content from './Section/Content'
import Sidebar from '@components/Profile/Sidebar/Sidebar'
import { StaticDataProvider } from '@app/StaticDataProvider'
import { getUserInfo, getUserPUUID, getRankedInfo } from '@app/api/userProps'
import { getChampionListProps } from '@app/api/championProps'
import { getItemProps } from '@app/api/itemProps'
import { getRuneProps, getSummonerSpellProps } from '@app/api/spellProps'
import { getLatestVersion, getQueueTypes } from '@app/api/gameData'
import { QueryProvider } from '@app/QueryClientProvider'
import { getMatchHistory } from '@app/api/userProps'
import { MatchHistoryProvider } from '@app/MatchHistoryProvider'
import { LiveGameProvider } from '@app/LiveGameProvider'
import LiveGameLoading from './Header/LiveGameLoading'

async function Profile({ params, region, server }) {
    const gameVersion = await getLatestVersion();
    const queueTypes = await getQueueTypes();
    const [championList, itemList, runeList, summonerSpellList] = await Promise.all([
        getChampionListProps(gameVersion),
        getItemProps(gameVersion),
        getRuneProps(gameVersion),
        getSummonerSpellProps()
    ])

    const user = await getUserPUUID(params, region);
    const userDetails = await getUserInfo(user.puuid, server);
    const rankedDetails = await getRankedInfo(userDetails.id, server);
    const matchHistory = await getMatchHistory(user.puuid, region);

    const data = {
        championList,
        itemList,
        runeList,
        summonerSpellList,
        queueTypes,
        gameVersion,
    };

    return (
        <QueryProvider>
            <StaticDataProvider data={data}>
                <MatchHistoryProvider matchHistory={matchHistory} rankedDetails={rankedDetails}> {/* Set initial data of Match History */}
                    <LiveGameProvider>
                        <div className='w-full h-2'>
                            <LiveGameLoading></LiveGameLoading>
                        </div>
                        <div className='profile'>
                            <div className='grid'>
                                <section>
                                    <Header rankedDetails={rankedDetails} user={user} region={region} server={server} userDetails={userDetails} />
                                </section>
                                <section>
                                    <Content user={user} region={region} />
                                </section>
                                <section>
                                    <Sidebar rankedDetails={rankedDetails} />
                                </section>
                            </div>
                        </div>
                    </LiveGameProvider>
                </MatchHistoryProvider>
            </StaticDataProvider>
        </QueryProvider>
    )
}
export default Profile