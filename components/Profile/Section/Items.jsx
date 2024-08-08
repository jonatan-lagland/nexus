import Image from 'next/image';

import { useImagePathItem } from '@utils/pathUtils';
import { useIsTrinketItem } from '@utils/itemUtils';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverPortal
} from "@/components/ui/popover"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow,
    TooltipPortal
} from "@/components/ui/tooltip"

import ItemData from './ItemData';

function Items({ items, visionScore, size = 32 }) {

    if (!items) {
        return null;
    }

    return (
        <div>
            <div className="container-items">
                {items.map((item, index) => (
                    <div key={index} className='flex flex-row items-center gap-1 relative'>
                        <ItemComponent
                            size={size}
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

function ItemComponent({ item, visionScore, size }) {
    const imgPath = useImagePathItem(item);
    const AVATAR_WIDTH = size;
    const AVATAR_HEIGHT = size;
    const TRINKET_SIZE = size * 0.75;
    const isTrinket = useIsTrinketItem(item.name)

    return (
        <div
            key={item}
            className='flex flex-col border border-slate-950 overflow-hidden'
            style={{ width: AVATAR_WIDTH, height: AVATAR_HEIGHT }}
        >
            {isTrinket && (
                <div style={{ width: TRINKET_SIZE, height: TRINKET_SIZE }} className='vision-score-container'>
                    <span className='select-none'>{visionScore}</span>
                </div>
            )}
            {imgPath && (
                <TooltipProvider delayDuration={300} skipDelayDuration={300}>
                    <Tooltip>
                        <Popover>
                            <TooltipTrigger asChild>
                                <PopoverTrigger asChild>
                                    <Image
                                        quality={10}
                                        className='select-none hover:cursor-pointer'
                                        src={imgPath}
                                        alt={`${item.name}`}
                                        width={AVATAR_WIDTH}
                                        height={AVATAR_HEIGHT}
                                    />
                                </PopoverTrigger>
                            </TooltipTrigger>
                            <PopoverPortal>
                                <PopoverContent className='bg-black'>
                                    <ItemData data={item}></ItemData>
                                </PopoverContent>
                            </PopoverPortal>
                            <TooltipPortal>
                                <TooltipContent>
                                    <TooltipArrow></TooltipArrow>
                                    <div className=" text-center">
                                        <p>{item.name}</p>
                                        <p className="italic text-zinc-400">Click to learn more</p>
                                    </div>
                                </TooltipContent>
                            </TooltipPortal>
                        </Popover>
                    </Tooltip>
                </TooltipProvider>
            )}
            <div
                className='bg-inherit backdrop-brightness-50'
                style={{ width: AVATAR_WIDTH, height: AVATAR_HEIGHT }}
            ></div>
        </div>
    );

}

export default Items;