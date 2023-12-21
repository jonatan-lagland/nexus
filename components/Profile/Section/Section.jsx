import Items from './Items';
import ItemDataContext from '@utils/itemDataContext';
import { useContext } from 'react';
import { useItemData } from '@utils/item'

function Section() {

    /* TODO: FOR TESTING PURPOSES ONLY. Remove placeholders after full integration with Riot API. */
    const populateAP = ["223087", "223124", "3006", "3115", "223089", "223157"];
    const populateHybrid = ["223095", "223124", "3006", "3085", "223089", "223026"];
    const populateAD = ["226672", "226675", "3006", "3046", "223072", "3036"];


    const { itemData: ap } = useItemData(populateAP);
    const { itemData: hybrid } = useItemData(populateHybrid);
    const { itemData: ad } = useItemData(populateAD);
    const recommended = useContext(ItemDataContext);

    return (
        <section className="profile-grid-section">
            <Items items={hybrid} title="Recommended" />
            <Items items={ap} title="Ability Power" />
            <Items items={ad} title="Attack damage" />
        </section>
    );
}

export default Section;