'use client';

import Image from "next/image";
import { useRef, useState } from "react";
import {
    useDropdownClick,
    useClickOutsideDropdown,
    useDropdownSelection
} from '@utils/dropdownUtils';


const Dropdown = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const DROPDOWN_MENU_ICON_WIDTH = 30;
    const DROPDOWN_MENU_ICON_HEIGHT = 30;
    const DROPDOWN_ARROW_WIDTH = 20;
    const DROPDOWN_ARROW_HEIGHT = 20;

    /* 
        * HANDLEDROPDOWNCLICK           = Toggle dropdown visibility
        * HANDLEDROPDOWNSELECTION       = Save selected option and display the option to user
        * USECLICKOUTSIDEDROPDWON       = Hide dropdown when user clicks outside the dropdown
    */

    const handleDropdownClick = useDropdownClick(setDropdownVisible, isDropdownVisible);
    const handleDropdownSelection = useDropdownSelection(setSelectedOption, setDropdownVisible);
    useClickOutsideDropdown(dropdownRef, setDropdownVisible, isDropdownVisible);

    return (
        /* Renders the selected dropdown option as its value, alongside a dropdown icon. By default the value is the first option.*/
        <section className="relative">
            <div
                tabIndex="0"
                ref={dropdownRef}
                onClick={handleDropdownClick}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        // If user tabs into the selection, enter or space bar can be pressed to choose the option
                        handleDropdownClick();
                    }
                }}
                className={`dropdown select-none`}
            >
                <span>{selectedOption.value}</span>
                {/* Arrow icon for the dropdown menu. Icon rotates upside down whenever the dropdown is opened.*/}
                <Image
                    className={`
                        ${isDropdownVisible ? 'rotate-180' : 'transform-none'}`}
                    src={'/assets/icons/dropdown.svg'}
                    alt='Dropdown'
                    width={DROPDOWN_ARROW_WIDTH}
                    height={DROPDOWN_ARROW_HEIGHT}
                />
            </div>

            {/* The menu and its corresponding items that appears when dropdown is opened*/}
            {/* Visibility of the dropdown is handled in CSS by changing the classname*/}
            <div
                ref={dropdownRef}
                className={`dropdown_menu_small
                          ${isDropdownVisible ? '' : 'dropdown_hidden'}`}
            >
                {isDropdownVisible && (
                    <ul className="min-w-max">
                        {options.map((option) => (
                            <li
                                tabIndex="0"
                                key={option.value}
                                className="dropdown_link"
                                onClick={() => handleDropdownSelection(option)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        // If user tabs into the selection, enter or space bar can be pressed to choose the option
                                        handleDropdownSelection(option);
                                    }
                                }}
                            >
                                <Image
                                    className="h-auto w-auto"
                                    src={option.logo}
                                    width={DROPDOWN_MENU_ICON_WIDTH}
                                    height={DROPDOWN_MENU_ICON_HEIGHT}
                                    alt={option.label}
                                />
                                <p>{option.label}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default Dropdown
