import {CreatePeopleHandler} from "../../src/handlers/CreatePeopleHandler";
import {PeopleAdapter} from "../../src/adapters/PeopleAdapter";
import {DynamoDBPeopleRepository} from "../../src/infrastructure/repositories/DynamoDBPeopleRepository";
import {APIGatewayProxyEvent} from "aws-lambda";
import {PeopleSpanish} from "../../src/infrastructure/translated-objects/PeopleSpanish";
import {PeopleModel} from "../../src/infrastructure/models/PeopleModel";
import {SpecieModel} from "../../src/infrastructure/models/SpecieModel";
import {StarshipModel} from "../../src/infrastructure/models/StarshipModel";
import {VehicleModel} from "../../src/infrastructure/models/VehicleModel";
import {FilmModel} from "../../src/infrastructure/models/FilmModel";
import {FilmSpanish} from "../../src/infrastructure/translated-objects/FilmSpanish";
import {SpecieSpanish} from "../../src/infrastructure/translated-objects/SpecieSpanish";
import {StarshipSpanish} from "../../src/infrastructure/translated-objects/StarshipSpanish";
import {VehicleSpanish} from "../../src/infrastructure/translated-objects/VehicleSpanish";

jest.mock('../../src/adapters/PeopleAdapter');
jest.mock('../../src/infrastructure/repositories/DynamoDBPeopleRepository');
jest.mock('uuid', () => ({ v4: () => 'mocked-uuid' }));

describe('CreatePeopleHandler', () => {
    let createPeopleHandler: CreatePeopleHandler;
    let mockPeopleAdapter: jest.Mocked<PeopleAdapter>;
    let mockPeopleRepository: jest.Mocked<DynamoDBPeopleRepository>;

    beforeEach(() => {
        mockPeopleAdapter = {
            fromSpanishToEnglish: jest.fn(),
            fromEntityToOutput: jest.fn()
        } as unknown as jest.Mocked<PeopleAdapter>;

        mockPeopleRepository = {
            save: jest.fn()
        } as unknown as jest.Mocked<DynamoDBPeopleRepository>;

        createPeopleHandler = new CreatePeopleHandler(mockPeopleAdapter, mockPeopleRepository);
    });

    it('should create a person successfully', async () => {
        const mockPeopleSpanish = new PeopleSpanish(
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
            [] as FilmSpanish[],
            [] as SpecieSpanish[],
            [] as StarshipSpanish[],
            [] as VehicleSpanish[]
        );

        const mockEvent: Partial<APIGatewayProxyEvent> = {
            body: JSON.stringify(mockPeopleSpanish.toJSON())
        };

        const specie: SpecieModel = new SpecieModel("https://swapi.dev/api/species/1/");
        const starship: StarshipModel = new StarshipModel("hhttps://swapi.dev/api/starships/12/");
        const vehicle: VehicleModel = new VehicleModel("https://swapi.dev/api/vehicles/14/");
        const film: FilmModel = new FilmModel("https://swapi.dev/api/vehicles/14/") ;

        const specieList: SpecieModel[] =  [specie];
        const starshipList: StarshipModel[] =  [starship];
        const vehicleList: VehicleModel[] =  [vehicle];
        const filmList: FilmModel[] =  [film];

        const people: PeopleModel = new PeopleModel(
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
            specieList,
            starshipList,
            vehicleList,
            filmList,
        );

        mockPeopleAdapter.fromSpanishToEnglish.mockReturnValue(people);

        mockPeopleRepository.save.mockResolvedValue();

        const result = await createPeopleHandler.handle(mockEvent as APIGatewayProxyEvent);

        expect(result.statusCode).toBe(201);
        expect(JSON.parse(result.body)).toEqual({ mensaje: 'Personaje creado exitosamente' });
        expect(mockPeopleAdapter.fromSpanishToEnglish).toHaveBeenCalled();
        expect(mockPeopleRepository.save).toHaveBeenCalledWith(expect.any(PeopleModel));
    });

    it('should return 400 if required fields are missing', async () => {
        const invalidData = {
            nombre: 'Luke Skywalker'
            // Missing other required fields
        };

        const mockEvent: Partial<APIGatewayProxyEvent> = {
            body: JSON.stringify(invalidData)
        };

        const result = await createPeopleHandler.handle(mockEvent as APIGatewayProxyEvent);

        expect(result.statusCode).toBe(400);
        expect(JSON.parse(result.body)).toEqual({ mensaje: expect.any(String) });
    });

});