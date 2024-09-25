import {CreatePeopleCommand} from "./CreatePeopleCommand";
import {PeopleRepository} from "../../domain/repositories/PeopleRepository";
import {PeopleEntity} from "../../domain/entities/PeopleEntity";

export class CreatePeopleHandler {
    private peopleRepository: PeopleRepository;

    constructor(peopleRepository: PeopleRepository) {
        this.peopleRepository = peopleRepository;
    }

    async handler(command: CreatePeopleCommand) {
        const people = new PeopleEntity(
            command.id,
            command.birth_year,
            command.eye_color,
            command.films,
            command.gender,
            command.hair_color,
            command.height,
            command.homeworld,
            command.mass,
            command.name,
            command.skin_color,
            command.species,
            command.starships,
            command.url,
            command.vehicles,
        );
        await this.peopleRepository.save(people);
    }


}