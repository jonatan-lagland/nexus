'use client';
import { useEffect } from 'react';

/* Whenever user clicks anywhere on the document, hide the dropdown menu in question, UNLESS the click is on the input menu itself */

export const useClickOutsideInputField = (dropdownRef, inputRef, setDropdownVisible, isDropdownVisible) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !inputRef.current.contains(event.target)) {
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

/* Makes the dropdown menu visible if the user types something on the input field. */
/* Hides the dropdown menu if the input field is empty or gets erased by user. */
/* Filters the options based on the input of the user */

export const useSearchBarChange = (inputValue, options, setDropdownVisible, setInputTextField, setFilteredOptions) => {
    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
    setDropdownVisible(inputValue !== '' ? true : false);
    setInputTextField(inputValue);
};


/* Toggles the visibility of a dropdown menu when clicked to either visible or invisible, depending on state. */

export const useDropdownClick = (setDropdownVisible, isDropdownVisible) => {
    const handleDropdownClick = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    return handleDropdownClick;
};

/* Saves the value of the selected item in a dropdown menu and hides the menu from view after selection. */

export const useOptionSelect = (setSelectedOption, setDropdownVisible) => (option) => {
    setSelectedOption(option);
    setDropdownVisible(false);
};

/* Makes the input field in question become focused on page load. */

export const useFocusInput = (inputRef) => {
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);
};
