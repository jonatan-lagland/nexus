'use client';

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
    useOptionSelect,
    useSearchBarChange,
    useFocusInput
} from '@utils/searchBarUtils';

const SearchBar = ({ url, placeholder, className, options }) => {

    const ICON_WIDTH = 20;
    const ICON_HEIGHT = 20;
    const inputRef = useRef(null);
    const [inputTextField, setInputTextField] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [filteredOptions, setFilteredOptions] = useState("");
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const DROPDOWN_MENU_ICON_WIDTH = 75;
    const DROPDOWN_MENU_ICON_HEIGHT = 75;

    const handleOptionSelect = useOptionSelect(setSelectedOption, setDropdownVisible, options);
    const handleSearchBarChange = (inputValue) => { useSearchBarChange(inputValue, options, setDropdownVisible, setInputTextField, setFilteredOptions); }
    useFocusInput(inputRef);

    return (
        <>

            { /* Input field */}
            <form className="relative w-full">
                <input
                    ref={inputRef}
                    type='text'
                    placeholder={placeholder}
                    required
                    className={className}
                    value={inputTextField}
                    onChange={(e) => {
                        handleSearchBarChange(e.target.value);
                    }}
                    onClick={(e) => {
                        handleSearchBarChange(e.target.value);
                    }}
                />

                { /* Dropdown menu, each item containing a thumbnail and a link */}
                <section
                    ref={dropdownRef}
                    className={`dropdown_menu w-full my-1
                              ${isDropdownVisible ? '' : 'dropdown_hidden'}`}
                >
                    {isDropdownVisible && (
                        <ul className="w-full p-2">
                            {filteredOptions.map((option) => (
                                <Link href={url}
                                    className="dropdown_link hover:bg-gray-200"
                                    tabIndex="0"
                                    key={option.value}
                                    onClick={() => handleOptionSelect(option)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            // Triggers the option selection when Enter or Space is pressed
                                            handleOptionSelect(option);
                                        }
                                    }}
                                >

                                    <Image
                                        src={option.logo}
                                        width={DROPDOWN_MENU_ICON_WIDTH}
                                        height={DROPDOWN_MENU_ICON_HEIGHT}
                                        alt={option.label}
                                    />
                                    <span>{option.label}</span>
                                </Link>
                            ))}
                        </ul>
                    )}
                </section>

                { /* Search icon placed inside the input field */}
                <Link className="search-icon p-3" href={url}>
                    <Image
                        src='/assets/icons/magnifying_glass.svg'
                        alt='dropdown'
                        width={ICON_WIDTH}
                        height={ICON_HEIGHT}
                    />
                </Link>
            </form>
        </>
    )
}

export default SearchBar;