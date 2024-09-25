import {GetPeopleByIdQuery} from "../queries/GetPeopleByIdQuery";
import {GetPeopleByIdHandler} from "../queries/GetPeopleByIdHandler";
import {PeopleRepository as PeopleRepositoryInterface} from "../../domain/repositories/PeopleRepository";
import {PeopleEntity} from "../../domain/entities/PeopleEntity";
import {CreatePeopleCommand} from "../commands/CreatePeopleCommand";
import {CreatePeopleHandler} from "../commands/CreatePeopleHandler";
import {ExternalApiService} from "../../domain/services/ExternalApiService";

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
        if(!responseApi){
            return null;
        }
        let command = new CreatePeopleCommand(
            responseApi
        );
        await this.createPeopleHandler.handler(command);
        return command;
    }
}