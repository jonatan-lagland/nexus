import { error400 } from './errors/errorResponses';
import { removeHtmlTags } from './dataParsingUtils';

export const useRuneData = (keystoneId, completeListOfRunes) => {
    const processRuneData = () => {
        try {
            const foundRune = completeListOfRunes?.flatMap(category => category.slots)
                .flatMap(slot => slot.runes)
                .find(rune => rune.id === keystoneId);
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
};