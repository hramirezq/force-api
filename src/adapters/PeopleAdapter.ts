import { PeopleModel } from "../infrastructure/models/PeopleModel";
import {TranslateService} from "../services/TranslateService";
import {PeopleSpanish} from "../infrastructure/translated-models/PeopleSpanish";

export class PeopleAdapter {
    private translateService: TranslateService<PeopleModel, PeopleSpanish>;

    constructor(translateService: TranslateService<PeopleModel, PeopleSpanish>) {
        this.translateService = translateService;
    }

    fromSpanishToEnglish(object: PeopleSpanish): PeopleModel{
        return this.translateService.translateFromSpanishToEnglish(object);
    }

    fromEnglishToSpanish(object: PeopleModel | any): PeopleSpanish{
        return this.translateService.translateFromEnglishToSpanish(object);
    }

    fromListEnglishToListSpanish(listObject: Array<PeopleModel> | null): Array<PeopleSpanish>{
        let output: Array<PeopleSpanish> = [];
        if (listObject == null)
            return output;
        for (let object of listObject) {
            let translatedObject = this.translateService.translateFromEnglishToSpanish(object);
            output.push(translatedObject);
        }
        return output;
    }

}