import {TranslateService} from "../../domain/services/TranslateService";
import {CreatePeopleCommand} from "../../application/commands/CreatePeopleCommand";
import {CreatePeopleInput} from "../api/inputs/CreatePeopleInput";

export class CreatePeopleMapper {
    private translateService: TranslateService<CreatePeopleCommand>;

    constructor(translateService: TranslateService<CreatePeopleCommand>) {
        this.translateService = translateService;
    }

    fromInputToCommand(object: CreatePeopleInput): CreatePeopleCommand{
        return this.translateService.translateFromSpanishToEnglish(object);
    }

}