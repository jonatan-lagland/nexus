"use server";
import Link from "next/link";
import { Home } from "lucide-react";
import NavSearchBar from "./NavSearchBar";
import SettingsDialog from "./SettingsDialog";

const Nav = () => {
    return (
        <nav className="flex flex-row items-center justify-around w-full">
            <div className="flex flex-grow-0">
                <Link href='/'>
                    <div className="button-hover-animation flex flex-row gap-3">
                        <Home color="white" />
                        <label className="text-white hover:cursor-pointer font-normal text-sm hidden md:block">Home</label>
                    </div>
                </Link>
            </div>
            <div className="flex flex-grow justify-center">
                <NavSearchBar></NavSearchBar>
            </div>
            <div className="flex flex-grow-0">
                <SettingsDialog></SettingsDialog>
            </div>
        </nav>
    );
};

export default Nav;