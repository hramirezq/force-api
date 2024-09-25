import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {GetPeopleInput} from "../inputs/GetPeopleInput";
import {GetPeopleByIdQuery} from "../../../application/queries/GetPeopleByIdQuery";
import {GetPeopleByIdHandler} from "../../../application/queries/GetPeopleByIdHandler";
import {PeopleRepository as PeopleRepositoryInterface} from "../../../domain/repositories/PeopleRepository";
import {TranslateService} from "../../../domain/services/TranslateService";
import {GetPeopleMapper} from "../../mappers/GetPeopleMapper";
import {GetPeopleOutput} from "../outputs/GetPeopleOutput";
import {DynamoDBPeopleRepository} from "../../repositories/DynamoDBPeopleRepository";
import {TranslateServiceImpl} from "../../services/TranslateServiceImpl";
import {GetPeopleByIdUsecase} from "../../../application/usecases/GetPeopleByIdUsecase";
import {ExternalApiService} from "../../../domain/services/ExternalApiService";
import {SwapiService} from "../../services/SwapiService";

export class GetPeopleFunction{
  private readonly peopleRepository : PeopleRepositoryInterface;
  private readonly externalApiService : ExternalApiService;
  private readonly getPeopleMapper: GetPeopleMapper;
  constructor(
      peopleRepository: PeopleRepositoryInterface,
      externalApiService: ExternalApiService,
      getPeopleMapper: GetPeopleMapper
  ) {
    this.peopleRepository = peopleRepository;
    this.externalApiService = externalApiService;
    this.getPeopleMapper = getPeopleMapper
  }
  public async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>{
    const { id } = event.pathParameters || {};
    let errorMessage = GetPeopleInput.validate(id)
    if(errorMessage != ""){
      return {
        statusCode: 400,
        body: JSON.stringify({ mensaje: errorMessage })
      };
    }
    const useCase = new GetPeopleByIdUsecase(this.peopleRepository, this.externalApiService);
    const query = new GetPeopleByIdQuery(Number(id));
    let people = await useCase.run(query);
    if(!people) {
      return { statusCode: 404, body: 'People not found' };
    }
    const peopleTranslate = this.getPeopleMapper.fromEntityToOutput(people);
    return {
      statusCode: 200,
      body: JSON.stringify(peopleTranslate),
    };
  }
}

const peopleRepository = new DynamoDBPeopleRepository();
const translateService = new TranslateServiceImpl<GetPeopleOutput>;
const externalApiService = new SwapiService();
const getPeopleMapper = new GetPeopleMapper(translateService);

const controller = new GetPeopleFunction(peopleRepository, externalApiService, getPeopleMapper);
export const getPeople = (event: APIGatewayProxyEvent) => controller.handle(event);
