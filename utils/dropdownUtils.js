'use client';
import { useEffect } from 'react';

/* Whenever user clicks anywhere on the document, hide the dropdown menu in question. */

export const useClickOutsideDropdown = (dropdownRef, setDropdownVisible, isDropdownVisible) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };
        if (isDropdownVisible) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownVisible]);
};

/* Toggles the visibility of a dropdown menu when clicked to either visible or invisible, depending on state. */

export const useDropdownClick = (setDropdownVisible, isDropdownVisible) => {
    const handleDropdownClick = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    return handleDropdownClick;
};

/* Set the label of the dropdown menu to whatever user picks and hide dropdown. */

export const useDropdownSelection = (setSelectedOption, setDropdownVisible) => (option) => {
    setSelectedOption(option);
    setDropdownVisible(false);
};