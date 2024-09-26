import {GetAllPeopleStorageFunction} from "../../../../src/infrastructure/api/functions/GetAllPeopleStorageFunction";
import {PeopleRepository} from "../../../../src/domain/repositories/PeopleRepository";
import {GetAllPeopleMapper} from "../../../../src/infrastructure/mappers/GetAllPeopleMapper";
import {GetAllPeopleStorageUsecase} from "../../../../src/application/usecases/GetAllPeopleStorageUsecase";
import {APIGatewayProxyEvent} from "aws-lambda";
import {PeopleInterface} from "../../../../src/domain/interfaces/PeopleInterface";
import {SpecieInterface} from "../../../../src/domain/interfaces/SpecieInterface";
import {StarshipInterface} from "../../../../src/domain/interfaces/StarshipInterface";
import {VehicleInterface} from "../../../../src/domain/interfaces/VehicleInterface";
import {FilmInterface} from "../../../../src/domain/interfaces/FilmInterface";
import {PeopleEntity} from "../../../../src/domain/entities/PeopleEntity";
import {PeopleInputInterfaz} from "../../../../src/infrastructure/api/interfaces/PeopleInputInterfaz";
import {EspecieInterfaz} from "../../../../src/infrastructure/api/interfaces/EspecieInterfaz";
import {NaveInterfaz} from "../../../../src/infrastructure/api/interfaces/NaveInterfaz";
import {VehiculoInterfaz} from "../../../../src/infrastructure/api/interfaces/VehiculoInterfaz";
import {PeliculaInterfaz} from "../../../../src/infrastructure/api/interfaces/PeliculaInterfaz";
import {GetPeopleOutput} from "../../../../src/infrastructure/api/outputs/GetPeopleOutput";

jest.mock('../../../../src/application/usecases/GetAllPeopleStorageUsecase');
jest.mock('../../../../src/infrastructure/mappers/GetAllPeopleMapper');

describe('GetAllPeopleStorageFunction', () => {
    let getAllPeopleStorageFunction: GetAllPeopleStorageFunction;
    let mockPeopleRepository: jest.Mocked<PeopleRepository>;
    let mockGetAllPeopleMapper: jest.Mocked<GetAllPeopleMapper>;
    let mockGetAllPeopleStorageUsecase: jest.Mocked<GetAllPeopleStorageUsecase>;

    beforeEach(() => {
        mockPeopleRepository = {} as jest.Mocked<PeopleRepository>;
        mockGetAllPeopleMapper = {
            fromEntitiesToOutput: jest.fn()
        } as unknown as jest.Mocked<GetAllPeopleMapper>;

        mockGetAllPeopleStorageUsecase = {
            run: jest.fn()
        } as unknown as jest.Mocked<GetAllPeopleStorageUsecase>;

        (GetAllPeopleStorageUsecase as jest.Mock).mockImplementation(() => mockGetAllPeopleStorageUsecase);

        getAllPeopleStorageFunction = new GetAllPeopleStorageFunction(mockPeopleRepository, mockGetAllPeopleMapper);
    });

    it('should get all people successfully', async () => {
        const mockEvent: APIGatewayProxyEvent = {} as APIGatewayProxyEvent;
        const people: PeopleInterface = {
            uuid: "",
            id: 1,
            birth_year: "19 BBY",
            eye_color: "Blue",
            gender: "Male",
            hair_color: "Blond",
            height: "172",
            homeworld: "https://swapi.dev/api/planets/1/",
            mass: "77",
            name: "Luke Skywalker",
            skin_color: "Fair",
            url:  "https://swapi.dev/api/people/1/",
        }
        const specieInterface: SpecieInterface[] =  [{ url: "https://swapi.dev/api/species/1/" }];
        const starship: StarshipInterface[] =  [{ url: "hhttps://swapi.dev/api/starships/12/" }];
        const vehicle: VehicleInterface[] =  [{ url: "https://swapi.dev/api/vehicles/14/" }];
        const film: FilmInterface[] =  [{ url: "https://swapi.dev/api/films/1/" }];

        const peopleEntityMock = new PeopleEntity(people,specieInterface,starship,vehicle,film);

        const peopleTwo: PeopleInterface = {
            uuid: "",
            id: 2,
            birth_year: "19 BBY",
            eye_color: "Blue",
            gender: "Male",
            hair_color: "Blond",
            height: "172",
            homeworld: "https://swapi.dev/api/planets/1/",
            mass: "77",
            name: "Luke Skywalker",
            skin_color: "Fair",
            url:  "https://swapi.dev/api/people/1/",
        }
        const specieInterfaceTwo: SpecieInterface[] =  [{ url: "https://swapi.dev/api/species/1/" }];
        const starshipTwo: StarshipInterface[] =  [{ url: "hhttps://swapi.dev/api/starships/12/" }];
        const vehicleTwo: VehicleInterface[] =  [{ url: "https://swapi.dev/api/vehicles/14/" }];
        const filmTwo: FilmInterface[] =  [{ url: "https://swapi.dev/api/films/1/" }];

        const peopleEntityMockTwo = new PeopleEntity(peopleTwo,specieInterfaceTwo,starshipTwo,vehicleTwo,filmTwo);

        const mockPeople = [peopleEntityMock, peopleEntityMockTwo];

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

        const peopleTranslatedMock = new GetPeopleOutput(peopleTranslated,especieInterfaz,naveInterfaz,vehiculoInterfaz,peliculaInterfaz);

        const peopleTranslatedTwo: PeopleInputInterfaz = {
            id: 2,
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
        const especieInterfazTwo: EspecieInterfaz[] =  [{ url: "https://swapi.dev/api/species/1/" }];
        const naveInterfazTwo: NaveInterfaz[] =  [{ url: "https://swapi.dev/api/starships/12/" }];
        const vehiculoInterfazTwo: VehiculoInterfaz[] =  [{ url: "https://swapi.dev/api/vehicles/14/" }];
        const peliculaInterfazTwo: PeliculaInterfaz[] =  [{ url: "https://swapi.dev/api/films/1/" }];

        const peopleTranslatedMockTwo = new GetPeopleOutput(peopleTranslatedTwo,especieInterfazTwo,naveInterfazTwo,vehiculoInterfazTwo,peliculaInterfazTwo);

        const mockTranslatedPeople: GetPeopleOutput[] = [peopleTranslatedMock, peopleTranslatedMockTwo];

        mockGetAllPeopleStorageUsecase.run.mockResolvedValue(mockPeople);
        mockGetAllPeopleMapper.fromEntitiesToOutput.mockReturnValue(mockTranslatedPeople);

        const result = await getAllPeopleStorageFunction.handle(mockEvent);

        expect(mockGetAllPeopleStorageUsecase.run).toHaveBeenCalled();
        expect(mockGetAllPeopleMapper.fromEntitiesToOutput).toHaveBeenCalledWith(mockPeople);
        expect(result).toEqual({
            statusCode: 200,
            body: JSON.stringify(mockTranslatedPeople)
        });
    });

    it('should return an empty array when no people are found', async () => {
        const mockEvent: APIGatewayProxyEvent = {} as APIGatewayProxyEvent;

        mockGetAllPeopleStorageUsecase.run.mockResolvedValue([]);
        mockGetAllPeopleMapper.fromEntitiesToOutput.mockReturnValue([]);

        const result = await getAllPeopleStorageFunction.handle(mockEvent);

        expect(mockGetAllPeopleStorageUsecase.run).toHaveBeenCalled();
        expect(mockGetAllPeopleMapper.fromEntitiesToOutput).toHaveBeenCalledWith([]);
        expect(result).toEqual({
            statusCode: 200,
            body: JSON.stringify([])
        });
    });

    it('should handle errors from the usecase', async () => {
        const mockEvent: APIGatewayProxyEvent = {} as APIGatewayProxyEvent;

        mockGetAllPeopleStorageUsecase.run.mockRejectedValue(new Error('Database error'));

        await expect(getAllPeopleStorageFunction.handle(mockEvent)).rejects.toThrow('Database error');
    });

});