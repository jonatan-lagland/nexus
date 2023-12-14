import { useState } from 'react';
import Image from 'next/image';
import {
    useImgPathItem,
} from '@utils/images';
import { useTooltipHandlers } from '@utils/tooltipUtils';

import Tooltip from '@components/Tooltip';

function Section(props) {
    const AVATAR_WIDTH = 64;
    const AVATAR_HEIGHT = 64;
    const [imgPath, setImgPath] = useState("");

    useImgPathItem(setImgPath);

    const {
        tooltipItem,
        showTooltip,
        tooltipMessage,
        tooltipPosition,
        handleItemMouseOver,
        handleItemMouseOut
    } = useTooltipHandlers();

    return (
        <section className="flex justify-start p-2">
            {imgPath ? (
                <div>
                    <div className="container-blue p-3">
                        <div className="title-recommended">Recommended</div>
                        <div className="container-blue-light p-1 flex flex-wrap relative">
                            {props.items.map((item, index) => (
                                <div key={index} className='flex flex-row items-center relative mx-1 my-1'>
                                    <div
                                        className='flex flex-col'
                                        onMouseOver={(e) => handleItemMouseOver(e, index, `${item}`)}
                                        onMouseOut={handleItemMouseOut}
                                    >
                                        <Image
                                            src={`${imgPath}/${item}.png`}
                                            alt={`Item ${item}`}
                                            width={AVATAR_WIDTH}
                                            height={AVATAR_HEIGHT}
                                            quality={100}
                                            className='object-fit'
                                        />
                                        {showTooltip && tooltipItem === index && (
                                            <Tooltip
                                                message={tooltipMessage}
                                                style={{ left: tooltipPosition.x, top: tooltipPosition.y }} />
                                        )}
                                    </div>
                                    {index < props.items.length - 1 && <span className="arrow-right">&rarr;</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="loader mx-auto w-full max-w-2xl flex justify-center items-center"></div>
            )}
        </section>
    );
}

export default Section;
