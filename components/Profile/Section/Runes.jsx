import React from 'react'
import Image from 'next/image';
import Tooltip from './Tooltip';

function Runes({ runes, title }) {

    const AVATAR_WIDTH = 64;
    const AVATAR_HEIGHT = 64;

    const imgPath = useImgPathItem();
    const { handleMouseHover, tooltipItemId, event } = useItemHover();

    if (!imgPath || !runes) {
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
                {runes.map((item, index) => (
                    <div
                        key={index}
                        className='flex flex-row items-center my-1 mx-1 relative'>
                        <div
                            key={runes[index]}
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
                                data={runes[index]}
                                event={event}
                                itemId={tooltipItemId} />
                        </div>
                        {index < runes.length - 1 && <div className='arrow'></div>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Runes