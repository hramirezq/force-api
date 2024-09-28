import {TranslateService} from "../../domain/services/TranslateService";
import {PeopleEntity} from "../../domain/entities/PeopleEntity";
import {GetPeopleOutput} from "../api/outputs/GetPeopleOutput";
import {CreatePeopleCommand} from "../../application/commands/CreatePeopleCommand";

export class GetPeopleMapper {
    private translateService: TranslateService<GetPeopleOutput>;

    constructor(translateService: TranslateService<GetPeopleOutput>) {
        this.translateService = translateService;
    }

    fromEntityToOutput(object: PeopleEntity | CreatePeopleCommand | any): GetPeopleOutput{
        return this.translateService.translateFromEnglishToSpanish(object);
    }

}