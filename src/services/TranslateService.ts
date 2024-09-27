import {dictionaryEnglishToSpanish} from "./DictionaryEnglishToSpanish";
import {dictionarySpanishToEnglish} from "./DictionarySpanishToEnglish";

export class TranslateService<L, R>{
    translateFromEnglishToSpanish(englishObject: L): R {
        let test = this.translate<R>(englishObject, dictionaryEnglishToSpanish);
        return test;
    }

    translateFromSpanishToEnglish(spanishObject: R): L {
        return this.translate<L>(spanishObject, dictionarySpanishToEnglish);
    }

    translate<Type>(obj: any, dictionary: Map<string, string>): Type {
        const translatedObj: any = {};
        for (const key in obj) {
            const translatedKey = dictionary.get(key);
            if (translatedKey) {
                translatedObj[translatedKey] = obj[key];
            } else {
                console.warn(`Clave no encontrada: ${key}`);
            }
        }
        return translatedObj as Type;
    }

}