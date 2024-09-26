import {PeopleRepository as PeopleRepositoryInterface} from "../../domain/repositories/PeopleRepository";
import {GetAllPeopleHandler} from "../queries/GetAllPeopleHandler";

export class GetAllPeopleStorageUsecase {
    private readonly getAllPeopleHandler: GetAllPeopleHandler;
    private readonly peopleRepository : PeopleRepositoryInterface;
    constructor(
        peopleRepository: PeopleRepositoryInterface,
    ) {
        this.getAllPeopleHandler = new GetAllPeopleHandler(peopleRepository);
    }

    async run(){
        let people = await this.getAllPeopleHandler.handler();
        if(people == null || people.length < 0){
            return [];
        }
        return people;
    }
}