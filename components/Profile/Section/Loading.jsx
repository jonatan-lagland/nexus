'use client'

import { Skeleton } from "@components/ui/skeleton";

export const ProgressBar = () => {
    return (
        <div className="flex flex-row justify-center w-full">
            <div className="loader-small"></div>
        </div>
    );
};

const ContainerSkeleton = () => {
    return (
        <section className="profile-grid-section">
            <div>
                <Skeleton className="w-full h-[42px] rounded-t-md bg-deep-purple border-2 border-cosmic-cobalt"></Skeleton >
                <Skeleton className="match w-full lg:h-[165px] h-[270px] lg:ps-2 rounded-b-md bg-deep-purple border-2 border-cosmic-cobalt p-2 gap-4 overflow-hidden">
                    <div className="flex flex-col justify-center items-center gap-3 px-2">
                        <Skeleton className="w-[65px] h-8 rounded-md bg-cosmic-cobalt" />
                        <Skeleton className="w-[75px] h-4 rounded-md bg-cosmic-cobalt" />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4 w-full">
                        <div className="flex flex-row gap-2 justify-center items-center">
                            <Skeleton className="h-[90px] w-[90px] rounded-full bg-cosmic-cobalt" />
                            <Skeleton className="h-[60px] w-[20px] bg-cosmic-cobalt" />
                            <Skeleton className="h-[60px] w-[20px] bg-cosmic-cobalt" />
                            <Skeleton className="w-[90px] h-8 rounded-md bg-cosmic-cobalt" />
                        </div>
                        <div className="w-full justify-center items-center max-w-[350px]">
                            <Skeleton className="h-[40px] w-full bg-cosmic-cobalt" />
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

export const StaticSkeleton = () => {
    return (
        <section className="profile-grid-section">
            <div>
                <div className="w-full h-[42px] rounded-t-md bg-deep-purple border-2 border-cosmic-cobalt"></div >
                <div className="match w-full lg:h-[165px] h-[270px] lg:ps-2 rounded-b-md bg-deep-purple border-2 border-cosmic-cobalt p-2 gap-4 overflow-hidden">
                    <div className="flex flex-col justify-center items-center gap-3 px-2">
                        <div className="w-[65px] h-8 rounded-md bg-cosmic-cobalt" />
                        <div className="w-[75px] h-4 rounded-md bg-cosmic-cobalt" />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4 w-full">
                        <div className="flex flex-row gap-2 justify-center items-center">
                            <div className="h-[90px] w-[90px] rounded-full bg-cosmic-cobalt" />
                            <div className="h-[60px] w-[20px] bg-cosmic-cobalt" />
                            <div className="h-[60px] w-[20px] bg-cosmic-cobalt" />
                            <div className="w-[90px] h-8 rounded-md bg-cosmic-cobalt" />
                        </div>
                        <div className="w-full justify-center items-center max-w-[350px]">
                            <div className="h-[40px] w-full bg-cosmic-cobalt" />
                        </div>
                    </div>
                    <div className="hidden lg:flex flex-row justify-center items-center gap-2 w-full">
                        {[1, 2].map((column) => (
                            <div key={column} className="flex flex-col gap-1">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <div key={index} className="h-[24px] w-[90px] rounded-md bg-cosmic-cobalt" />
                                ))}
                            </div>
                        ))}
                    </div>
                </div >
            </div>
        </section>
    );
};

export default ContainerSkeleton;
