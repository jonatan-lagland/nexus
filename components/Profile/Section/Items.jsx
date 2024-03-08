import Image from 'next/image';

import { useImagePathItem } from '@utils/pathUtils';
import { useIsTrinketItem } from '@utils/itemUtils';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"
import { useTooltipVisiblity } from '@utils/tooltipUtils';

import ItemData from './ItemData';

function Items({ items, visionScore }) {

    if (!items) {
        return null;
    }

    return (
        <div>
            <div className="container-items">
                {items.map((item, index) => (
                    <div key={index} className='flex flex-row items-center gap-1 relative'>
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
    const AVATAR_WIDTH = 32;
    const AVATAR_HEIGHT = 32;
    const isTrinket = useIsTrinketItem(item.name)
    const { showTooltip, setShowTooltip } = useTooltipVisiblity();
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
                <TooltipProvider disableHoverableContent={true} delayDuration={300} skipDelayDuration={300}>
                    <Tooltip open={showTooltip}>
                        <TooltipTrigger asChild>
                            <span>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Image
                                            className='select-none hover:cursor-pointer'
                                            src={imgPath}
                                            alt={`${item.name}`}
                                            width={AVATAR_WIDTH}
                                            height={AVATAR_HEIGHT}
                                            onClick={() => setShowTooltip(false)}
                                            onMouseEnter={() => setShowTooltip(true)}
                                            onMouseLeave={() => setShowTooltip(false)}
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent className=' bg-black'>
                                        <ItemData data={item}></ItemData>
                                    </PopoverContent>
                                </Popover>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <TooltipArrow></TooltipArrow>
                            <div className=" text-center">
                                <p>{item.name}</p>
                                <p className="italic text-zinc-400">Click to learn more</p>
                            </div>
                        </TooltipContent>
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