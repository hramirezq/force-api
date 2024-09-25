import {dictionarySpanishToEnglish} from "./DictionarySpanishToEnglish";

function functionEnglishToSpanish() : Map<string, string> {
        let dictionaryEnglishToSpanish: Map<string, string> = new Map<string, string>();

        for (const [spanishWord, englishWord] of dictionarySpanishToEnglish) {
                dictionaryEnglishToSpanish.set(englishWord, spanishWord);
        }
        console.log(dictionaryEnglishToSpanish);
        return dictionaryEnglishToSpanish;
}

export const dictionaryEnglishToSpanish = functionEnglishToSpanish();