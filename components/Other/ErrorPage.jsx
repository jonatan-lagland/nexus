'use client'
import React from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function ErrorPage({ error, reset }) {

    const router = useRouter();

    const handleButtonClick = () => {
        if (reset) {
            reset();
        } else {
            router.push('/'); // Redirect to home page
        }
    };

    return (
        <section className='pageNotFound'>
            <div>
                <div className="flex flex-row w-full items-center justify-center">
                    <Image
                        src={`/assets/images/sleepy_poro.png`}
                        alt={`Sleepy Poro Sticker`}
                        width={256}
                        height={256}
                        className="w-32 h-32 md:w-64 md:h-64"
                    />
                    <h2 className="text-4xl ps-4 md:text-7xl md:ps-10 font-bold font-oswald  drop-shadow-md	 text-viola">
                        {error.reason}
                    </h2>
                </div>
                <div className="text-center">
                    <span className="text-2xl md:text-4xl font-abel drop-shadow-md text-stone-400">
                        {error.error}
                    </span>
                </div>
            </div>
            <div>
                <button
                    className="btn_default"
                    onClick={handleButtonClick}
                >
                    {reset ? 'Refresh' : 'Return'}
                </button>
            </div>
        </section>
    )
}
