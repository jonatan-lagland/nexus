'use client';

import Header from '@components/Profile/Header'
import Section from '@components/Profile/Section'
import Sidebar from '@components/Profile/Sidebar'
import { useParams } from 'next/navigation'
import { useChampionData } from '@utils/champion';
import { useItemData } from '@utils/item'

const Profile = () => {
    const { championData, error } = useChampionData(useParams().Id);
    const populateItems = ["3020", "7013", "4645", "223089", "223157", "223135"];
    const { itemData } = useItemData(populateItems);

    return (
        <section className='profile'>
            { /* Render a loader while champion data is being fetched */}
            {championData ? (
                <section className='grid grid-cols-1 grid-rows-4 gap-2 lg:grid-rows-3 lg:grid-cols-5 lg:gap-4 mx-auto w-full min-h-screen'>
                    <article className="row-span-1 lg:row-span-1 lg:col-span-5">
                        <Header data={championData}></Header>
                    </article>
                    <article className="bg-deep-purple row-span-2 lg:row-span-2 lg:col-span-3">
                        <Section items={populateItems} />
                    </article>
                    <article className="bg-deep-purple row-span-1 lg:row-span-2 lg:col-span-2">
                        <Sidebar></Sidebar>
                    </article>
                </section>
            ) : (
                <div className="loader mx-auto w-full max-w-2xl flex justify-center items-center"></div>
            )}
        </section>
    )
}

export default Profile