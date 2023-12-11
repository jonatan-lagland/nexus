'use client';
import { useEffect } from 'react';
import path from '@data/imgPath.json';

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

/* Makes the dropdown menu visible if the user types something in the input field. */
/* Hides the dropdown menu if the input field is empty or gets erased by user. */
/* Filters the options based on the input of the user. */
/* First letter is given priority. E.g. If user types the letter "S" the first result needs to be "Samira" not "Ak(s)han" /*
/* If the search is an exact match, the match is given THE HIGHEST PRIORITY and is sorted on top. 
    E.g. typing "Vi" makes it so the champion Vi has precedence over Viktor, even though 
    Viktor would normally be first on the list. */


export const useSearchBarChange = (options, setDropdownVisible, setFilteredOptions) => (inputValue) => {
    const MAX_LIMIT_OF_RESULTS = 3;
    try {
        const sortedOptions = options
            .map(option => ({
                ...option,
                // COMBINEDSTRING: Take both .label and .value into consideration (e.g. "Ksante" and "K'sante" are both valid)
                combinedString: `${option.value.toLowerCase()} ${option.label.toLowerCase()}`,
                priority: option.label.toLowerCase().startsWith(inputValue.toLowerCase()) ? 2 : 1,
                match: option.combinedString === inputValue.toLowerCase()
            }))
            .sort((a, b) => {
                // Sort in descending order based on priority
                if (a.match) {
                    return -1; // Always prioritize full matches
                } else if (b.match) {
                    return 1;
                } else {
                    return b.priority - a.priority;
                }
            });

        const filteredOptions = sortedOptions.filter(option =>
            option.combinedString.includes(inputValue.toLowerCase())
        ).slice(0, MAX_LIMIT_OF_RESULTS);

        setFilteredOptions(inputValue !== '' && sortedOptions.length > 0 ? filteredOptions : []);
        setDropdownVisible(inputValue !== '' && sortedOptions.length > 0);
    } catch (err) {
        console.log(err);
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

export const useImgPath = (setImgPath) => {
    useEffect(() => {
        setImgPath(`${path.address}/${path.cdn}/${path.patch}/${path.folder}/${path.champion}`);
    }, [])
}
