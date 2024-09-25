import { APIGatewayProxyEvent } from 'aws-lambda';
import {CreatePeopleFunction} from "../../../../src/infrastructure/api/functions/CreatePeopleFunction";
import {PeopleRepository} from "../../../../src/domain/repositories/PeopleRepository";
import {TranslateService} from "../../../../src/domain/services/TranslateService";
import {CreatePeopleHandler} from "../../../../src/application/commands/CreatePeopleHandler";
import {CreatePeopleCommand} from "../../../../src/application/commands/CreatePeopleCommand";
import {CreatePeopleMapper} from "../../../../src/infrastructure/mappers/CreatePeopleMapper";
import {CreatePeopleInput} from "../../../../src/infrastructure/api/inputs/CreatePeopleInput";

jest.mock('../../../../src/application/commands/CreatePeopleHandler');
jest.mock('../../../../src/infrastructure/mappers/CreatePeopleMapper');
jest.mock('../../../../src/infrastructure/api/inputs/CreatePeopleInput');

describe('CreatePeopleFunction', () => {
    let createPeopleFunction: CreatePeopleFunction;
    let mockPeopleRepository: jest.Mocked<PeopleRepository>;
    let mockTranslateService: jest.Mocked<TranslateService<CreatePeopleCommand>>;
    let mockCreatePeopleHandler: jest.Mocked<CreatePeopleHandler>;
    let mockCreatePeopleMapper: jest.Mocked<CreatePeopleMapper>;

    beforeEach(() => {
        mockPeopleRepository = {} as jest.Mocked<PeopleRepository>;
        mockTranslateService = {} as jest.Mocked<TranslateService<CreatePeopleCommand>>;
        mockCreatePeopleHandler = { handler: jest.fn() } as unknown as jest.Mocked<CreatePeopleHandler>;
        mockCreatePeopleMapper = { fromInputToCommand: jest.fn() } as unknown as jest.Mocked<CreatePeopleMapper>;

        (CreatePeopleHandler as jest.Mock).mockImplementation(() => mockCreatePeopleHandler);
        (CreatePeopleMapper as jest.Mock).mockImplementation(() => mockCreatePeopleMapper);

        createPeopleFunction = new CreatePeopleFunction(mockPeopleRepository, mockTranslateService);
    });

    it('should create a person successfully', async () => {
        const mockEvent: APIGatewayProxyEvent = {
            body: JSON.stringify({ name: 'John Doe', age: 30 })
        } as APIGatewayProxyEvent;

        const mockCommand = {
            id: 1,
            birth_year: "19 BBY",
            eye_color: "Blue",
            films: ["https://swapi.dev/api/films/1/",],
            gender: "Male",
            hair_color: "Blond",
            height: "172",
            homeworld: "https://swapi.dev/api/planets/1/",
            mass: "77",
            name: "Luke Skywalker",
            skin_color: "Fair",
            species: [ "https://swapi.dev/api/species/1/"],
            starships: [ "https://swapi.dev/api/starships/12/",],
            url:  "https://swapi.dev/api/people/1/",
            vehicles: [ "https://swapi.dev/api/vehicles/14/"],
        } as CreatePeopleCommand;

        (CreatePeopleInput.validate as jest.Mock).mockReturnValue('');
        mockCreatePeopleMapper.fromInputToCommand.mockReturnValue(mockCommand);

        const result = await createPeopleFunction.handle(mockEvent);

        expect(CreatePeopleInput.validate).toHaveBeenCalledWith({ name: 'John Doe', age: 30 });
        expect(mockCreatePeopleMapper.fromInputToCommand).toHaveBeenCalledWith({ name: 'John Doe', age: 30 });
        expect(mockCreatePeopleHandler.handler).toHaveBeenCalledWith(mockCommand);
        expect(result).toEqual({
            statusCode: 201,
            body: JSON.stringify({ mensaje: 'Personaje creado exitosamente' })
        });
    });

    it('should return 400 status code when input validation fails', async () => {
        const mockEvent: APIGatewayProxyEvent = {
            body: JSON.stringify({ name: '' })
        } as APIGatewayProxyEvent;

        (CreatePeopleInput.validate as jest.Mock).mockReturnValue('Name is required');

        const result = await createPeopleFunction.handle(mockEvent);

        expect(CreatePeopleInput.validate).toHaveBeenCalledWith({ name: '' });
        expect(result).toEqual({
            statusCode: 400,
            body: JSON.stringify({ mensaje: 'Name is required' })
        });
    });

    it('should handle empty body', async () => {
        const mockEvent: APIGatewayProxyEvent = {} as APIGatewayProxyEvent;

        (CreatePeopleInput.validate as jest.Mock).mockReturnValue('Invalid input');

        const result = await createPeopleFunction.handle(mockEvent);

        expect(CreatePeopleInput.validate).toHaveBeenCalledWith({});
        expect(result).toEqual({
            statusCode: 400,
            body: JSON.stringify({ mensaje: 'Invalid input' })
        });
    });
});