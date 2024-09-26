import {PeopleRepository} from "../../domain/repositories/PeopleRepository";
import {GetPeopleByIdQuery} from "./GetPeopleByIdQuery";

export class GetPeopleByIdHandler {
    private peopleRepository: PeopleRepository;

    constructor(peopleRepository: PeopleRepository) {
        this.peopleRepository = peopleRepository;
    }

    async handler(query: GetPeopleByIdQuery) {
        return await this.peopleRepository.findById(query.id);
    }
}