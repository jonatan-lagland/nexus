'use client';

import Header from '@components/Profile/Header'
import Section from '@components/Profile/Section/Section'
import Sidebar from '@components/Profile/Sidebar'
import { useParams } from 'next/navigation'
import { useChampionData } from '@utils/champion';
import { useItemData } from '@utils/item'
import ItemDataContext from '@utils/itemDataContext';
import { useErrorHandler } from '@utils/errorUtils';

const Profile = () => {
    const { championData, error } = useChampionData(useParams().Id);
    const errorHandler = useErrorHandler(error);
    const populateItems = ["3026", "223111", "223152", "6694", "223107", "223142"];
    const { itemData } = useItemData(populateItems);

    if (errorHandler) { return (errorHandler) }

    if (!championData) {
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

    return (
        <section className='profile'>
            <section className='grid'>
                <article>
                    <Header data={championData}></Header>
                </article>
                <article className="bg-deep-purple">
                    <ItemDataContext.Provider value={itemData}>
                        <Section />
                    </ItemDataContext.Provider>
                </article>
                <article className="bg-deep-purple">
                    <Sidebar></Sidebar>
                </article>
            </section>
        </section>
    )
}
export default Profile