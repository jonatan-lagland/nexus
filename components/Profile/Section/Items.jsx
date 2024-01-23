import Image from 'next/image';
import { useImagePathItem } from '@utils/pathUtils';
import { useItemHover } from '@utils/tooltipUtils';
import Tooltip from '@components/Profile/Section/Tooltip';
import { useIsTrinketItem } from '@utils/itemUtils';

function Items({ items, visionScore }) {

    if (!items) {
        return null;
    }

    return (
        <div>
            <div className="container-items">
                {items.map((item, index) => (
                    <div key={index} className='flex flex-row items-center my-1 mx-1 relative'>
                        <ItemComponent
                            item={item}
                            visionScore={visionScore}
                        />
                        {index < items.length - 1 && <div className='arrow'></div>}
                    </div>
                ))}
            </div>
        </div>
    );
}

function ItemComponent({ item, visionScore }) {
    const imgPath = useImagePathItem(item);
    const { handleMouseHover, tooltipItemId, event } = useItemHover();
    const AVATAR_WIDTH = 40;
    const AVATAR_HEIGHT = 40;
    const isTrinket = useIsTrinketItem(item.name)

    return (
        <div
            key={item}
            className='flex flex-col border border-slate-950 overflow-hidden'
            style={{ width: AVATAR_WIDTH, height: AVATAR_HEIGHT }}
        >
            {isTrinket && (
                <div className='vision-score-container'>
                    <span className='select-none'>{visionScore}</span>
                </div>
            )}
            {imgPath && (
                <Image
                    className='select-none'
                    onMouseOver={handleMouseHover(item.id)}
                    onMouseLeave={handleMouseHover(item.id)}
                    src={imgPath}
                    alt={`${item.name}`}
                    width={AVATAR_WIDTH}
                    height={AVATAR_HEIGHT}
                />
            )}
            {imgPath && (
                <Tooltip
                    data={item}
                    event={event}
                    itemId={tooltipItemId}
                    dataType={"item"} />
            )}
            <div
                className='bg-inherit backdrop-brightness-50'
                style={{ width: AVATAR_WIDTH, height: AVATAR_HEIGHT }}
            ></div>
        </div>
    );

}

export default Items;