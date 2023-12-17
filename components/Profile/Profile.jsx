'use client';

import Header from '@components/Profile/Header'
import Section from '@components/Profile/Section'
import Sidebar from '@components/Profile/Sidebar'
import { useParams } from 'next/navigation'
import { useChampionData } from '@utils/champion';
import { useItemData } from '@utils/item'
import ItemDataContext from '@utils/itemDataContext';

const Profile = () => {
    const { championData, error } = useChampionData(useParams().Id);
    const populateItems = ["223089", "223111", "223152", "6694", "223107", "223142"];
    const { itemData } = useItemData(populateItems);

    if (!championData) {
        return (
            <>
                <div className="loader-lg"></div>
            </>
        )
    }

    return (
        <section className='profile'>
            { /* Render a loader while champion data is being fetched */}
            <section className='grid grid-cols-1 grid-rows-4 gap-2 lg:grid-rows-3 lg:grid-cols-5 lg:gap-4'>
                <article className="row-span-1 lg:row-span-1 lg:col-span-5">
                    <Header data={championData}></Header>
                </article>
                <article className="bg-deep-purple row-span-2 lg:row-span-2 lg:col-span-3">
                    <ItemDataContext.Provider value={itemData}>
                        <Section />
                    </ItemDataContext.Provider>
                </article>
                <article className="bg-deep-purple row-span-1 lg:row-span-2 lg:col-span-2">
                    <Sidebar></Sidebar>
                </article>
            </section>
        </section>
    )
}

export default Profile