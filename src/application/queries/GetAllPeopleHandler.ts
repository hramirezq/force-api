import {PeopleRepository} from "../../domain/repositories/PeopleRepository";
import {GetPeopleByIdQuery} from "./GetPeopleByIdQuery";

export class GetAllPeopleHandler {
    private peopleRepository: PeopleRepository;

    constructor(peopleRepository: PeopleRepository) {
        this.peopleRepository = peopleRepository;
    }

    async handler() {
        return await this.peopleRepository.findAll();
    }
}