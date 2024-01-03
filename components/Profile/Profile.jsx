'use client'
import React from 'react'
import Header from '@components/Profile/Header'
import Section from '@components/Profile/Section/Section'
import Sidebar from '@components/Profile/Sidebar'
import { useChampionData } from "@utils/champion";
import { useItemData } from "@utils/item";
import Timeout from '@app/timeout'

function Profile({ championProps, itemProps }) {

    const populateAP = ["223087", "223124", "3006", "3115", "223089", "223157"];
    const { championData } = useChampionData(championProps);
    const { itemData } = useItemData(populateAP, itemProps);
    const errorProps = (championData && championData.error) ? championData : (itemData && itemData.error) ? itemData : null;

    if (!championData || !itemData) {
        return (
            <section className='profile'>
                <section className='grid'>
                    <article>
                    </article>
                    <article className="bg-deep-purple">
                        <div className='shimmer-effect'></div>
                    </article>
                    <article className="bg-deep-purple">
                        <div className='shimmer-effect'></div>
                    </article>
                </section>
            </section>
        )
    }

    // Render a custom error page if a client error occurs
    if (errorProps) {
        return (
            <Timeout error={errorProps}></Timeout>
        )
    }

    return (
        <section className='profile'>
            <section className='grid'>
                <article>
                    <Header />
                </article>
                <article className="bg-deep-purple">
                    <Section />
                </article>
                <article className="bg-deep-purple">
                    <Sidebar />
                </article>
            </section>
        </section>
    )
}
export default Profile