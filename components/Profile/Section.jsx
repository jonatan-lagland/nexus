import Items from './Items';
import ItemDataContext from '@utils/itemDataContext';
import { useContext } from 'react';

function Section() {
    const items = useContext(ItemDataContext);

    return (
        <section className="flex flex-col justify-center items-center">
            <Items items={items} />
            <Items items={items} />
            <Items items={items} />
            <Items items={items} />
            <Items items={items} />
            <Items items={items} />
            <Items items={items} />
            <Items items={items} />
            <Items items={items} />
        </section>
    );
}

export default Section;