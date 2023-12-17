import { useState } from 'react';
import { useRef } from 'react';
import Image from 'next/image';
import {
    useImgPathItem,
} from '@utils/paths';

import Tooltip from '@components/Tooltip';

function Items({ items }) {
    const AVATAR_WIDTH = 64;
    const AVATAR_HEIGHT = 64;

    const divRef = useRef(null);

    const imgPath = useImgPathItem();

    const [event, setEvent] = useState(null);
    const [tooltipItem, setTooltipItem] = useState(null);

    const handleMouseHover = (item) => (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setEvent({ type: e.type, currentTargetRect: rect });

        if (e.type === "mouseover") {
            setTooltipItem(item);
        }
        if (e.type === "mouseleave") {
            setTooltipItem(null);
        }
    };

    {/* Ensure image path has been set before data fetching. Ensure items have been mapped. Conditionally render a loader if needed.*/ }

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
            <div className="title-items">Recommended</div>
            <div className="container-items">
                {items.map((item, index) => (
                    <div
                        className='flex flex-row items-center my-1 mx-1 relative'>
                        <div
                            ref={divRef}
                            key={index}
                            onMouseOver={handleMouseHover(item)}
                            onMouseLeave={handleMouseHover(item)}
                            className='flex flex-col'
                        >
                            <Image
                                src={`${imgPath}/${item.image}`}
                                alt={`Item ${item.name}`}
                                width={AVATAR_WIDTH}
                                height={AVATAR_HEIGHT}
                                quality={100}
                                className='object-fit'
                            />
                            <Tooltip
                                item={tooltipItem}
                                event={event}
                                itemId={item.id}
                                ref={divRef} />
                        </div>
                        {index < items.length - 1 && <div className='arrow'></div>}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Items;