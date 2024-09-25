import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {PeopleRepository as PeopleRepositoryInterface} from "../../../domain/repositories/PeopleRepository";
import {GetPeopleOutput} from "../outputs/GetPeopleOutput";
import {DynamoDBPeopleRepository} from "../../repositories/DynamoDBPeopleRepository";
import {TranslateServiceImpl} from "../../services/TranslateServiceImpl";
import {SwapiService} from "../../services/SwapiService";
import {GetAllPeopleStorageUsecase} from "../../../application/usecases/GetAllPeopleStorageUsecase";
import {GetAllPeopleMapper} from "../../mappers/GetAllPeopleMapper";

export class GetAllPeopleStorageFunction{
  private readonly peopleRepository : PeopleRepositoryInterface;
  private readonly getAllPeopleMapper: GetAllPeopleMapper;
  constructor(
      peopleRepository: PeopleRepositoryInterface,
      getAllPeopleMapper: GetAllPeopleMapper
  ) {
    this.peopleRepository = peopleRepository;
    this.getAllPeopleMapper = getAllPeopleMapper
  }
  public async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>{
    const useCase = new GetAllPeopleStorageUsecase(this.peopleRepository);
    let peoples = await useCase.run();
    const peoplesTranslate = this.getAllPeopleMapper.fromEntitiesToOutput(peoples);
    return {
      statusCode: 200,
      body: JSON.stringify(peoplesTranslate),
    };
  }
}

const peopleRepository = new DynamoDBPeopleRepository();
const translateService = new TranslateServiceImpl<GetPeopleOutput>;
const externalApiService = new SwapiService();
const getAllPeopleMapper = new GetAllPeopleMapper(translateService);

const controller = new GetAllPeopleStorageFunction(peopleRepository, getAllPeopleMapper);
export const getAllPeople = (event: APIGatewayProxyEvent) => controller.handle(event);
