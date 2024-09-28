import {GetPeopleHandler} from "../../src/handlers/GetPeopleHandler";
import {DynamoDBPeopleRepository} from "../../src/infrastructure/repositories/DynamoDBPeopleRepository";
import {PeopleAdapter} from "../../src/adapters/PeopleAdapter";
import {ExternalApiService} from "../../src/services/ExternalApiService";
import {APIGatewayProxyEvent} from "aws-lambda";
import {PeopleModel} from "../../src/infrastructure/models/PeopleModel";
import {PeopleSpanish} from "../../src/infrastructure/translated-objects/PeopleSpanish";
import {SpecieModel} from "../../src/infrastructure/models/SpecieModel";
import {StarshipModel} from "../../src/infrastructure/models/StarshipModel";
import {VehicleModel} from "../../src/infrastructure/models/VehicleModel";
import {FilmModel} from "../../src/infrastructure/models/FilmModel";
import {FilmSpanish} from "../../src/infrastructure/translated-objects/FilmSpanish";
import {SpecieSpanish} from "../../src/infrastructure/translated-objects/SpecieSpanish";
import {StarshipSpanish} from "../../src/infrastructure/translated-objects/StarshipSpanish";
import {VehicleSpanish} from "../../src/infrastructure/translated-objects/VehicleSpanish";

jest.mock('../../src/infrastructure/repositories/DynamoDBPeopleRepository');
jest.mock('../../src/adapters/PeopleAdapter');
jest.mock('../../src/services/ExternalApiService');
jest.mock('uuid', () => ({ v4: () => 'mocked-uuid' }));

describe('GetPeopleHandler', () => {
    let getPeopleHandler: GetPeopleHandler;
    let mockPeopleRepository: jest.Mocked<DynamoDBPeopleRepository>;
    let mockPeopleAdapter: jest.Mocked<PeopleAdapter>;
    let mockExternalApiService: jest.Mocked<ExternalApiService>;

    beforeEach(() => {
        mockPeopleRepository = {
            findById: jest.fn(),
            save: jest.fn(),
        } as unknown as jest.Mocked<DynamoDBPeopleRepository>;

        mockPeopleAdapter = {
            fromEnglishToSpanish: jest.fn(),
        } as unknown as jest.Mocked<PeopleAdapter>;

        mockExternalApiService = {
            getPeopleById: jest.fn(),
        } as unknown as jest.Mocked<ExternalApiService>;

        getPeopleHandler = new GetPeopleHandler(mockPeopleRepository, mockPeopleAdapter, mockExternalApiService);
    });

    describe('handle method', () => {
        it('should return 400 if id is missing', async () => {
            const mockEvent = {
                pathParameters: {},
            } as unknown as APIGatewayProxyEvent;

            const result = await getPeopleHandler.handle(mockEvent);

            expect(result.statusCode).toBe(400);
            expect(JSON.parse(result.body)).toEqual({ mensaje: 'El identificador es requerido.' });
        });

        it('should return 400 if id is negative', async () => {
            const mockEvent = {
                pathParameters: { id: '-1' },
            } as unknown as APIGatewayProxyEvent;

            const result = await getPeopleHandler.handle(mockEvent);

            expect(result.statusCode).toBe(400);
            expect(JSON.parse(result.body)).toEqual({ mensaje: 'El identificador es requerido o no puede ser menor que cero.' });
        });

        it('should return people from repository if found', async () => {
            const mockEvent = {
                pathParameters: { id: '1' },
            } as unknown as APIGatewayProxyEvent;

            const mockPeople = new PeopleModel(
                "1",
                1,
                "19BBY",
                "blue",
                "male",
                "blond",
                "172",
                "https://swapi.dev/api/planets/1/",
                "77",
                "Luke Skywalker",
                "fair",
                "https://swapi.dev/api/people/1/",
                [] as SpecieModel[],
                [] as StarshipModel[],
                [] as VehicleModel[],
                [] as FilmModel[]
            );

            const mockTranslatedPeople = new PeopleSpanish(
                1,
                'Luke Skywalker',
                '19 BBY',
                'azul',
                'masculino',
                'rubio',
                '77',
                '172',
                'claro',
                'Tatooine',
                'https://swapi.dev/api/people/1/',
                [] as FilmSpanish[],
                [] as SpecieSpanish[],
                [] as StarshipSpanish[],
                [] as VehicleSpanish[]
            );

            mockPeopleRepository.findById.mockResolvedValue(mockPeople);
            mockPeopleAdapter.fromEnglishToSpanish.mockReturnValue(mockTranslatedPeople);

            const result = await getPeopleHandler.handle(mockEvent);

            expect(result.statusCode).toBe(200);
            expect(JSON.parse(result.body)).toEqual(mockTranslatedPeople.toJSON());
            expect(mockPeopleRepository.findById).toHaveBeenCalledWith(1);
            expect(mockPeopleAdapter.fromEnglishToSpanish).toHaveBeenCalledWith(mockPeople);
        });

        it('should fetch people from external API if not found in repository', async () => {
            const mockEvent = {
                pathParameters: { id: '1' },
            } as unknown as APIGatewayProxyEvent;

            mockPeopleRepository.findById.mockResolvedValue(null);

            const mockApiResponse = {
                id: 1,
                birth_year: '19BBY',
                eye_color: 'blue',
                gender: "male",
                hair_color: "blond",
                height: "172",
                homeworld: "https://swapi.dev/api/planets/1/",
                mass: "77",
                name: "Luke Skywalker",
                skin_color: "fair",
                url: 'https://swapi.dev/api/people/1/',
                species :[],
                starships: [],
                vehicles: [],
                films: []
            };

            mockExternalApiService.getPeopleById.mockResolvedValue(mockApiResponse);

            const mockTranslatedPeople = new PeopleSpanish(
                1,
                "19BBY",
                "blue",
                "male",
                "blond",
                "172",
                "https://swapi.dev/api/planets/1/",
                "77",
                "Luke Skywalker",
                "fair",
                'https://swapi.dev/api/people/1/',
                [] as FilmSpanish[],
                [] as SpecieSpanish[],
                [] as StarshipSpanish[],
                [] as VehicleSpanish[]
            );
            mockPeopleAdapter.fromEnglishToSpanish.mockReturnValue(mockTranslatedPeople);

            const result = await getPeopleHandler.handle(mockEvent);

            expect(result.statusCode).toBe(200);
            expect(JSON.parse(result.body)).toEqual(mockTranslatedPeople.toJSON());
            expect(mockPeopleRepository.findById).toHaveBeenCalledWith(1);
            expect(mockExternalApiService.getPeopleById).toHaveBeenCalledWith(1);
            expect(mockPeopleRepository.save).toHaveBeenCalled();
            expect(mockPeopleAdapter.fromEnglishToSpanish).toHaveBeenCalled();
        });
    });

    describe('validate method', () => {
        it('should return error message if id is undefined', () => {
            const result = getPeopleHandler.validate(undefined);
            expect(result).toBe('El identificador es requerido.');
        });

        it('should return error message if id is not a number', () => {
            const result = getPeopleHandler.validate('not-a-number');
            expect(result).toBe('El identificador es requerido o no puede ser menor que cero.');
        });

        it('should return error message if id is negative', () => {
            const result = getPeopleHandler.validate('-1');
            expect(result).toBe('El identificador es requerido o no puede ser menor que cero.');
        });

        it('should return empty string for valid id', () => {
            const result = getPeopleHandler.validate('1');
            expect(result).toBe('');
        });
    });
});