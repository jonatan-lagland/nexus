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
import Link from 'next/link'

function HistoryCarousel() {

    const { historyCarousel } = useContext(HistoryCarouselContext)

    return (
        <Carousel
            opts={{
                align: "center",
                loop: false,
                dragFree: true
            }}
            className="w-full max-w-sm p-6"
        >
            <CarouselContent>
                {/* Reverse array to correctly order the matches */}
                {historyCarousel && historyCarousel.slice().reverse().map((entry, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
                        {/* Assuming `playerPath` can be derived from `entry.user` or `entry.userDetails` */}
                        <Link href={`/profile/${entry.server}/${entry.user.gameName}-${entry.user.tagLine}`}>
                            <Card className='bg-deep-purple border flex flex-col items-center justify-center border-gray-600 break-all text-vw min-h-[170px]'>
                                <CardContent className="flex flex-col aspect-square items-center justify-center p-1 select-none">
                                    {/* Make sure ProfileAvatar can accept userDetails and renderSummonerLevel as props */}
                                    <ProfileAvatar userDetails={entry.userDetails} renderSummonerLevel={false}></ProfileAvatar>
                                    <span className="text-base font-semibold text-white">{entry.user.gameName}</span>
                                    <span className="text-sm font-semibold text-gray-400">#{entry.user.tagLine}</span>
                                </CardContent>
                            </Card>
                        </Link>
                    </CarouselItem>
                ))}
                {/* Optionally handle empty states or less than 5 entries with placeholders or a message */}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default HistoryCarousel