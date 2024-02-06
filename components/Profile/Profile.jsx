'use server'
import React from 'react'
import Header from '@components/Profile/Header/Header'
import Section from '@components/Profile/Section/Section'
import Sidebar from '@components/Profile/Sidebar/Sidebar'
import { StaticDataProvider } from '@app/StaticDataProvider'
import { getUserInfo, getUserPUUID, getRankedInfo } from '@app/api/userProps'
import { getChampionListProps } from '@app/api/championProps'
import { getItemProps } from '@app/api/itemProps'
import { getRuneProps } from '@app/api/runeProps'
import { getLatestVersion } from '@app/api/latestVersion'
import { QueryProvider } from '@app/api/QueryClientProvider'
import { getMatchHistory } from '@app/api/userProps'
import { MatchHistoryProvider } from '@app/MatchHistoryProvider'

async function Profile({ params, region, server }) {

    const gameVersion = await getLatestVersion();

    const [championList, itemList, runeList] = await Promise.all([
        getChampionListProps(gameVersion),
        getItemProps(gameVersion),
        getRuneProps(gameVersion)
    ])

    const userData = await getUserPUUID(params, region);
    const userDetailsData = await getUserInfo(userData.puuid, server);
    const rankedDetailsData = await getRankedInfo(userDetailsData.id, server);
    const matchHistoryData = await getMatchHistory(userData.puuid, region);
    const [user, userDetails, rankedDetails, matchHistory] = await Promise.all([userData, userDetailsData, rankedDetailsData, matchHistoryData])

    const data = {
        championList,
        itemList,
        runeList,
        gameVersion,
    };

    return (
        <QueryProvider>
            <StaticDataProvider data={data}>
                <MatchHistoryProvider matchHistory={matchHistory}> {/* Set initial data of Match History */}
                    <section className='profile'>
                        <section className='grid'>
                            <article>
                                <Header user={user} userDetails={userDetails} rankedDetails={rankedDetails} region={region} />
                            </article>
                            <article>
                                <Section user={user} region={region} />
                            </article>
                            <article className="bg-deep-purple">
                                <Sidebar rankedDetails={rankedDetails} />
                            </article>
                        </section>
                    </section>
                </MatchHistoryProvider>
            </StaticDataProvider>
        </QueryProvider>
    )
}
export default Profile