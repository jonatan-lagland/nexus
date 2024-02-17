'use server'
import Header from '@components/Profile/Header/Header'
import Section from './Section/Section'
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
                        <section className='profile'>
                            <section className='grid'>
                                <article>
                                    <Header rankedDetails={rankedDetails} user={user} region={region} server={server} userDetails={userDetails} />
                                </article>
                                <article>
                                    <Section user={user} region={region} />
                                </article>
                                <article>
                                    <Sidebar rankedDetails={rankedDetails} />
                                </article>
                            </section>
                        </section>
                    </LiveGameProvider>
                </MatchHistoryProvider>
            </StaticDataProvider>
        </QueryProvider>
    )
}
export default Profile