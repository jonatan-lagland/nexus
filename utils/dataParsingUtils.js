/* Remove <> tags from item descriptions */
export const removeHtmlTags = (str) => str.replace(/<[^>]*>/g, '');

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
    const regex = /<\/active>(.*?)<br>/s;
    const matches = regex.exec(description);
    return matches ? matches[1] : '';
}

/* Extract an item's keyword "Passive" description */
export function extractPassiveValue(description) {
    const regex = /<passive>(.*?)<br>/s;
    const matches = regex.exec(description);
    return matches ? matches[1] : '';
}

export const removePassiveNames = (str) => str.replace(/\b\w+:\s*/g, ' ');

/* Format decimal representation to percentage, e.g. 0.5 > 50% */
export function formatPercent(value) {
    return `${Math.round(value * 100)}%`;
}