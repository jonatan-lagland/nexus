import { error400 } from './errors/errorResponses';
import { removeHtmlTags } from './dataParsingUtils';
import { extractValue } from './dataParsingUtils';
import { extractStatValue } from './dataParsingUtils';
import { extractActiveValue } from './dataParsingUtils';
import { extractPassiveValue } from './dataParsingUtils';
import { formatPercent } from './dataParsingUtils';
import { removePassiveNames } from './dataParsingUtils';

export const useItemData = (itemsToBeFiltered, completeListOfItems) => {
    const processItemData = () => {
        try {
            const filteredItems = itemsToBeFiltered.map(itemId => {
                // Check if the itemId exists in completeListOfItems
                if (Object.prototype.hasOwnProperty.call(completeListOfItems, itemId)) {
                    const itemDetails = completeListOfItems[itemId];
                    return {
                        id: itemId,
                        name: itemDetails.name,
                        image: itemDetails.image.full,
                        description: itemDetails.description,
                        rules: removeHtmlTags(extractValue(itemDetails.description, 'rules')),
                        passiveName: extractValue(itemDetails.description, 'passive'),
                        active: removeHtmlTags(extractActiveValue(itemDetails.description)),
                        passive: removePassiveNames(removeHtmlTags(extractPassiveValue(itemDetails.description))),
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
                } else {
                    // Id 0 indicates an empty item slot in Riot API, which is expected and should happen almost every game.
                    // If an item is truly not found, return a default value. This shouldn't ever happen, and is most likely due to a stale JSON on the Next.js server.
                    switch (itemId) {
                        case 0:
                            return {
                                id: 0
                            }
                        default:
                            return {
                                id: 1,
                                name: "Unknown",
                                gold: 0,
                                notFound: "Hey... I don't think this item exists yet!"
                            };
                    }
                }
            });
            return filteredItems;
        } catch (err) {
            return error400
        }
    };
    if (itemsToBeFiltered && completeListOfItems) {
        const filteredItems = processItemData();
        return filteredItems;
    }
};

export function useIsTrinketItem(itemName) {
    const isTrinket = itemName === "Oracle Lens" || itemName === "Stealth Ward" || itemName === "Farsight Alteration" ? true : false;
    return isTrinket;
}