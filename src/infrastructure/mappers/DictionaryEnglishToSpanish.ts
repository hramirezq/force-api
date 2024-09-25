import {dictionarySpanishToEnglish} from "./DictionarySpanishToEnglish";

function functionEnglishToSpanish() : Map<string, string> {
        let dictionary: Map<string, string> = new Map<string, string>();
        dictionary.forEach((englishValue, spanishKey) => {
                dictionarySpanishToEnglish.set(englishValue, spanishKey);
        });
        return dictionary;
}

export const dictionaryEnglishToSpanish = functionEnglishToSpanish();