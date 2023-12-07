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

/* Makes the dropdown menu visible if the user types something in the input field. */
/* Hides the dropdown menu if the input field is empty or gets erased by user. */
/* Filters the options based on the input of the user.*/
/* If the search is an exact match, the match is given priority of 1 in the list. 
    E.g. typing "Vi" makes it so the champion Vi has precedence over Viktor, even though 
    Viktor would normally be first on the list. */

export const useSearchBarChange = (options, setDropdownVisible, setInputTextField, setFilteredOptions) => (inputValue) => {
    const MAX_LIMIT_OF_RESULTS = 3;
    console.log("was set")

    const sortedOptions = options
        .map(option => ({
            ...option,
            // Calculate a priority based on full name match
            priority: option.label.toLowerCase() === inputValue.toLowerCase() ? 1 : 0
        }))
        .sort((a, b) => b.priority - a.priority) // Sort in descending order based on priority

    const filteredOptions = sortedOptions.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
    ).slice(0, MAX_LIMIT_OF_RESULTS);

    setFilteredOptions(inputValue !== '' && sortedOptions.length > 0 ? filteredOptions : []);
    setDropdownVisible(inputValue !== '' && sortedOptions.length > 0);
    setInputTextField(inputValue);
};



/* Toggles the visibility of a dropdown menu when clicked to either visible or invisible, depending on state. */

export const useDropdownClick = (setDropdownVisible, isDropdownVisible) => {
    const handleDropdownClick = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    return handleDropdownClick;
};

/* If the user clicks on the search icon or presses enter, picks the first option on the list as selection */
// FIXME: FilteredOptions is assigned the value of an unknown function when mounting for some reason??? Workaround is to verify the type as an array

export const useOptionSelect = (filteredOptions, setSelectedOption) => {
    useEffect(() => {
        if (filteredOptions.length > 0 && Object.prototype.toString.call(filteredOptions) === '[object Array]') {
            const firstOptionValue = filteredOptions[0].label.toLowerCase();
            setSelectedOption(firstOptionValue);
        }
    }, [filteredOptions]);
};

/* Makes the input field in question become focused on page load. */

export const useFocusInput = (inputRef) => {
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);
};
