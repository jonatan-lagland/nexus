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
    }, [dropdownRef, inputRef, setDropdownVisible, isDropdownVisible]);
};



/**
 * @deprecated Was used to sort a list of champions. Could be refractored to work with user suggestions instead.
 */

/* Hide the dropdown menu if the input field is empty or gets erased by user.  */
/* If field is not empty, sort and filter the options based on the input of the user.  */
export const useSearchBarChange = (options, inputValue, setFilteredOptions, setDropdownVisible) => {
    useEffect(() => {
        if (!inputValue) {
            setDropdownVisible(false);
            setFilteredOptions([]);
            return;
        }
        if (!options) {
            return;
        }

        /* COMBINEDSTRING:      Combine label and ID so both can be used in search, e.g. "Reksai" and "Rek'sai" are both valid inputs. */
        /* ISMATCH:             If user types the exact name, e.g. "Vi", make it have precedence over other champs that start with "Vi" like "Viktor". */
        /* STARTSWITHINPUT:     Prioritize the first letter, e.g. If user types the letter "S" the first result needs to be "Samira" not "Ak(s)han. */

        const MAX_LIMIT_OF_RESULTS = 3;
        const augmentedOptions = options.map(option => {
            const combinedString = `${option.id.toLowerCase()} ${option.name.toLowerCase()}`;
            const isMatch = combinedString === inputValue.toLowerCase();
            const startsWithInput = option.name.toLowerCase().startsWith(inputValue.toLowerCase());

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

/* Set the value of the selected option based on what user clicks in the dropdown menu */

export const useOptionClick = (setSelectedOption, setDropdownVisible) => {
    return (option) => {
        setSelectedOption(option);
        setDropdownVisible(false); // Hide dropdown after selection
    };
};

/* Set the value of the selected user */

export const useKeyPress = (filteredOptions, inputValue, region, setSelectedOption) => {
    const regions = {
        NA: "NA1",
        EUW: "EUW",
        EUNE: "EUNE",
        OCE: "OCE",
        KR: "KR1",
        JP: "JP1",
        BR: "BR1",
        LAS: "LAS",
        LAN: "LAN",
        RU: "RU1",
        TR: "TR1",
        SG: "SG2",
        PH: "PH2",
        TW: "TW2",
        VN: "VN2",
        TH: "TH2"
    };

    return (e) => {
        e.preventDefault();
        if (filteredOptions.length > 0) {
            setSelectedOption(filteredOptions[0].value); // Set first option on dropdown list
            return;
        }
        if (inputValue.includes("-")) {
            setSelectedOption(inputValue); // Default value if no previous options found
            return;
        }
        if (inputValue.includes("#")) {
            const modifiedInput = inputValue.replace(/#/g, "-");
            setSelectedOption(modifiedInput); // Replace # with - for API purposes
            return;
        }
        if (!inputValue.includes("-") && !inputValue.includes("#")) {
            const regionCode = regions[region]
            setSelectedOption(inputValue + "-" + regionCode); // If user doesn't set a tag like #0000, use #EUW, #NA, etc. by default
            return;
        }
    }
};

/* Make the input field in question become focused on page load. */

export const useFocusInput = (inputRef, shouldFocus) => {
    useEffect(() => {
        if (inputRef.current && shouldFocus) {
            inputRef.current.focus();
        }
    }, [inputRef, shouldFocus]);
};
