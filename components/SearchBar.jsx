'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from "react";
import {
    useKeyPress,
    useOptionClick,
    useSearchBarChange,
    useFocusInput,
    useClickOutsideInputField,
} from '@utils/searchBarUtils';

const SearchBar = ({ url, placeholder, options }) => {

    const ICON_WIDTH = 20;
    const ICON_HEIGHT = 20;
    const inputRef = useRef(null);
    const router = useRouter();
    const [inputValue, setInputValue] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [filteredOptions, setFilteredOptions] = useState("");
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const DROPDOWN_MENU_ICON_WIDTH = 75;
    const DROPDOWN_MENU_ICON_HEIGHT = 75;

    /* 
        * HANDLESEARCHBARCHANGE         = When user types in the input field
        * HANDLEOPTIONCLICK             = When user clicks on an option from the dropdown menu
        * HANDLEKEYPRESS                = When user presses enter to submit the form
        * USEFOCUSINPUT                 = Focus input bar on component mount
        * USECLICKOUTSIDEINPUTFIELD     = Hide dropdown when user clicks outside the input field
    */

    const handleOptionClick = useOptionClick(setSelectedOption, setDropdownVisible);
    const handleKeyPress = useKeyPress(filteredOptions, setSelectedOption);
    useSearchBarChange(options, inputValue, setFilteredOptions, setDropdownVisible);
    useFocusInput(inputRef);
    useClickOutsideInputField(dropdownRef, inputRef, setDropdownVisible, isDropdownVisible);


    /* Redirected user to a page after selection */
    useEffect(() => {
        if (selectedOption.length > 0) {
            router.push(`${url}/${selectedOption}`)
        }
    }, [selectedOption, router, url]);

    return (
        <>

            { /* Input field */}
            <form
                className="relative w-full"
                onSubmit={handleKeyPress}>
                <input
                    ref={inputRef}
                    type='text'
                    placeholder={placeholder}
                    required
                    className={"search_input w-full"}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                />

                { /* Dropdown menu, each item containing a thumbnail and a link */}
                {/* Visibility of the dropdown is handled in CSS by changing the classname*/}
                <section
                    ref={dropdownRef}
                    className={`dropdown_menu
                              ${isDropdownVisible ? '' : 'dropdown_hidden'}`}
                >


                    {isDropdownVisible && (
                        <ul className="dropdown_items">
                            { /* Conditionally render a title based on available results */}
                            {filteredOptions.length === 0 ? (
                                <span className="dropdown_title">No results found.</span>
                            ) : (
                                <>
                                    <span className="dropdown_title">Top result</span>
                                    <hr className="dropdown_horizontal_line" />

                                    { /* Render a list of items */}
                                    {filteredOptions.map((option, index) => (
                                        <li key={option.name}>
                                            <div
                                                onClick={() => handleOptionClick(option.id)}
                                                className="dropdown_link hover:bg-gray-200 flex items-center"
                                                tabIndex="0"
                                            >
                                                <Image
                                                    className="border-2 border-dark-grey w-12 h-12 md:w-16 md:h-16"
                                                    src={option.path}
                                                    width={DROPDOWN_MENU_ICON_WIDTH}
                                                    height={DROPDOWN_MENU_ICON_HEIGHT}
                                                    alt={option.name}
                                                />
                                                <span className="search-list-item">{option.name}</span>
                                            </div>
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
                <div
                    className="search-icon p-3"
                    onClick={handleKeyPress}>
                    <Image
                        src='/assets/icons/magnifying_glass.svg'
                        alt='dropdown'
                        width={ICON_WIDTH}
                        height={ICON_HEIGHT}
                    />
                </div>
            </form>
        </>
    )
}

export default SearchBar;