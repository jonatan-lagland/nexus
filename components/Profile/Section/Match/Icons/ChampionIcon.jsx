'use client';
import Image from 'next/image';
import { useImagePathChampion } from '@utils/pathUtils';
import { useChampionTrueNames } from '@utils/championUtils';
import {
    Tooltip,
    TooltipPortal,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"
import { Popover, PopoverPortal, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { renderdataStat } from '../../ItemData';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@components/ui/drawer';
import { Button } from '@components/ui/button';

function Content({ champion }) {
    return (
        <div className="flex flex-col gap-1 text-sm">
            {renderdataStat(champion.stats.attackdamage, 'Attack Damage', 'Attack Damage', champion.stats.attackdamageperlevel)}
            {renderdataStat(champion.stats.attackspeed, 'Attack Speed', 'Attack Speed', champion.stats.attackspeedperlevel)}
            {renderdataStat(champion.stats.attackrange, 'Attack Range', 'Lethality')}
            {renderdataStat(champion.stats.hp, 'Health', 'Health', champion.stats.hpperlevel)}
            {renderdataStat(champion.stats.mp, 'Mana', 'Mana', champion.stats.mpperlevel)}
            {renderdataStat(champion.stats.hpregen, 'Base Health Regen', 'Base Health Regen', champion.stats.hpregen)}
            {renderdataStat(champion.stats.mpregen, 'Base Mana Regen', 'Base Mana Regen', champion.stats.mpregenperlevel)}
            {renderdataStat(champion.stats.armor, 'Armor', 'Armor', champion.stats.armorperlevel)}
            {renderdataStat(champion.stats.spellblock, 'Magic Resistance', 'Magic Resistance', champion.stats.spellblockperlevel)}
            {renderdataStat(champion.stats.movespeed, 'Move Speed', 'Move Speed')}
        </div>
    )
}

function Header({ champion }) {
    return (
        <>
            <h1 className='font-bold text-orange-600'>{champion.name}, {champion.title}</h1>
            <div className='flex flex-row justify-start'>
                <span className='text-neutral-300 text-sm'>Tags:</span>
                <div className='flex flex-row px-6 gap-1'>
                    {champion.tags.map((tag, index) => (
                        <span className=' text-blue-400 text-sm'>{tag}{index === champion.tags.length - 1 ? '' : ','}</span>
                    ))}
                </div>
            </div>
        </>
    )
}

function Avatar({ isOptimized, champion, size, quality, src }) {
    return (
        <div className='rounded-full border border-black bg-slate-900 select-none hover:cursor-pointer'>
            <Image
                unoptimized={isOptimized}
                src={src}
                alt={champion.name}
                width={size}
                height={size}
                quality={quality}
                style={{ clipPath: "inset(5% 5% 5% 5% round 999px)" }}
            />
        </div>
    )
}

function ChampionIcon({ championId, size, tooltipSide }) {
    const champion = useChampionTrueNames(championId);
    const src = useImagePathChampion(championId)
    const quality = size > 70 ? 100 : 10;
    const isOptimized = size > 70 ? false : true;

    return (
        <>
            {champion ? (
                <>
                    <div className='hidden sm:block'>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar
                                    isOptimized={isOptimized}
                                    champion={champion}
                                    size={size}
                                    quality={quality}
                                    src={src}
                                />
                            </PopoverTrigger>
                            <PopoverPortal>
                                <PopoverContent className='bg-black'>
                                    <div className='flex flex-col gap-2'>
                                        <Header champion={champion} />
                                        <Content champion={champion} />
                                    </div>
                                </PopoverContent>
                            </PopoverPortal>
                        </Popover>
                    </div>
                    <div className='block sm:hidden'>
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Avatar
                                    isOptimized={isOptimized}
                                    champion={champion}
                                    size={size}
                                    quality={quality}
                                    src={src}
                                />
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>
                                        <Header champion={champion} />
                                    </DrawerTitle>
                                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                                </DrawerHeader>
                                <DrawerFooter>
                                    <Content champion={champion} />
                                    <DrawerClose>
                                        <Button variant="outline">Cancel</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </>

            ) : (
                /* Used in case there is no champion, e.g. when no champion is banned to avoid creating an unnecessary tooltip */
                <div className='rounded-full border border-black bg-slate-900'>
                    <Image
                        src={src}
                        alt={'No Champion'}
                        width={size}
                        height={size}
                        quality={quality}
                        priority
                        style={{ clipPath: "inset(5% 5% 5% 5% round 999px)" }}
                    />
                </div>
            )}
        </>
    )
}

export default ChampionIcon