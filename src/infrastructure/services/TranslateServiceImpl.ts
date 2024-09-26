import {TranslateService} from "../../domain/services/TranslateService";
import {dictionarySpanishToEnglish} from "../mappers/DictionarySpanishToEnglish";
import {dictionaryEnglishToSpanish} from "../mappers/DictionaryEnglishToSpanish";

export class TranslateServiceImpl<Type> implements TranslateService<Type> {
    translateFromEnglishToSpanish(englishObject: any): Type {
        let test = this.translate<Type>(englishObject, dictionaryEnglishToSpanish);
        console.log("objeto en espalo",test);
        console.log("TranslateServiceImpl englishObject", JSON.stringify(test, null, 2));
        return test;
    }

    translateFromSpanishToEnglish(spanishObject: any): Type {
        return this.translate<Type>(spanishObject, dictionarySpanishToEnglish);
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