"use client";
import Link from "next/link";
import Image from "next/image";
const LOGO_HEIGHT = 60;
const LOGO_WIDTH = 60;


const Nav = () => {
    return (
        /* ----Website Logo---- */
        <nav className='h-auto'>
            <Link href='/'>
                <Image
                    src='/assets/images/1439.png'
                    alt='logo'
                    width={LOGO_WIDTH}
                    height={LOGO_HEIGHT}
                    className='object-contain'
                />
            </Link>
        </nav>
    );
};

export default Nav;