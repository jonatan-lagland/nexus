'use server'

export const ProgressBar = () => {
    return (
        <div className="flex flex-row justify-center">
            <div className="loader-small"></div>
        </div>
    );
};

const ContainerSkeleton = () => {
    return (
        <section className="profile-grid-section">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="w-full lg:h-[205px] md:h-[415px] h-[415px] bg-deep-purple">
                    <div className="shimmer-effect"></div>
                </div>
            ))}
        </section>
    );
};

export default ContainerSkeleton;
