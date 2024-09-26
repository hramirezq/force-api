import {PeopleRepository} from "../../domain/repositories/PeopleRepository";

export class GetAllPeopleHandler {
    private peopleRepository: PeopleRepository;

    constructor(peopleRepository: PeopleRepository) {
        this.peopleRepository = peopleRepository;
    }

    async handler() {
        return await this.peopleRepository.findAll();
    }
}