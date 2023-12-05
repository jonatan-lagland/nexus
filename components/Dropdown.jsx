'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
    useOptionSelect,
    useDropdownClick,
    useClickOutsideDropdown
} from '@utils/searchBarUtils';


const Dropdown = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const dropDownArrowSrc = '/assets/icons/dropdown.svg';
    const DROPDOWN_MENU_ICON_WIDTH = 30;
    const DROPDOWN_MENU_ICON_HEIGHT = 30;
    const DROPDOWN_ARROW_WIDTH = 20;
    const DROPDOWN_ARROW_HEIGHT = 20;

    const handleOptionSelect = useOptionSelect(setSelectedOption, setDropdownVisible, options);
    const handleDropdownClick = useDropdownClick(setDropdownVisible, isDropdownVisible);
    useClickOutsideDropdown(dropdownRef, setDropdownVisible, isDropdownVisible);

    return (
        /* Renders the selected dropdown option as its value, alongside a dropdown icon. By default the value is the first option.*/
        <section className="relative">
            <section
                tabIndex="0"
                ref={dropdownRef}
                onClick={handleDropdownClick}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        // If user tabs into the selection, enter or space bar can be pressed to choose the option
                        handleDropdownClick();
                    }
                }}
                className={`dropdown`}
                style={{ userSelect: 'none' }}
            >
                <span>{selectedOption.value}</span>

                {/* Arrow icon for the dropdown menu. It rotates upside down whenever the dropdown is opened.*/}
                <Image
                    className={`
                        ${isDropdownVisible ? 'rotate-180' : 'transform-none'}`}
                    src={dropDownArrowSrc}
                    alt='Dropdown'
                    width={DROPDOWN_ARROW_WIDTH}
                    height={DROPDOWN_ARROW_HEIGHT}
                />
            </section>

            {/* The menu and its corresponding items that appears when dropdown is opened*/}
            {/* Visibility of the dropdown is handled in CSS by changing the classname*/}
            <section
                ref={dropdownRef}
                className={`dropdown_menu my-1
                          ${isDropdownVisible ? '' : 'dropdown_hidden'}`}
            >
                {isDropdownVisible && (
                    <ul>
                        {options.map((option) => (
                            <li
                                tabIndex="0"
                                key={option.value}
                                className="dropdown_link"
                                onClick={() => handleOptionSelect(option)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        // If user tabs into the selection, enter or space bar can be pressed to choose the option
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
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </section>
    );
};

export default Dropdown
