import Items from './Items';
import ItemDataContext from '@utils/itemDataContext';
import { useContext } from 'react';
import { useItemData } from '@utils/item'

function Section() {

    /* TODO: FOR TESTING PURPOSES ONLY. Remove placeholders after full integration with Rio API. */
    const populateAP = ["223087", "223124", "3006", "3115", "223089", "223157"];
    const items = useContext(ItemDataContext);


    const { apData } = useItemData(populateAP);

    return (
        <section className="profile-grid-section">
            <Items items={items} title="Recommended" />
            <Items items={apData} title="AP" />
        </section>
    );
}

export default Section;