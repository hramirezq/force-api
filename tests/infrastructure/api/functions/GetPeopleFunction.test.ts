import {GetPeopleFunction} from "../../../../src/infrastructure/api/functions/GetPeopleFunction";
import {PeopleRepository} from "../../../../src/domain/repositories/PeopleRepository";
import {ExternalApiService} from "../../../../src/domain/services/ExternalApiService";
import {GetPeopleMapper} from "../../../../src/infrastructure/mappers/GetPeopleMapper";
import {GetPeopleByIdUsecase} from "../../../../src/application/usecases/GetPeopleByIdUsecase";
import {APIGatewayProxyEvent} from "aws-lambda";
import {GetPeopleInput} from "../../../../src/infrastructure/api/inputs/GetPeopleInput";
import {GetPeopleByIdQuery} from "../../../../src/application/queries/GetPeopleByIdQuery";

jest.mock('../../../../src/infrastructure/api/inputs/GetPeopleInput');
jest.mock('../../../../src/application/usecases/GetPeopleByIdUsecase');
jest.mock('../../../../src/infrastructure/mappers/GetPeopleMapper');

describe('GetPeopleFunction', () => {
    let getPeopleFunction: GetPeopleFunction;
    let mockPeopleRepository: jest.Mocked<PeopleRepository>;
    let mockExternalApiService: jest.Mocked<ExternalApiService>;
    let mockGetPeopleMapper: jest.Mocked<GetPeopleMapper>;
    let mockGetPeopleByIdUsecase: jest.Mocked<GetPeopleByIdUsecase>;

    beforeEach(() => {
        mockPeopleRepository = {} as jest.Mocked<PeopleRepository>;
        mockExternalApiService = {} as jest.Mocked<ExternalApiService>;
        mockGetPeopleMapper = {
            fromEntityToOutput: jest.fn()
        } as unknown as jest.Mocked<GetPeopleMapper>;

        mockGetPeopleByIdUsecase = {
            run: jest.fn()
        } as unknown as jest.Mocked<GetPeopleByIdUsecase>;

        (GetPeopleByIdUsecase as jest.Mock).mockImplementation(() => mockGetPeopleByIdUsecase);

        getPeopleFunction = new GetPeopleFunction(mockPeopleRepository, mockExternalApiService, mockGetPeopleMapper);
    });

    it('should get a person successfully', async () => {
        const mockEvent: APIGatewayProxyEvent = {
            pathParameters: { id: '1' }
        } as unknown as APIGatewayProxyEvent;

        const mockPerson = {
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
        };
        const mockTranslatedPerson = {
            id: 1,
            año_de_nacimiento: "19 BBY",
            color_de_ojos: "Blue",
            peliculas: ["https://swapi.dev/api/films/1/",],
            genero: "Male",
            color_de_pelo: "Blond",
            peso: "172",
            mundo_natal: "https://swapi.dev/api/planets/1/",
            masa: "77",
            nombre: "Luke Skywalker",
            color_de_piel: "Fair",
            especies: [ "https://swapi.dev/api/species/1/"],
            naves: [ "https://swapi.dev/api/starships/12/",],
            url:  "https://swapi.dev/api/people/1/",
            vehiculos: [ "https://swapi.dev/api/vehicles/14/"],
        };

        (GetPeopleInput.validate as jest.Mock).mockReturnValue('');
        mockGetPeopleByIdUsecase.run.mockResolvedValue(mockPerson);
        mockGetPeopleMapper.fromEntityToOutput.mockReturnValue(mockTranslatedPerson);

        const result = await getPeopleFunction.handle(mockEvent);

        expect(GetPeopleInput.validate).toHaveBeenCalledWith('1');
        expect(mockGetPeopleByIdUsecase.run).toHaveBeenCalledWith(expect.any(GetPeopleByIdQuery));
        expect(mockGetPeopleMapper.fromEntityToOutput).toHaveBeenCalledWith(mockPerson);
        expect(result).toEqual({
            statusCode: 200,
            body: JSON.stringify(mockTranslatedPerson)
        });
    });

    it('should return 400 status code when input validation fails', async () => {
        const mockEvent: APIGatewayProxyEvent = {
            pathParameters: { id: 'invalid' }
        } as unknown as APIGatewayProxyEvent;

        (GetPeopleInput.validate as jest.Mock).mockReturnValue('Invalid ID');

        const result = await getPeopleFunction.handle(mockEvent);

        expect(GetPeopleInput.validate).toHaveBeenCalledWith('invalid');
        expect(result).toEqual({
            statusCode: 400,
            body: JSON.stringify({ mensaje: 'Invalid ID' })
        });
    });

    it('should return 404 status code when person is not found', async () => {
        const mockEvent: APIGatewayProxyEvent = {
            pathParameters: { id: '999' }
        } as unknown as APIGatewayProxyEvent;

        (GetPeopleInput.validate as jest.Mock).mockReturnValue('');
        mockGetPeopleByIdUsecase.run.mockResolvedValue(null);

        const result = await getPeopleFunction.handle(mockEvent);

        expect(GetPeopleInput.validate).toHaveBeenCalledWith('999');
        expect(mockGetPeopleByIdUsecase.run).toHaveBeenCalledWith(expect.any(GetPeopleByIdQuery));
        expect(result).toEqual({
            statusCode: 404,
            body: 'People not found'
        });
    });

    it('should handle missing path parameters', async () => {
        const mockEvent: APIGatewayProxyEvent = {} as APIGatewayProxyEvent;

        (GetPeopleInput.validate as jest.Mock).mockReturnValue('ID is required');

        const result = await getPeopleFunction.handle(mockEvent);

        expect(GetPeopleInput.validate).toHaveBeenCalledWith(undefined);
        expect(result).toEqual({
            statusCode: 400,
            body: JSON.stringify({ mensaje: 'ID is required' })
        });
    });
});