import {PeopleRepository} from "../../domain/repositories/PeopleRepository";
import {GetPeopleByIdQuery} from "./GetPeopleByIdQuery";
import {PeopleEntity} from "../../domain/entities/PeopleEntity";

export class GetPeopleByIdHandler {
    private peopleRepository: PeopleRepository;

    constructor(peopleRepository: PeopleRepository) {
        this.peopleRepository = peopleRepository;
    }

    async handler(query: GetPeopleByIdQuery) {
        console.log("llega aqui")
        return await this.peopleRepository.findById(query.id);
    }
}