'use server'
import React from 'react'
import Header from '@components/Profile/Header/Header'
import Section from '@components/Profile/Section/Section'
import Sidebar from '@components/Profile/Sidebar/Sidebar'
import ContainerSkeleton from './Section/Loading'
import { StaticDataProvider } from '@app/StaticDataProvider'

import { Suspense } from 'react'
import { getUserInfo } from '@app/api/userProps'
import { getUserPUUID } from '@app/api/userProps'
import { getChampionListProps } from '@app/api/championProps'
import { getItemProps } from '@app/api/itemProps'
import { getRuneProps } from '@app/api/runeProps'
import { getLatestVersion } from '@app/api/latestVersion'

async function Profile({ params, region, server }) {
    const [championListData, itemListData, runeListData, gameVersionData] = await Promise.all([
        getChampionListProps(),
        getItemProps(),
        getRuneProps(),
        getLatestVersion(),
    ])

    const userData = await getUserPUUID(params, region);
    const userDetailsData = await getUserInfo(userData.puuid, server);
    const [user, userDetails] = await Promise.all([userData, userDetailsData])

    const data = {
        championListData,
        itemListData,
        runeListData,
        gameVersionData,
    };

    return (
        <StaticDataProvider data={data}>
            <section className='profile'>
                <section className='grid'>
                    <article>
                        <Header user={user} userDetails={userDetails} />
                    </article>
                    <article>
                        <Suspense fallback={<ContainerSkeleton></ContainerSkeleton>}>
                            <Section user={user} region={region} />
                        </Suspense>
                    </article>
                    <article className="bg-deep-purple">
                        <Sidebar />
                    </article>
                </section>
            </section>
        </StaticDataProvider>
    )
}
export default Profile