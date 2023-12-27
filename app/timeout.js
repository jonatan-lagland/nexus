'use client' // Error components must be Client Components

export default function Timeout({ error, reset }) {

    return (
        <section className='pageNotFound'>
            <div className='flex flex-grow flex-col justify-center items-center px-5'>
                <div className="flex flex-row w-full justify-center items-center my-10">
                    <h1 className="text-6xl md:text-9xl font-bold font-oswald drop-shadow-md	 text-cream">408</h1>
                    <h2 className="text-4xl ps-4 md:text-7xl md:ps-10 font-bold font-oswald  drop-shadow-md	 text-viola">Request Timeout</h2>
                </div>
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold font-abel drop-shadow-md text-stone-500">
                        {error && <span>{error.message}</span>}
                    </h2>
                </div>
            </div>
            <div>
                <h2
                    className="text-xl md:text-2xl font-bold font-abel drop-shadow-md text-dust hover:text-cream cursor-pointer"
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    <span className='max-md:hidden'>Click here to refresh the page.</span>
                    <span className='md:hidden'>Tap here to refresh the page.</span>
                </h2>
            </div>
        </section>
    )
}