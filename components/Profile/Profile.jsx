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
import HistoryCarouselProvider from '@app/HistoryCarouselProvider'

async function Profile({ params, region, server }) {
    const gameVersion = await getLatestVersion();
    const [championList, itemList, runeList, summonerSpellList, queueTypes] = await Promise.all([
        getChampionListProps(gameVersion),
        getItemProps(gameVersion),
        getRuneProps(gameVersion),
        getSummonerSpellProps(),
        getQueueTypes()
    ])

    const user = await getUserPUUID(params, region);
    const userDetails = await getUserInfo(user.puuid, server);
    const [rankedDetails, matchHistory] = await Promise.all([
        getRankedInfo(userDetails.id, server),
        getMatchHistory(user.puuid, region)
    ])

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
                <MatchHistoryProvider matchHistory={matchHistory} rankedDetails={rankedDetails} user={user} userDetails={userDetails}> {/* Set initial data of Match History */}
                    <LiveGameProvider>
                        <HistoryCarouselProvider user={user} userDetails={userDetails} server={server}>
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
                        </HistoryCarouselProvider>
                    </LiveGameProvider>
                </MatchHistoryProvider>
            </StaticDataProvider>
        </QueryProvider>
    )
}
export default Profile