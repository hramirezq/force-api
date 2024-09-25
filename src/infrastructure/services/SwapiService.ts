import {PeopleEntity} from "../../domain/entities/PeopleEntity";
import axios from 'axios';
import {ExternalApiService} from "../../domain/services/ExternalApiService";

export class SwapiService implements ExternalApiService{
    async getPeopleById(id: number) {
        const response = await axios.get(`https://swapi.dev/api/people/${id}`);
        if (response.status === 200) {
            let people = new PeopleEntity(
                "",
                response.data.id,
                response.data.birth_year,
                response.data.eye_color,
                response.data.films,
                response.data.gender,
                response.data.hair_color,
                response.data.height,
                response.data.homeworld,
                response.data.mass,
                response.data.name,
                response.data.skin_color,
                response.data.species,
                response.data.starships,
                response.data.url,
                response.data.vehicles,
            );
            return people;
        } else {
            return null;
        }
    }
}