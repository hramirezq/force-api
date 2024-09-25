import {TranslateService} from "../../domain/services/TranslateService";
import {CreatePeopleCommand} from "../../application/commands/CreatePeopleCommand";
import {CreatePeopleInput} from "../api/inputs/CreatePeopleInput";

export class CreatePeopleMapper {
    private translateService: TranslateService<CreatePeopleCommand>;

    constructor(translateService: TranslateService<CreatePeopleCommand>) {
        this.translateService = translateService;
    }

    fromInputToCommand(object: CreatePeopleInput): CreatePeopleCommand{
        console.log("create people input", object);
        return this.translateService.translateFromSpanishToEnglish(object);
    }

}