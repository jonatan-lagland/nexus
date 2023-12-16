import { useState, useEffect } from 'react';

export const useItemData = (items) => {
    const [itemData, setItemData] = useState(null);
    const [error, setError] = useState(null);
    const route = "/api/data/item/";


    /* DATA FETCHING GOES HERE */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(route);
                const result = await response.json();
                console.log(result.response)
                setItemData(processItemData(result.response));
            } catch (err) {
                setError('Failed to fetch data.');
            }
        };

        if (route) {
            fetchData();
        }
    }, [route]);


    /* BELOW THIS POINT IS METICULOUS DATA PARSING */

    function extractValue(description, tag) {
        const regex = new RegExp(`<${tag}>(.*?)</${tag}>`, 'gi');
        const matches = regex.exec(description);
        return matches ? matches[1] : '';
    }

    function extractStatValue(description, statName) {
        const regex = new RegExp(`<stats>.*?(<buffedStat>|<attention>)(\\d+%?)<\\/(buffedStat|attention)> ${statName}.*?<\\/stats>`, 's');
        const matches = regex.exec(description);
        return matches ? matches[2] : '';
    }

    function extractActiveValue(description) {
        const regex = /<\/active>(.*?)<br>/s;
        const matches = regex.exec(description);
        return matches ? matches[1] : '';
    }


    function extractPassiveValue(description) {
        const regex = /<passive>(.*?)<br>/s;
        const matches = regex.exec(description);
        return matches ? matches[1] : '';
    }

    function formatPercent(value) {
        return `${Math.round(value * 100)}%`;
    }

    const removeHtmlTags = (str) => str.replace(/<[^>]*>/g, '');

    const processItemData = (data) => {
        if (!data || !data.data) {
            return null;
        }

        /* A ton of parsing to make use of DDragon's data without having to rely on sanitizing HTML */
        /* TODO: Riot's API does not have official data on Critical Strike Damage among others, consider refractoring if this changes */
        /* TODO: If this breaks often, consider migrating to unofficial API, such as communitydragon.org, as it would remove the need for parsing */

        const filteredItems = items.filter(itemId => data.data[itemId]).map(itemId => {
            const itemDetails = data.data[itemId];
            console.log(itemDetails)
            return {
                id: itemId,
                name: itemDetails.name,
                image: itemDetails.image.full,
                description: itemDetails.description,
                rules: removeHtmlTags(extractValue(itemDetails.description, 'rules')),
                passiveName: extractValue(itemDetails.description, 'passive'),
                active: removeHtmlTags(extractActiveValue(itemDetails.description)),
                passive: removeHtmlTags(extractPassiveValue(itemDetails.description)),
                gold: itemDetails.gold.total,
                ad: itemDetails.stats.FlatPhysicalDamageMod ? `${itemDetails.stats.FlatPhysicalDamageMod}` : '',
                ap: itemDetails.stats.FlatMagicDamageMod ? `${itemDetails.stats.FlatMagicDamageMod}` : '',
                mpen: extractStatValue(itemDetails.description, 'Magic Penetration') ? `${extractStatValue(itemDetails.description, 'Magic Penetration')}` : '',
                as: itemDetails.stats.PercentAttackSpeedMod ? `${formatPercent(itemDetails.stats.PercentAttackSpeedMod)}` : '',
                critChance: itemDetails.stats.FlatCritChanceMod ? `${formatPercent(itemDetails.stats.FlatCritChanceMod)}` : '',
                critDmg: extractStatValue(itemDetails.description, 'Critical Strike Damage') ? `${extractStatValue(itemDetails.description, 'Critical Strike Damage')}` : '',
                health: itemDetails.stats.FlatHPPoolMod ? `${itemDetails.stats.FlatHPPoolMod}` : '',
                armor: itemDetails.stats.FlatArmorMod ? `${itemDetails.stats.FlatArmorMod}` : '',
                mr: itemDetails.stats.FlatSpellBlockMod ? `${itemDetails.stats.FlatSpellBlockMod}` : '',
                mana: itemDetails.stats.FlatMPPoolMod ? `${itemDetails.stats.FlatMPPoolMod}` : '',
                hpregen: extractStatValue(itemDetails.description, 'Base Health Regen') ? `${extractStatValue(itemDetails.description, 'Base Health Regen')}` : '',
                haste: extractStatValue(itemDetails.description, 'Ability Haste') ? `${extractStatValue(itemDetails.description, 'Ability Haste')}` : '',
                flatMs: itemDetails.stats.FlatMovementSpeedMod ? `${itemDetails.stats.FlatMovementSpeedMod}` : '',
                percentMs: itemDetails.stats.PercentMovementSpeedMod ? `${formatPercent(itemDetails.stats.PercentMovementSpeedMod)}` : '',
                manaregen: extractStatValue(itemDetails.description, 'Base Mana Regen') ? `${extractStatValue(itemDetails.description, 'Base Mana Regen')}` : '',
                hpShieldPower: extractStatValue(itemDetails.description, 'Heal and Shield Power') ? `${extractStatValue(itemDetails.description, 'Heal and Shield Power')}` : '',
                vamp: extractStatValue(itemDetails.description, 'Omnivamp') ? `${extractStatValue(itemDetails.description, 'Omnivamp')}` : '',
                lethality: extractStatValue(itemDetails.description, 'Lethality') ? `${extractStatValue(itemDetails.description, 'Lethality')}` : '',
                arPen: extractStatValue(itemDetails.description, 'Armor Penetration') ? `${extractStatValue(itemDetails.description, 'Armor Penetration')}` : '',
                tenacity: extractStatValue(itemDetails.description, 'Tenacity') ? `${extractStatValue(itemDetails.description, 'Tenacity')}` : '',
            };
        });

        return filteredItems;
    };

    return { itemData, error };
};