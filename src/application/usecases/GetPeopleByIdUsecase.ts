import {GetPeopleByIdQuery} from "../queries/GetPeopleByIdQuery";
import {GetPeopleByIdHandler} from "../queries/GetPeopleByIdHandler";
import {PeopleRepository as PeopleRepositoryInterface} from "../../domain/repositories/PeopleRepository";
import {CreatePeopleCommand} from "../commands/CreatePeopleCommand";
import {CreatePeopleHandler} from "../commands/CreatePeopleHandler";
import {ExternalApiService} from "../../domain/services/ExternalApiService";
import {PeopleInterface} from "../../domain/interfaces/PeopleInterface";

export class GetPeopleByIdUsecase {
    private readonly getPeopleByIdHandler: GetPeopleByIdHandler;
    private readonly createPeopleHandler: CreatePeopleHandler;
    private readonly peopleRepository : PeopleRepositoryInterface;
    private readonly externalApiService : ExternalApiService;
    constructor(
        peopleRepository: PeopleRepositoryInterface,
        externalApiService: ExternalApiService,
    ) {
        this.getPeopleByIdHandler = new GetPeopleByIdHandler(peopleRepository);
        this.createPeopleHandler = new CreatePeopleHandler(peopleRepository);
        this.externalApiService = externalApiService;
    }

    async run(query: GetPeopleByIdQuery){
        let people = await this.getPeopleByIdHandler.handler(query);
        if(people != null){
            return people;
        }
        let responseApi = await this.externalApiService.getPeopleById(query.id);
        responseApi.id = query.id;
        if(!responseApi){
            return null;
        }
        let peopleInterface : PeopleInterface = {
                uuid: "",
                id: responseApi.id,
                birth_year: responseApi.birth_year,
                eye_color: responseApi.eye_color,
                gender: responseApi.gender,
                hair_color: responseApi.hair_color,
                height: responseApi.height,
                homeworld: responseApi.homeworld,
                mass: responseApi.mass,
                name: responseApi.name,
                skin_color: responseApi.skin_color,
                url: responseApi.url,
        }
        console.log("ptmre");
        let command = new CreatePeopleCommand(peopleInterface, responseApi.species, responseApi.starships, responseApi.vehicles, responseApi.films);
        console.log("handler people after updates: ", JSON.stringify(command, null, 2));
        await this.createPeopleHandler.handler(command);
        return command;
    }
}