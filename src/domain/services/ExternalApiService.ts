import {PeopleEntity} from "../entities/PeopleEntity";

export interface ExternalApiService {
    getPeopleById(id: number): any;
}
