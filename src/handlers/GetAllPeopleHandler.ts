import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {DynamoDBPeopleRepository} from "../infrastructure/repositories/DynamoDBPeopleRepository";
import {PeopleAdapter} from "../adapters/PeopleAdapter";
import {TranslateService} from "../services/TranslateService";
import {PeopleModel} from "../infrastructure/models/PeopleModel";
import {PeopleSpanish} from "../infrastructure/translated-objects/PeopleSpanish";

export class GetAllPeopleHandler{
    private readonly peopleRepository : DynamoDBPeopleRepository;
    private readonly peopleAdapter: PeopleAdapter;
    constructor(
        peopleRepository: DynamoDBPeopleRepository,
        peopleAdapter: PeopleAdapter,
    ) {
        this.peopleRepository = peopleRepository;
        this.peopleAdapter = peopleAdapter;
    }
    public async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>{
        const listPeople = await this.peopleRepository.findAll();
        const peoplesTranslate = this.peopleAdapter.fromListEnglishToListSpanish(listPeople);
        return {
            statusCode: 200,
            body: JSON.stringify(peoplesTranslate),
        };
    }
}

const peopleRepository = new DynamoDBPeopleRepository();
const translateService = new TranslateService<PeopleModel, PeopleSpanish>();
const peopleAdapter = new PeopleAdapter(translateService);
const controller = new GetAllPeopleHandler(peopleRepository, peopleAdapter);
export const getAllPeople = (event: APIGatewayProxyEvent) => controller.handle(event);