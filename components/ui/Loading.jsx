'use client'

import { Skeleton } from "@components/ui/skeleton";

export const ProgressBar = () => {
    return (
        <div className="flex flex-row justify-center w-full">
            <div className="loader-small"></div>
        </div>
    );
};

export const ProgressBarExtraSmall = () => {
    return (
        <div className="flex flex-row justify-center w-full">
            <div className="loader-xs"></div>
        </div>
    );
};

export const ItemsSkeleton = () => {
    <div className='flex flex-row items-center my-1 mx-1 relative'>
        <Skeleton className={'w-[40px] h-[40px] bg-cosmic-cobalt'}></Skeleton>
        <Skeleton className={'w-[40px] h-[40px] bg-cosmic-cobalt'}></Skeleton>
        <Skeleton className={'w-[40px] h-[40px] bg-cosmic-cobalt'}></Skeleton>
        <Skeleton className={'w-[40px] h-[40px] bg-cosmic-cobalt'}></Skeleton>
        <Skeleton className={'w-[40px] h-[40px] bg-cosmic-cobalt'}></Skeleton>
        <Skeleton className={'w-[40px] h-[40px] bg-cosmic-cobalt'}></Skeleton>
        <Skeleton className={'w-[40px] h-[40px] bg-cosmic-cobalt'}></Skeleton>
    </div>
}

const ContainerSkeleton = () => {
    return (
        <section className="profile-grid-section">
            <div>
                <Skeleton className="w-full h-[65px] lg:h-[42px] rounded-t-md bg-deep-purple border-t border-x border-cosmic-cobalt"></Skeleton >
                <Skeleton className="match w-full lg:h-[150px] h-[270px] lg:ps-2 rounded-b-md bg-deep-purple border-b border-x border-cosmic-cobalt p-2 gap-4 overflow-hidden">
                    <div className="flex flex-col justify-center items-center gap-3 px-2">
                        <Skeleton className="w-[65px] h-8 rounded-md bg-cosmic-cobalt" />
                        <Skeleton className="w-[75px] h-4 rounded-md bg-cosmic-cobalt" />
                    </div>
                    <div className="flex flex-col gap-4 p-2 items-center  lg:items-stretch">
                        <div className="flex flex-row lg:gap-0 lg:justify-between gap-12">
                            <div className="flex flex-row gap-2 items-center justify-center">
                                <Skeleton className="h-[80px] w-[80px] rounded-full bg-cosmic-cobalt" />
                                <Skeleton className="h-[60px] w-[20px] bg-cosmic-cobalt" />
                                <Skeleton className="h-[60px] w-[20px] bg-cosmic-cobalt" />
                            </div>
                            <div className="flex items-center justify-center">
                                <Skeleton className="w-[90px] h-8 rounded-md bg-cosmic-cobalt" />
                            </div>
                        </div>
                        <div className="w-full justify-center items-center max-w-[350px]">
                            <Skeleton className="h-[35px] w-full bg-cosmic-cobalt" />
                        </div>
                    </div>
                    <div className="hidden lg:flex flex-row justify-center items-center gap-2 w-full">
                        {[1, 2].map((column) => (
                            <div key={column} className="flex flex-col gap-1">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <Skeleton key={index} className="h-[24px] w-[90px] rounded-md bg-cosmic-cobalt" />
                                ))}
                            </div>
                        ))}
                    </div>
                </Skeleton >
            </div>
        </section>
    );
};

export const MatchSkeleton = () => {
    return (
        <section className="profile-grid-section">
            <div>
                <Skeleton className="w-full h-[65px] lg:h-[42px] rounded-t-md bg-deep-purple border-t border-x border-cosmic-cobalt"></Skeleton >
                <Skeleton className="match w-full lg:h-[150px] h-[270px] lg:ps-2 rounded-b-md bg-deep-purple border border-cosmic-cobalt p-2 gap-4 overflow-hidden">
                </Skeleton >
            </div>
        </section>
    );
};

export const StaticSkeleton = () => {
    return (
        <section className="profile-grid-section">
            <div>
                <div className="w-full h-[65px] lg:h-[42px] rounded-t-md bg-deep-purple border-t border-x border-cosmic-cobalt"></div >
                <div className="match w-full lg:h-[150px] h-[270px] lg:ps-2 rounded-b-md bg-deep-purple border border-cosmic-cobalt p-2 gap-4 overflow-hidden">
                </div >
            </div>
        </section>
    );
};

export default ContainerSkeleton;
