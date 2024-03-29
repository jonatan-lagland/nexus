'use server'
import DropdownComponent from "./DropdownComponent";
import SearchBarComponent from "./SearchBarComponent";
import Image from "next/image";

export default async function Landing() {
    return (
        <section className="feed">
            <Image
                alt="Ionia Wallpaper"
                src={'/assets/images/yasuo-lor-wallpaper-4k.webp'}
                fill
                priority={true}
                className="top-0 left-0 -z-50 brightness-[0.4] object-cover saturate-[0.8] object-center image-zoom-in">
            </Image>
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl lg:text-8xl drop-shadow-lg  text-white font-oswald">Welcome to Nexus</h1>
                <h2 className="text-xl lg:text-4xl drop-shadow-lg text-[#b07df0] font-oswald">League of Legends Matches, Insights, and Beyond.</h2>
            </div>
            <section className="search max-w-lg flex flex-row items-center justify-center">
                <DropdownComponent></DropdownComponent>
                <SearchBarComponent shouldFocus={true}></SearchBarComponent>
            </section>
        </section>
    );
}