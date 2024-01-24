'use server'
import React from 'react'
import Header from '@components/Profile/Header/Header'
import Section from '@components/Profile/Section/Section'
import Sidebar from '@components/Profile/Sidebar/Sidebar'
import ContainerSkeleton from './Section/Loading'
import { Suspense } from 'react'
import { getUserInfo } from '@app/api/userProps'
import { getUserPUUID } from '@app/api/userProps'
import { getMatchHistory } from '@app/api/userProps'
import { getMatchHistoryDetails } from '@app/api/userProps'

async function Profile({ params, region, server }) {
    const userData = await getUserPUUID(params, region);
    const userInfoData = await getUserInfo(userData.puuid, server);
    const matchHistoryData = await getMatchHistory(userData.puuid, region)
    const matchHistoryDetailsData = await getMatchHistoryDetails(matchHistoryData[0], region)
    const [user, userInfo, matchHistory, matchHistoryDetails] = await Promise.all([userData, userInfoData, matchHistoryData, matchHistoryDetailsData])

    return (
        <section className='profile'>
            <section className='grid'>
                <article>
                    <Header data={user} info={userInfo} />
                </article>
                <article>
                    <Suspense fallback={<ContainerSkeleton></ContainerSkeleton>}>
                        <Section matchHistory={matchHistory} matchHistoryDetails={matchHistoryDetails} userData={userData} />
                    </Suspense>
                </article>
                <article className="bg-deep-purple">
                    <Sidebar />
                </article>
            </section>
        </section>
    )
}
export default Profile