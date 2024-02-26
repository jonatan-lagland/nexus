'use client'
/* Remove <> tags from item descriptions */
export const removeHtmlTags = (str) => str.replace(/<[^>]*>|{[^}]*}|[{}]/g, '');
export const removeActivePassiveTags = (str) => {
    return str.replace(/<active>.*?<\/active>|<passive>.*?<\/passive>/gs, ' ');
};

export const removeTimers = (str) => {
    return str.replace(/\(0s\)/g, '');
};

/* Extract a generic value, e.g. passive name */
export function extractValue(description, tag) {
    const regex = new RegExp(`<${tag}>(.*?)</${tag}>`, 'gi');
    const matches = regex.exec(description);
    return matches ? matches[1] : '';
}

/* Extract a stat value that is not included as a damageMod, e.g. Tenacity */
export function extractStatValue(description, statName) {
    const regex = new RegExp(`<stats>.*?(<buffedStat>|<attention>)(\\d+%?)<\\/(buffedStat|attention)> ${statName}.*?<\\/stats>`, 's');
    const matches = regex.exec(description);
    return matches ? matches[2] : '';
}

/* Extract an item's keyword "Active" description */
export function extractActiveValue(description) {
    const regex = /<\/active>(.*?)<\/mainText>/s;
    const matches = regex.exec(description);
    return matches ? matches[1] : '';
}

/* Extract an item's keyword "Passive" description */
export function extractPassiveValue(description) {
    const regex = /<\/passive>(.*?)(<active>|<\/mainText>)/s;
    const matches = regex.exec(description);
    return matches ? matches[1] : '';
}

// Description: Removes all text that end in ":", e.g. "Winter's Bite:" in an attempt to remove passive names
// RegEx: Removes all text up to the last period before a colon (:) and including the colon itself, while keeping the period and everything after it.
export const removePassiveNames = (str) => {
    if (!str) {
        return "";
    }
    // Split the string at each colon
    const segments = str.split(':');

    // Process each segment to keep the part after the colon and before the next period
    const processedSegments = segments.map((segment, index) => {
        if (index === 0) return ''; // Skip the first segment as it's before the first colon
        return segment.split('.')[0].trim(); // Take the text before the first period
    }).filter(Boolean); // Remove any empty strings

    // Join the processed segments, adding a period and space between each
    const newStr = processedSegments.join('. ') + '.';
    return newStr;
};

/* Format decimal representation to percentage, e.g. 0.5 > 50% */
export function formatPercent(value) {
    return `${Math.floor(value * 100)}%`;
}