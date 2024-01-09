import { useEffect } from 'react';
import Image from 'next/image';
import {
    useImgPathItem,
} from '@utils/paths';
import { useItemHover } from '@utils/tooltipUtils';
import { ItemDataContext } from '@utils/context/itemDataContext';
import { useContext } from 'react';

import Tooltip from '@components/Profile/Section/Tooltip';

function Items() {
    const AVATAR_WIDTH = 64;
    const AVATAR_HEIGHT = 64;
    const imgPath = useImgPathItem();
    const { handleMouseHover, tooltipItemId, event } = useItemHover();
    const items = useContext(ItemDataContext);

    if (!imgPath || !items) {
        console.log(items)
        return null;
    }

    return (
        <div>
            <div className="title-items">Default</div>
            <div className="container-items">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className='flex flex-row items-center my-1 mx-1 relative'>
                        <div
                            key={items[index]}
                            onMouseOver={handleMouseHover(item)}
                            onMouseLeave={handleMouseHover(item)}
                            className='flex flex-col'
                        >
                            <Image
                                src={`${imgPath}${item.image}`}
                                alt={`Item ${item.name}`}
                                width={AVATAR_WIDTH}
                                height={AVATAR_HEIGHT}
                                className='object-fit'
                            />
                            <Tooltip
                                data={items[index]}
                                event={event}
                                itemId={tooltipItemId} />
                        </div>
                        {index < items.length - 1 && <div className='arrow'></div>}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Items;