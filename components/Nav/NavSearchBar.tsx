"use client";
import DropdownComponent from '@components/Landing/DropdownComponent';
import SearchBarComponent from '@components/Landing/SearchBarComponent';

import { usePathname } from 'next/navigation'

const NavSearchBar = () => {
    const pathname: string = usePathname()

    /* Conditionally render only on /profile page */
    return (
        <div className='flex flex-row w-full lg:w-1/3'>
            {pathname.startsWith('/profile') ?
                <>
                    <DropdownComponent></DropdownComponent>
                    <SearchBarComponent></SearchBarComponent>
                </>
                : null}
        </div>
    );
};

export default NavSearchBar;