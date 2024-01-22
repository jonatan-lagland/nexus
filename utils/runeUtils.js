import { error400 } from './errors/errorResponses';

export const useRuneData = (keystoneId, completeListOfRunes) => {
    const processRuneData = () => {
        try {
            const foundRune = completeListOfRunes?.flatMap(category => category.slots)
                .flatMap(slot => slot.runes)
                .find(rune => rune.id === keystoneId);
            if (foundRune) {
                return foundRune
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