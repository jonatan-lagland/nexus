'use client'
import React from 'react'
import Header from '@components/Profile/Header'
import Section from '@components/Profile/Section/Section'
import Sidebar from '@components/Profile/Sidebar'
import { useContext, Suspense } from 'react'
import { ItemDataContext } from '@utils/context/itemDataContext'
import { ChampionContext } from '@utils/context/championContext'
import Timeout from '@app/timeout'
import Loader from '@components/Other/Loader'

function Profile() {
    const itemData = useContext(ItemDataContext);
    const championData = useContext(ChampionContext);
    const errorProps = (championData && championData.error) ? championData : (itemData && itemData.error) ? itemData : null;

    if (errorProps) {
        return (
            <Timeout error={errorProps}></Timeout>
        )
    }

    return (
        <Suspense fallback={<Loader />}>
            <section className='profile'>
                <section className='grid'>
                    <article>
                        <Header data={championData} />
                    </article>
                    <article className="bg-deep-purple">
                        <Section items={itemData} />
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