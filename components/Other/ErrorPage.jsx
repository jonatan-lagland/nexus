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
                        width={128}
                        height={128}
                        className='select-none'
                    />
                    <h2 className="text-4xl ps-4 md:text-5xl md:ps-10 font-bold font-oswald text-center drop-shadow-md	 text-viola">
                        {error.reason}
                    </h2>
                </div>
                <div className="text-center">
                    <span className="md:text-xl font-abel drop-shadow-md text-stone-300">
                        {error.error}
                    </span>
                </div>
            </div>
            <div>
                <button
                    className="border-2 rounded-full bg-zinc-700 text-2xl font-abel py-1 px-4 text-stone-300 border-stone-500 hover:bg-zinc-600 md:px-4 md:text-xl"
                    onClick={handleButtonClick}
                >
                    {reset ? 'Refresh' : 'Return'}
                </button>
            </div>
        </section>
    )
}
