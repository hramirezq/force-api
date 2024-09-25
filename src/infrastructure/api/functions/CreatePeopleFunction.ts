import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import { DynamoDBPeopleRepository } from '../../repositories/DynamoDBPeopleRepository';
import {CreatePeopleHandler} from "../../../application/commands/CreatePeopleHandler";
import {CreatePeopleCommand} from "../../../application/commands/CreatePeopleCommand";
import {CreatePeopleInput} from "../inputs/CreatePeopleInput";
import {CreatePeopleMapper} from "../../mappers/CreatePeopleMapper";
import {PeopleRepository as PeopleRepositoryInterface} from "../../../domain/repositories/PeopleRepository";
import {TranslateService} from "../../../domain/services/TranslateService";
import {TranslateServiceImpl} from "../../services/TranslateServiceImpl";

export class CreatePeopleFunction {
  private readonly createPeopleHandler: CreatePeopleHandler;
  private readonly createPeopleMapper: CreatePeopleMapper;
  private readonly peopleRepository : PeopleRepositoryInterface;
  constructor(
      peopleRepository: PeopleRepositoryInterface,
      translateService: TranslateService<CreatePeopleCommand>
  ) {
    this.peopleRepository = peopleRepository;
    this.createPeopleHandler = new CreatePeopleHandler(peopleRepository);
    this.createPeopleMapper = new CreatePeopleMapper(translateService);
  }
  public async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const body = JSON.parse(event.body || '{}') as CreatePeopleInput;
    let errorMessage = CreatePeopleInput.validate(body)
    if(errorMessage != ""){
      return {
        statusCode: 400,
        body: JSON.stringify({ mensaje: errorMessage })
      };
    }
    const command = this.createPeopleMapper.fromInputToCommand(body);
    await this.createPeopleHandler.handler(command);
    return {
      statusCode: 201,
      body: JSON.stringify({ mensaje: 'Personaje creado exitosamente' })
    };
  }
}
const peopleRepository = new DynamoDBPeopleRepository();
const translateService = new TranslateServiceImpl<CreatePeopleCommand>;
const controller = new CreatePeopleFunction(peopleRepository, translateService);
export const createPeople = (event: APIGatewayProxyEvent) => controller.handle(event);
