"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const PFP_HEIGHT = 37;
const PFP_WIDTH = 37;
const LOGO_HEIGHT = 60;
const LOGO_WIDTH = 60;


const SignInButton = (provider, key) => {
    return (
        <button
            type='button'
            key={key}
            onClick={() => {
                signIn(provider.id);
            }}
            className='black_btn'>
            Sign in
        </button>
    )
}

const SignOutButton = () => {
    return (
        <button
            type='button'
            onClick={signOut}
            className='outline_btn'>
            Sign Out
        </button>
    )
}

const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    /* ----Used to hide the dropdown menu whenenever user clicks outside of the dropdown---- */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        // Attach the event listener when the dropdown is visible
        if (isDropdownVisible) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            // Clean up the event listener when the component unmounts or the dropdown is hidden
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownVisible]);

    /*---Dropdown Menu----*/
    const handleProfileClick = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    /* Ran once to setup an authentication provider (Google) for the website */
    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);

    return (
        /* ----Website Logo---- */
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image
                    src='/assets/images/1439.png'
                    alt='logo'
                    width={LOGO_WIDTH}
                    height={LOGO_HEIGHT}
                    className='object-contain'
                />
            </Link>

            {/* ----Desktop Navigation----
          If a session is active, render profile picture, logout button, etc.
          If not, render a login button
      */}
            <>
                {session?.user ? (
                    <>
                        {/* ----Desktop Navigation----*/}
                        <div className='sm:flex hidden gap-3 md:gap-5'>
                            <Link href='/create-prompt' className='black_btn'>
                                Create Post
                            </Link>
                            <SignOutButton />
                            <Link href='/profile'>
                                <Image
                                    src={session?.user.image}
                                    width={PFP_WIDTH}
                                    height={PFP_HEIGHT}
                                    className='rounded-full'
                                    alt='profile'
                                />
                            </Link>
                        </div>

                        {/* ----Mobile Navigation----*/}
                        <div className='sm:hidden flex relative'>
                            <>
                                <Image
                                    href=''
                                    src={session?.user.image}
                                    width={PFP_WIDTH}
                                    height={PFP_HEIGHT}
                                    className={`rounded-full cursor-pointer ${isDropdownVisible ? 'outline outline-offset-2 outline-1' : ''}`}
                                    alt='profile'
                                    onClick={handleProfileClick}
                                />
                                <div
                                    ref={dropdownRef}
                                    className={`dropdown drop-shadow-md transition-transform 
                      ${isDropdownVisible ? '' : 'pointer-events-none translate-y-[-0.75rem] opacity-0 '}`}>
                                    <Link
                                        href='/profile'
                                        className='dropdown_link'>
                                        My Profile
                                    </Link>
                                    <Link
                                        href='/create-prompt'
                                        className='dropdown_link'>
                                        Create Prompt
                                    </Link>
                                    <SignOutButton />
                                </div>
                            </>
                        </div>
                    </>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <>
                                    <SignInButton key={provider.name} provider={provider} />
                                </>
                            ))}

                    </>
                )}
            </>
        </nav>
    );
};

export default Nav;