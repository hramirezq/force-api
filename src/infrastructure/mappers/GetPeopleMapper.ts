import {TranslateService} from "../../domain/services/TranslateService";
import {PeopleEntity} from "../../domain/entities/PeopleEntity";
import {GetPeopleOutput} from "../api/outputs/GetPeopleOutput";
import {CreatePeopleCommand} from "../../application/commands/CreatePeopleCommand";

export class GetPeopleMapper {
    private translateService: TranslateService<GetPeopleOutput>;

    constructor(translateService: TranslateService<GetPeopleOutput>) {
        this.translateService = translateService;
    }

    fromEntityToOutput(object: PeopleEntity | CreatePeopleCommand): GetPeopleOutput{
        console.log("fromEntityToOutput", object);
        return this.translateService.translateFromEnglishToSpanish(object);
    }

}