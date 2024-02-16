"use client";
import { usePathname } from "next/navigation";
const Footer = () => {
    const pathname = usePathname()

    const footerPosition = pathname.startsWith("/profile") ? 'relative' : 'absolute bottom-0';

    return (
        <footer className={`${footerPosition} mx-auto py-3 px-3 md:px-12 md:py-8 min-w-full flex flex-col justify-center items-center divide-y-2 divide-neutral-700`}>
            <div></div>
            <span className="pt-3 max-w-8xl text-xs text-neutral-500">
                Nexus is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
            </span>
        </footer>
    );
};

export default Footer;