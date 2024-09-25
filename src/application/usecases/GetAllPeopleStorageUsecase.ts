import {GetPeopleByIdQuery} from "../queries/GetPeopleByIdQuery";
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
        console.log("llega aqui")
        let people = await this.getAllPeopleHandler.handler();
        console.log("llega aqui people", people)
        if(people == null || people.length < 0){
            return [];
        }
        return people;
    }
}