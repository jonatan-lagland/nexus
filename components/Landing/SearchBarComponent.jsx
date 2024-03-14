'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useRef, useState } from "react";
import {
    useKeyPress,
    useSearchBarChange,
    useFocusInput,
    useClickOutsideInputField,
} from '@utils/searchBarUtils';
import { RegionContext } from "@utils/context/regionContext";
import { useContext } from "react";
import { Search } from "lucide-react";

const SearchBarComponent = ({ shouldFocus = false, options }) => {
    const inputRef = useRef(null);
    const router = useRouter();
    const [inputValue, setInputValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState("");
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const { region } = useContext(RegionContext)
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

    const handleKeyPress = useKeyPress(filteredOptions, inputValue, region, router);
    useSearchBarChange(options, inputValue, setFilteredOptions, setDropdownVisible);
    useFocusInput(inputRef, shouldFocus);
    useClickOutsideInputField(dropdownRef, inputRef, setDropdownVisible, isDropdownVisible);

    return (
        <>

            { /* Input field */}
            <form
                className="relative w-full flex flex-row items-center justify-center"
                onSubmit={handleKeyPress}>
                <input
                    ref={inputRef}
                    type='search'
                    spellCheck="false"
                    placeholder={`Name #${region}`}
                    required
                    className={"flex h-10 w-full rounded-none border-e-none border-y border-zinc-700 bg-inherit backdrop-blur-md backdrop-saturate-50 backdrop-brightness-75 px-3 py-2 text-sm text-white placeholder:text-gray-300"}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                />

                { /* Dropdown menu, each item containing a thumbnail and a link */}
                {/* Visibility of the dropdown is handled in CSS by changing the classname*/}
                <div
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
                                                //onClick={() => handleOptionClick(option.id)}
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
                </div>

                { /* Search icon placed inside the input field */}
                <button
                    type="submit"
                    className="flex flex-row items-center justify-center hover:cursor-pointer border-e border-y px-3 border-zinc-700 bg-inherit backdrop-blur-md backdrop-saturate-50 backdrop-brightness-75 h-10 rounded-e-full rounded-y-full"
                    onSubmit={handleKeyPress}>
                    <Search type="submit" size={20} color="white" />
                </button>
            </form>
        </>
    )
}

export default SearchBarComponent;