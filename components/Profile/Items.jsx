import { useState } from 'react';
import Image from 'next/image';
import {
    useImgPathItem,
} from '@utils/paths';
import { useTooltipHandlers } from '@utils/tooltipUtils';

import Tooltip from '@components/Tooltip';

function Items({ items }) {
    const AVATAR_WIDTH = 64;
    const AVATAR_HEIGHT = 64;
    const [imgPath, setImgPath] = useState("");
    useImgPathItem(setImgPath);

    const {
        tooltipItem,
        showTooltip,
        tooltipPosition,
        handleItemMouseOver,
        handleItemMouseOut
    } = useTooltipHandlers();

    return (
        <>
            {/* Ensure image path has been set before data fetching. Ensure items have been mapped. Conditionally render a loader if needed.*/}

            <div className="container-blue">
                <div className="title-recommended">Recommended</div>
                <div className="container-blue-light p-3 flex flex-wrap relative max-w-xl justify-evenly">
                    {imgPath && items ? (
                        items.map((item, index) => (
                            <div key={index} className='flex flex-col items-center relative mx-1 my-1'>
                                <div className='flex flex-row items-center'>
                                    <div
                                        className='flex flex-col'
                                        onMouseOver={(e) => handleItemMouseOver(e, item)}
                                        onMouseOut={handleItemMouseOut}
                                    >
                                        <Image
                                            src={`${imgPath}/${item.image}`}
                                            alt={`Item ${item.name}`}
                                            width={AVATAR_WIDTH}
                                            height={AVATAR_HEIGHT}
                                            quality={100}
                                            className='object-fit'
                                        />
                                        {/* Conditionally render a tooltip when an image is hovered. */}
                                        {showTooltip && tooltipItem && tooltipItem.id === item.id && (
                                            <Tooltip
                                                item={tooltipItem}
                                                style={{ left: tooltipPosition.x, top: tooltipPosition.y }} />
                                        )}
                                    </div>
                                    {index < items.length - 1 && <div className='arrow'></div>}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='loader-container'>
                            <div className="loader"></div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );


}

export default Items;