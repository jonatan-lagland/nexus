'use client'
import { error400 } from './errors/errorResponses';
import { useMemo } from 'react';
import { removeHtmlTags } from './dataParsingUtils';

/* Find KEYSTONE rune details */
export const useRuneData = (keystoneId, completeListOfRunes) => {
    return useMemo(() => {
        const processRuneData = () => {
            try {
                const foundRune = completeListOfRunes?.flatMap(category => category.slots)
                    .flatMap(slot => slot.runes)
                    .find(rune => rune.id === parseInt(keystoneId));
                if (foundRune) {
                    return {
                        id: foundRune.id,
                        key: foundRune.key,
                        icon: foundRune.icon,
                        longDesc: removeHtmlTags(foundRune.longDesc),
                        name: foundRune.name,
                        shortDesc: removeHtmlTags(foundRune.shortDesc)
                    }
                }
            } catch (err) {
                return error400
            }
        };
        if (keystoneId && completeListOfRunes) {
            const filteredRunes = processRuneData();
            return filteredRunes;
        }
    }, [keystoneId, completeListOfRunes]);
};

/* Find RUNE PATH details (e.g. Domination, Precision) */
export const useRunePathData = (runePathId, completeListOfRunes) => {
    return useMemo(() => {
        const processRunePathData = () => {
            try {
                const foundRune = completeListOfRunes?.find(rune => rune.id === runePathId);
                return {
                    id: foundRune.id,
                    key: foundRune.key,
                    icon: foundRune.icon,
                    name: foundRune.name,
                }
            } catch (err) {
                return error400
            }
        };
        if (runePathId && completeListOfRunes) {
            const filteredRunes = processRunePathData();
            return filteredRunes;
        }
    }, [runePathId, completeListOfRunes]);
};

/* Find Summoner Spell details */
export const useSummonerSpellData = (summonerSpellId, completeListOfSummonerSpells) => {
    return useMemo(() => {
        const processSummonerSpellData = () => {
            try {
                const foundSpell = completeListOfSummonerSpells?.find(spell => spell.id === summonerSpellId);
                return {
                    id: foundSpell.id,
                    name: foundSpell.name,
                    description: foundSpell.description,
                    cooldown: foundSpell.cooldown,
                    iconPath: foundSpell.iconPath
                }
            } catch (err) {
                return error400
            }
        };
        if (summonerSpellId && completeListOfSummonerSpells) {
            const filteredRunes = processSummonerSpellData();
            return filteredRunes;
        }
    }, [summonerSpellId, completeListOfSummonerSpells]);
};