import {TranslateService} from "../../domain/services/TranslateService";
import {dictionarySpanishToEnglish} from "../mappers/DictionarySpanishToEnglish";
import {dictionaryEnglishToSpanish} from "../mappers/DictionaryEnglishToSpanish";

export class TranslateServiceImpl<Type> implements TranslateService<Type> {
    translateFromEnglishToSpanish(englishObject: any): Type {
        return this.translate<Type>(englishObject, dictionaryEnglishToSpanish);
    }

    translateFromSpanishToEnglish(spanishObject: any): Type {
        return this.translate<Type>(spanishObject, dictionarySpanishToEnglish);
    }

    translate<Type>(obj: any, dictionary: Map<string, string>): Type {
        console.log("Translate object input",obj);
        const translatedObj: any = {};
        for (const key in obj) {
            const translatedKey = dictionary.get(key);
            if (translatedKey) {
                translatedObj[translatedKey] = obj[key];
            } else {
                console.warn(`Clave no encontrada: ${key}`);
            }
        }
        console.log("Translated object",translatedObj);
        return translatedObj as Type;
    }

}