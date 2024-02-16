"use server";
import Link from "next/link";
import { Home } from "lucide-react";

const Nav = () => {
    return (
        /* ----Website Logo---- */
        <nav className="flex flex-row items-center justify-around w-full">
            <div className="flex flex-grow-0">
                <Link href='/'>
                    <div className="button-hover-animation flex flex-row gap-3">
                        <Home color="white" />
                        <span className="text-white font-bold hidden md:block">Home</span>
                    </div>
                </Link>
            </div>
            <div className="flex flex-grow justify-center">

            </div>
            <div className="flex flex-grow-0">

            </div>
        </nav>
    );
};

export default Nav;