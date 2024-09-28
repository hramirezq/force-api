import {CreatePeopleCommand} from "./CreatePeopleCommand";
import {PeopleRepository} from "../../domain/repositories/PeopleRepository";
import {PeopleEntity} from "../../domain/entities/PeopleEntity";
import {PeopleInterface} from "../../domain/interfaces/PeopleInterface";

export class CreatePeopleHandler {
    private peopleRepository: PeopleRepository;

    constructor(peopleRepository: PeopleRepository) {
        this.peopleRepository = peopleRepository;
    }

    async handler(command: CreatePeopleCommand) {
        const people: PeopleInterface = {
            uuid: command.uuid,
            id: command.id,
            birth_year: command.birth_year,
            eye_color: command.eye_color,
            gender: command.gender,
            hair_color: command.hair_color,
            height: command.height,
            homeworld: command.homeworld,
            mass: command.mass,
            name: command.name,
            skin_color: command.skin_color,
            url: command.url
        };
        const peopleEntity = new PeopleEntity(people, command.species, command.starships, command.vehicles, command.films);
        await this.peopleRepository.save(peopleEntity);
    }


}