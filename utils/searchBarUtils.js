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



// Augment options with combinedString, priority, and match properties

export const useSearchBarChange = (options, inputValue, setFilteredOptions, setDropdownVisible) => {
    useEffect(() => {
        if (!inputValue) {
            setDropdownVisible(false);
            setFilteredOptions([]);
            return;
        }

        /* COMBINEDSTRING:      Combine label and ID so both can be used in search, e.g. "Reksai" and "Rek'sai" are both valid */
        /* ISMATCH:             If user types the exact name, e.g. "Vi", make it have precedence over other champs that start with Vi like Viktor*/
        /* STARTSWITHINPUT:     Prioritize the first letter, e.g. If user types the letter "S" the first result needs to be "Samira" not "Ak(s)han*/

        const MAX_LIMIT_OF_RESULTS = 3;
        const augmentedOptions = options.map(option => {
            const combinedString = `${option.value.toLowerCase()} ${option.label.toLowerCase()}`;
            const isMatch = combinedString === inputValue.toLowerCase();
            const startsWithInput = option.label.toLowerCase().startsWith(inputValue.toLowerCase());

            return {
                ...option,
                combinedString,
                priority: startsWithInput ? 2 : 1,
                match: isMatch
            };
        });

        const sortedOptions = augmentedOptions.sort((a, b) => {
            if (a.match) return -1;
            if (b.match) return 1;
            return b.priority - a.priority;
        });

        const filteredOptions = sortedOptions.filter(option =>
            option.combinedString.includes(inputValue.toLowerCase())
        ).slice(0, MAX_LIMIT_OF_RESULTS);

        setFilteredOptions(filteredOptions);
        setDropdownVisible(filteredOptions.length > 0);
    }, [inputValue, options, setDropdownVisible, setFilteredOptions]);
};

/* Sets the value of the selected option based on what user clicks in the dropdown menu*/

export const useOptionClick = (setSelectedOption, setDropdownVisible) => {
    return (option) => {
        setSelectedOption(option);
        setDropdownVisible(false); // Hide dropdown after selection
    };
};

/* Sets the value of the selected option as the top item from the dropdown menu*/

export const useKeyPress = (filteredOptions, setSelectedOption) => {
    return (e) => {
        e.preventDefault();
        if (filteredOptions.length > 0) {
            setSelectedOption(filteredOptions[0].value);
        }
    }
};

/* Makes the input field in question become focused on page load. */

export const useFocusInput = (inputRef) => {
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);
};
