'use client'
import React from 'react'
import Header from '@components/Profile/Header/Header'
import Section from '@components/Profile/Section/Section'
import Sidebar from '@components/Profile/Sidebar/Sidebar'
import { useContext, Suspense } from 'react'
import { UserContext } from '@utils/context/userContext'
import Loader from '@components/Other/Loader'

function Profile() {
    const { userData, userInfo, matchHistory, matchHistoryDetails } = useContext(UserContext);

    return (
        <Suspense fallback={<Loader />}>
            <section className='profile'>
                <section className='grid'>
                    <article>
                        <Header data={userData} info={userInfo} />
                    </article>
                    <article className="bg-deep-purple">
                        <Section matchHistory={matchHistory} matchHistoryDetails={matchHistoryDetails} userData={userData} />
                    </article>
                    <article className="bg-deep-purple">
                        <Sidebar />
                    </article>
                </section>
            </section>
        </Suspense>
    )
}
export default Profile