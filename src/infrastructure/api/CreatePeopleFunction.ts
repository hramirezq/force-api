import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import { DynamoDBPeopleRepository } from '../repositories/DynamoDBPeopleRepository';
import {CreatePeopleHandler} from "../../application/commands/CreatePeopleHandler";
import {CreatePeopleCommand} from "../../application/commands/CreatePeopleCommand";
import {CreatePeopleInput} from "./inputs/CreatePeopleInput";
import {CreatePeopleMapper} from "../mappers/CreatePeopleMapper";
import {TranslateServiceImpl} from "../services/TranslateServiceImpl";

export class CreatePeopleFunction {
  private readonly createPeopleHandler: CreatePeopleHandler;
  private readonly createPeopleMapper: CreatePeopleMapper;
  constructor(
  ) {
    const translateService = new TranslateServiceImpl<CreatePeopleCommand>;
    const peopleRepository = new DynamoDBPeopleRepository();
    this.createPeopleHandler = new CreatePeopleHandler(peopleRepository);
    this.createPeopleMapper = new CreatePeopleMapper(translateService);
  }
  public async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const body = JSON.parse(event.body || '{}') as CreatePeopleInput;
    const command = this.createPeopleMapper.fromInputToCommand(body);
    await this.createPeopleHandler.handler(command);
    return {
      statusCode: 201,
      body: JSON.stringify({ mensaje: 'Personaje creado exitosamente' })
    };
  }
}

const controller = new CreatePeopleFunction();
export const createPeople = controller.handle;
