import React from 'react';
import Link from 'next/link';

const PageNotFound = () => {
    return (
        <section className='pageNotFound'>
            <div className="flex flex-row flex-grow w-full justify-center items-center">
                <h1 className="text-6xl md:text-9xl font-bold font-oswald drop-shadow-md	 text-cream">404</h1>
                <h2 className="text-4xl ps-4 md:text-7xl md:ps-10 font-bold font-oswald  drop-shadow-md	 text-viola">Page not found</h2>
            </div>
            <div>
                <Link href='/' className='flex gap-2 flex-center'>
                    <h2 className="text-xl md:text-3xl font-bold font-abel ps-6 drop-shadow-md text-dust hover:text-cream">
                        <span className='max-md:hidden'>Click here to return</span>
                        <span className='md:hidden'>Tap here to return</span>
                    </h2>
                </Link>
            </div>
        </section>
    );
};

export default PageNotFound;