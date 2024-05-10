'use client'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Card,
    CardContent
} from '@components/ui/card'
import { useContext } from 'react'
import { ProfileAvatar } from '@components/ui/profileAvatar'
import { HistoryCarouselContext } from '@utils/context/historyCarouselContext'
import { SettingsContext } from '@utils/context/settingsContext'
import { MatchHistoryContext } from '@utils/context/matchHistoryContext'
import Link from 'next/link'
import { Info } from 'lucide-react';

function HistoryCarousel() {
    const { historyCarousel } = useContext(HistoryCarouselContext)
    const { isAllowHistory } = useContext(SettingsContext)
    const { user } = useContext(MatchHistoryContext)

    if (!isAllowHistory || historyCarousel.length <= 1) { // Length 1 because the current page is counted even though it wont be rendered
        return (
            <div className='flex flex-col items-center justify-between gap-2 rounded-lg py-4 border border-neutral-800 bg-dark-grey'>
                <div className='flex flex-col items-center'>
                    <div className='flex flex-row gap-4 justify-center items-center'>
                        <Info aria-label='info-recently-viewed' color="#6e7178" size={24} strokeWidth={1.5} />
                        <div className='flex flex-col'>
                            <span className='text-neutral-200 text-sm'>Recently viewed</span>
                            <span className='text-neutral-400 text-sm'>
                                {isAllowHistory ? 'The profiles you see show up here' : 'Go to settings to enable this feature'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center justify-between gap-4 py-4 rounded-lg border border-neutral-700 bg-dark-grey overflow-hidden'>
            <span className='text-gray-200 text-sm px-6 w-full'>Recently viewed</span>
            <hr className="h-px border-none w-full bg-neutral-700"></hr>
            <div className='flex flex-col items-center gap-3 justify-center rounded-lg border-slate-600'>
                <Carousel
                    opts={{
                        align: "center",
                        loop: false,
                        dragFree: true
                    }}
                    className="w-full max-w-sm"
                >
                    <CarouselContent>
                        {/* Reverse array to correctly order the matches on carousel */}
                        {historyCarousel && historyCarousel.slice().reverse().map((entry, index) => (
                            user.puuid !== entry.user.puuid && ( // Do not render the currently viewed page as a card
                                <CarouselItem key={index} className="basis-auto">
                                    <Link href={`/profile/${entry.server}/${entry.user.gameName}-${entry.user.tagLine}`}>
                                        <Card className='bg-inherit backdrop-brightness-110 py-1 border-zinc-800' >
                                            <CardContent className="select-none flex flex-col items-center justify-evenly">
                                                <ProfileAvatar userDetails={entry.userDetails} size={64} renderSummonerLevel={false}></ProfileAvatar>
                                                <span className="text-base font-semibold text-white">{entry.user.gameName}</span>
                                                <span className="text-sm font-semibold text-gray-400">#{entry.user.tagLine}</span>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </CarouselItem>
                            )))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    )
}

export default HistoryCarousel