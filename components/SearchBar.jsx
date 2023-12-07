'use client';

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
    useOptionSelect,
    useSearchBarChange,
    useFocusInput,
    useClickOutsideInputField
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

    const handleOptionSelect = useOptionSelect(setSelectedOption, setDropdownVisible);
    const handleSearchBarChange = useSearchBarChange(options, setDropdownVisible, setInputTextField, setFilteredOptions);
    useFocusInput(inputRef);
    useClickOutsideInputField(dropdownRef, inputRef, setDropdownVisible, isDropdownVisible);

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
                            { /* Conditionally render a title based on available results */}
                            {filteredOptions.length === 0 ? (
                                <span className="dropdown_title">No results found.</span>
                            ) : (
                                <>
                                    <span className="dropdown_title">Top result</span>
                                    <hr className="dropdown_horizontal_line" />

                                    { /* Render a list of items */}
                                    {filteredOptions.map((option, index) => (
                                        <li key={option.value}>
                                            <Link
                                                href={`${url}/${selectedOption}`}
                                                className="dropdown_link hover:bg-gray-200"
                                                tabIndex="0"
                                                onClick={() => handleOptionSelect(option)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
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
                                            { /* Render a bottom seperator for the top result */}
                                            {index === 0 && <hr className="dropdown_horizontal_line pb-2" />}
                                        </li>
                                    ))}
                                </>
                            )}

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