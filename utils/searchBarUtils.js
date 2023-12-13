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


/* Hides the dropdown menu if the input field is empty or gets erased by user. */
/* Filters the options based on the input of the user. */

export const useSearchBarChange = (options, setDropdownVisible, setFilteredOptions) => (inputValue) => {
    const MAX_LIMIT_OF_RESULTS = 3; // Maximum number of results to display

    try {

        /* COMBINEDSTRING:      Combine label and ID so both can be used in search, e.g. "Reksai" and "Rek'sai" are both valid */
        /* ISMATCH:             If user types the exact name, e.g. "Vi", make it have precedence over other champs that start with Vi like Viktor*/
        /* STARTSWITHINPUT:     Prioritize the first letter, e.g. If user types the letter "S" the first result needs to be "Samira" not "Ak(s)han*/

        // Augment options with combinedString, priority, and match properties
        const augmentedOptions = options.map(option => {
            const combinedString = `${option.value.toLowerCase()} ${option.label.toLowerCase()}`;
            const isMatch = combinedString === inputValue.toLowerCase();
            const startsWithInput = option.label.toLowerCase().startsWith(inputValue.toLowerCase());

            return {
                ...option,
                combinedString,
                // Prioritize options that start with the input value
                priority: startsWithInput ? 2 : 1,
                // Check for an exact match
                match: isMatch
            };
        });

        // Sort options based on priority and match
        const sortedOptions = augmentedOptions.sort((a, b) => {
            if (a.match) return -1; // Exact matches get the highest priority
            if (b.match) return 1;
            return b.priority - a.priority; // Sort by priority (startsWithInput)
        });

        // Filter and limit the sorted options
        const filteredOptions = sortedOptions.filter(option =>
            option.combinedString.includes(inputValue.toLowerCase())
        ).slice(0, MAX_LIMIT_OF_RESULTS);

        // Update state based on filtered options, set to an empty array if no match. Toggle dropdown visibility.
        const shouldDisplayDropdown = inputValue !== '' && sortedOptions.length > 0;
        setFilteredOptions(shouldDisplayDropdown ? filteredOptions : []);
        setDropdownVisible(shouldDisplayDropdown);
    } catch (err) {
        console.error('Error in useSearchBarChange:', err);
    }
};




/* Sets the value of the selected option based on what user clicks in the dropdown menu*/

export const useOptionClick = (setSelectedOption) => (option) => {
    setSelectedOption(option);
};

/* Sets the value of the selected option as the top item from the dropdown menu*/

export const useKeyPress = (filteredOptions, setSelectedOption) => (e) => {
    e.preventDefault();
    if (filteredOptions.length > 0) {
        setSelectedOption(filteredOptions[0].value);
    }
}

/* Makes the input field in question become focused on page load. */

export const useFocusInput = (inputRef) => {
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);
};
