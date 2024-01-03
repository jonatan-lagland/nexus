import Items from './Items';
import { ItemDataContext } from '@utils/itemDataContext';
import { useContext } from 'react';

function Section() {
    const recommended = useContext(ItemDataContext);
    return (
        <section className="profile-grid-section">
            <Items items={recommended} title="Recommended" />
        </section>
    );
}

export default Section;