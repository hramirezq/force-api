import {GetAllPeopleHandler} from "../../src/handlers/GetAllPeopleHandler";
import {DynamoDBPeopleRepository} from "../../src/infrastructure/repositories/DynamoDBPeopleRepository";
import {PeopleAdapter} from "../../src/adapters/PeopleAdapter";
import {PeopleModel} from "../../src/infrastructure/models/PeopleModel";
import {PeopleSpanish} from "../../src/infrastructure/translated-objects/PeopleSpanish";
import {APIGatewayProxyEvent} from "aws-lambda";
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

describe('GetAllPeopleHandler', () => {
    let getAllPeopleHandler: GetAllPeopleHandler;
    let mockPeopleRepository: jest.Mocked<DynamoDBPeopleRepository>;
    let mockPeopleAdapter: jest.Mocked<PeopleAdapter>;

    beforeEach(() => {
        mockPeopleRepository = {
            findAll: jest.fn(),
        } as unknown as jest.Mocked<DynamoDBPeopleRepository>;

        mockPeopleAdapter = {
            fromListEnglishToListSpanish: jest.fn(),
        } as unknown as jest.Mocked<PeopleAdapter>;

        getAllPeopleHandler = new GetAllPeopleHandler(mockPeopleRepository, mockPeopleAdapter);
    });

    it('should return a list of people successfully', async () => {

        const specie: SpecieModel = new SpecieModel("https://swapi.dev/api/species/1/");
        const starship: StarshipModel = new StarshipModel("hhttps://swapi.dev/api/starships/12/");
        const vehicle: VehicleModel = new VehicleModel("https://swapi.dev/api/vehicles/14/");
        const film: FilmModel = new FilmModel("https://swapi.dev/api/vehicles/14/") ;

        const specieList: SpecieModel[] =  [specie];
        const starshipList: StarshipModel[] =  [starship];
        const vehicleList: VehicleModel[] =  [vehicle];
        const filmList: FilmModel[] =  [film];

        const peopleModelMock: PeopleModel = new PeopleModel(
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

        const mockPeopleList: PeopleModel[] = [
            peopleModelMock,
        ];

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

        const mockTranslatedPeopleList: PeopleSpanish[] = [
            mockPeopleSpanish
        ];

        mockPeopleRepository.findAll.mockResolvedValue(mockPeopleList);
        mockPeopleAdapter.fromListEnglishToListSpanish.mockReturnValue(mockTranslatedPeopleList);

        const mockEvent = {} as APIGatewayProxyEvent;

        const result = await getAllPeopleHandler.handle(mockEvent);

        expect(result.statusCode).toBe(200);
        console.log(mockTranslatedPeopleList);
        expect(JSON.parse(result.body)).toEqual(mockTranslatedPeopleList.map(person => person.toJSON()));
        expect(mockPeopleRepository.findAll).toHaveBeenCalledTimes(1);
        expect(mockPeopleAdapter.fromListEnglishToListSpanish).toHaveBeenCalledWith(mockPeopleList);
    });

    it('should return an empty list when no people are found', async () => {
        mockPeopleRepository.findAll.mockResolvedValue([]);
        mockPeopleAdapter.fromListEnglishToListSpanish.mockReturnValue([]);

        const mockEvent = {} as APIGatewayProxyEvent;

        const result = await getAllPeopleHandler.handle(mockEvent);

        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body)).toEqual([]);
    });
});