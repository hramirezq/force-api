import {TranslateService} from "../../domain/services/TranslateService";
import {PeopleEntity} from "../../domain/entities/PeopleEntity";
import {GetPeopleOutput} from "../api/outputs/GetPeopleOutput";

export class GetAllPeopleMapper {
    private translateService: TranslateService<GetPeopleOutput>;

    constructor(translateService: TranslateService<GetPeopleOutput>) {
        this.translateService = translateService;
    }

    fromEntitiesToOutput(listObject: Array<PeopleEntity>): Array<GetPeopleOutput>{
        let output: Array<GetPeopleOutput> = [];
        for (let object of listObject) {
            let translatedObject = this.translateService.translateFromEnglishToSpanish(object);
            output.push(translatedObject);
        }

        return output;
    }

}