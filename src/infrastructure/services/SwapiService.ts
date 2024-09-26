import axios from 'axios';
import {ExternalApiService} from "../../domain/services/ExternalApiService";

export class SwapiService implements ExternalApiService{
    async getPeopleById(id: number) {
        const response = await axios.get(`https://swapi.dev/api/people/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    }
}