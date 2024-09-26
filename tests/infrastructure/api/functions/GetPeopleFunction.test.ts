import {GetPeopleFunction} from "../../../../src/infrastructure/api/functions/GetPeopleFunction";
import {PeopleRepository} from "../../../../src/domain/repositories/PeopleRepository";
import {ExternalApiService} from "../../../../src/domain/services/ExternalApiService";
import {GetPeopleMapper} from "../../../../src/infrastructure/mappers/GetPeopleMapper";
import {GetPeopleByIdUsecase} from "../../../../src/application/usecases/GetPeopleByIdUsecase";
import {APIGatewayProxyEvent} from "aws-lambda";
import {GetPeopleInput} from "../../../../src/infrastructure/api/inputs/GetPeopleInput";
import {GetPeopleByIdQuery} from "../../../../src/application/queries/GetPeopleByIdQuery";
import {PeopleInterface} from "../../../../src/domain/interfaces/PeopleInterface";
import {SpecieInterface} from "../../../../src/domain/interfaces/SpecieInterface";
import {StarshipInterface} from "../../../../src/domain/interfaces/StarshipInterface";
import {VehicleInterface} from "../../../../src/domain/interfaces/VehicleInterface";
import {FilmInterface} from "../../../../src/domain/interfaces/FilmInterface";
import {CreatePeopleCommand} from "../../../../src/application/commands/CreatePeopleCommand";
import {PeopleEntity} from "../../../../src/domain/entities/PeopleEntity";
import {PeopleInputInterfaz} from "../../../../src/infrastructure/api/interfaces/PeopleInputInterfaz";
import {EspecieInterfaz} from "../../../../src/infrastructure/api/interfaces/EspecieInterfaz";
import {NaveInterfaz} from "../../../../src/infrastructure/api/interfaces/NaveInterfaz";
import {VehiculoInterfaz} from "../../../../src/infrastructure/api/interfaces/VehiculoInterfaz";
import {PeliculaInterfaz} from "../../../../src/infrastructure/api/interfaces/PeliculaInterfaz";
import {GetPeopleOutput} from "../../../../src/infrastructure/api/outputs/GetPeopleOutput";

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

        const people: PeopleInterface = {
            uuid: "1",
            id: 1,
            birth_year: "19BBY",
            eye_color: "blue",
            gender: "male",
            hair_color: "blond",
            height: "172",
            homeworld: "https://swapi.dev/api/planets/1/",
            mass: "77",
            name: "Luke Skywalker",
            skin_color: "fair",
            url: "https://swapi.dev/api/people/1/"
        };
        const specieInterface: SpecieInterface[] =  [{ url: "https://swapi.dev/api/species/1/" }];
        const starship: StarshipInterface[] =  [{ url: "hhttps://swapi.dev/api/starships/12/" }];
        const vehicle: VehicleInterface[] =  [{ url: "https://swapi.dev/api/vehicles/14/" }];
        const film: FilmInterface[] =  [{ url: "https://swapi.dev/api/vehicles/14/" }];

        const mockPerson = new PeopleEntity(people, specieInterface, starship, vehicle, film);

        const peopleTranslated: PeopleInputInterfaz = {
            id: 1,
            año_de_nacimiento: "19 BBY",
            color_de_ojos: "Blue",
            genero: "Male",
            color_de_pelo: "Blond",
            peso: "172",
            mundo_natal: "https://swapi.dev/api/planets/1/",
            masa: "77",
            nombre: "Luke Skywalker",
            color_de_piel: "Fair",
            url:  "https://swapi.dev/api/people/1/",
        }
        const especieInterfaz: EspecieInterfaz[] =  [{ url: "https://swapi.dev/api/species/1/" }];
        const naveInterfaz: NaveInterfaz[] =  [{ url: "https://swapi.dev/api/starships/12/" }];
        const vehiculoInterfaz: VehiculoInterfaz[] =  [{ url: "https://swapi.dev/api/vehicles/14/" }];
        const peliculaInterfaz: PeliculaInterfaz[] =  [{ url: "https://swapi.dev/api/films/1/" }];
        const mockTranslatedPerson = new GetPeopleOutput(peopleTranslated,especieInterfaz,naveInterfaz,vehiculoInterfaz,peliculaInterfaz);

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