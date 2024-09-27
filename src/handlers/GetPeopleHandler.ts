import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {PeopleAdapter} from "../adapters/PeopleAdapter";
import {DynamoDBPeopleRepository} from "../infrastructure/repositories/DynamoDBPeopleRepository";
import {PeopleSpanish} from "../infrastructure/translated-models/PeopleSpanish";
import {ExternalApiService} from "../services/ExternalApiService";
import {PeopleModel} from "../infrastructure/models/PeopleModel";
import {v4 as uuidv4} from "uuid";
import {TranslateService} from "../services/TranslateService";

export class GetPeopleHandler {
    private readonly peopleAdapter: PeopleAdapter;
    private readonly peopleRepository: DynamoDBPeopleRepository;
    private readonly externalApiService: ExternalApiService;
    constructor(
        peopleRepository: DynamoDBPeopleRepository,
        peopleAdapter: PeopleAdapter,
        externalApiService: ExternalApiService
    ) {
        this.peopleRepository = peopleRepository;
        this.peopleAdapter = peopleAdapter;
        this.externalApiService = externalApiService;
    }
    public async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>{
        const { id } = event.pathParameters || {};
        let errorMessage = this.validate(id)

        if(errorMessage != ""){
            return {
                statusCode: 400,
                body: JSON.stringify({ mensaje: errorMessage })
            };
        }
        let numberId = Number(id);
        let people = await this.peopleRepository.findById(numberId);
        let peopleTranslate: PeopleSpanish;

        if(people != null){
            peopleTranslate = this.peopleAdapter.fromEnglishToSpanish(people);
            return {
                statusCode: 200,
                body: JSON.stringify(peopleTranslate),
            };
        }

        let responseApi = await this.externalApiService.getPeopleById(numberId);
        responseApi.id = numberId;

        if(!responseApi){
            return { statusCode: 404, body: 'People not found' };
        }
        const uuid = uuidv4();
        const peopleModel = new PeopleModel(
            uuid,
            responseApi.id,
            responseApi.birth_year,
            responseApi.eye_color,
            responseApi.gender,
            responseApi.hair_color,
            responseApi.height,
            responseApi.homeworld,
            responseApi.mass,
            responseApi.name,
            responseApi.skin_color,
            responseApi.url,
            responseApi.species,
            responseApi.starships,
            responseApi.vehicles,
            responseApi.films
        );
        await this.peopleRepository.save(peopleModel);

        peopleTranslate = this.peopleAdapter.fromEnglishToSpanish(peopleModel.toJSON());

        return {
            statusCode: 200,
            body: JSON.stringify(peopleTranslate),
        };
    }
    validate(id: string | undefined) : String {
        if (id == undefined) {
            return "El identificador es requerido."
        }
        let numberId = Number(id)
        if (numberId == null) {
            return "El identificador es requerido."
        }
        if (numberId < 0) {
            return "El identificador no puede ser menor que cero."
        }
        return "";
    }
}
const translateService = new TranslateService<PeopleModel, PeopleSpanish>();
const peopleAdapter = new PeopleAdapter(translateService);
const peopleRepository = new DynamoDBPeopleRepository();
const externalApiService = new ExternalApiService();

const controller = new GetPeopleHandler(peopleRepository, peopleAdapter, externalApiService);
export const getPeople = (event: APIGatewayProxyEvent) => controller.handle(event);