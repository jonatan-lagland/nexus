"use client";
import SearchBarComponent from '@components/Landing/SearchBarComponent';
import DropdownComponent from '@components/Landing/DropdownComponent';
import { usePathname } from 'next/navigation'

const NavSearchBar = () => {
    const pathname = usePathname()

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