import { useState } from 'react';
import { useRef } from 'react';
import Image from 'next/image';
import {
    useImgPathItem,
} from '@utils/paths';

import Tooltip from '@components/Profile/Section/Tooltip';

function Items({ items, title }) {
    const AVATAR_WIDTH = 64;
    const AVATAR_HEIGHT = 64;

    const imgPath = useImgPathItem();

    const [event, setEvent] = useState(null);
    const [tooltipItem, setTooltipItem] = useState(null);
    const [tooltipitemId, setTooltipItemId] = useState(null);

    const handleMouseHover = (item) => (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setEvent({ type: e.type, currentTargetRect: rect });

        if (e.type === "mouseover") {
            setTooltipItem(item);
            setTooltipItemId(item.id)
        }
        if (e.type === "mouseleave") {
            setTooltipItem(null);
            setTooltipItemId(null);
        }
    };

    if (!imgPath || !items) {
        return (
            <>
                <div className='loader-container'>
                    <div className="loader"></div>
                </div>
            </>
        )
    }

    return (
        <div>
            <div className="title-items">{title}</div>
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
                                itemId={tooltipitemId} />
                        </div>
                        {index < items.length - 1 && <div className='arrow'></div>}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Items;