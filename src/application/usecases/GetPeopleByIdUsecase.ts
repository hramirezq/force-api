import {GetPeopleByIdQuery} from "../queries/GetPeopleByIdQuery";
import {GetPeopleByIdHandler} from "../queries/GetPeopleByIdHandler";
import {PeopleRepository as PeopleRepositoryInterface} from "../../domain/repositories/PeopleRepository";
import {PeopleEntity} from "../../domain/entities/PeopleEntity";
import {CreatePeopleCommand} from "../commands/CreatePeopleCommand";
import {CreatePeopleHandler} from "../commands/CreatePeopleHandler";
import {ExternalApiService} from "../../domain/services/ExternalApiService";

export class GetPeopleByIdUsecase {
    private readonly getPeopleByIdHandler: GetPeopleByIdHandler;
    private readonly createPeopleCommand: CreatePeopleHandler;
    private readonly peopleRepository : PeopleRepositoryInterface;
    private readonly externalApiService : ExternalApiService;
    constructor(
        peopleRepository: PeopleRepositoryInterface,
        externalApiService: ExternalApiService,
    ) {
        this.getPeopleByIdHandler = new GetPeopleByIdHandler(peopleRepository);
        this.createPeopleCommand = new CreatePeopleHandler(peopleRepository);
        this.externalApiService = externalApiService;
    }

    async run(query: GetPeopleByIdQuery){
        console.log("llega aqui")
        let people = await this.getPeopleByIdHandler.handler(query);
        console.log("llega aqui people", people)
        if(people != null){
            console.log("llega aqui people if y ya no ejecuta swapi")
            return people;
        }

        console.log("before get people external service.",query.id);
        let responseApi = await this.externalApiService.getPeopleById(query.id);
        console.log("response api",responseApi);
        if(!responseApi){
            return null;
        }
        let command = new CreatePeopleCommand(
            responseApi.id,
            responseApi.birth_year,
            responseApi.eye_color,
            responseApi.films,
            responseApi.gender,
            responseApi.hair_color,
            responseApi.height,
            responseApi.homeworld,
            responseApi.mass,
            responseApi.name,
            responseApi.skin_color,
            responseApi.species,
            responseApi.starships,
            responseApi.url,
            responseApi.vehicles,
        );
        await this.createPeopleCommand.handler(command);
        return command;
    }
}