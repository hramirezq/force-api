import {GetAllPeopleStorageFunction} from "../../../../src/infrastructure/api/functions/GetAllPeopleStorageFunction";
import {PeopleRepository} from "../../../../src/domain/repositories/PeopleRepository";
import {GetAllPeopleMapper} from "../../../../src/infrastructure/mappers/GetAllPeopleMapper";
import {GetAllPeopleStorageUsecase} from "../../../../src/application/usecases/GetAllPeopleStorageUsecase";
import {APIGatewayProxyEvent} from "aws-lambda";

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

        const mockPeople = [
            {
                uuid: "",
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
            },
            {
                uuid: "",
                id: 2,
                birth_year: "19 BBY",
                eye_color: "Blue",
                films: ["https://swapi.dev/api/films/1/",],
                gender: "Male",
                hair_color: "Blond",
                height: "172",
                homeworld: "https://swapi.dev/api/planets/1/",
                mass: "77",
                name: "Darth Vader",
                skin_color: "Fair",
                species: [ "https://swapi.dev/api/species/1/"],
                starships: [ "https://swapi.dev/api/starships/12/",],
                url:  "https://swapi.dev/api/people/1/",
                vehicles: [ "https://swapi.dev/api/vehicles/14/"],
            }
        ];
        const mockTranslatedPeople = [
            {
                uuid: "",
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
            },
            {
                uuid: "",
                id: 2,
                año_de_nacimiento: "19 BBY",
                color_de_ojos: "Blue",
                peliculas: ["https://swapi.dev/api/films/1/",],
                genero: "Male",
                color_de_pelo: "Blond",
                peso: "172",
                mundo_natal: "https://swapi.dev/api/planets/1/",
                masa: "77",
                nombre: "Darth Vader",
                color_de_piel: "Fair",
                especies: [ "https://swapi.dev/api/species/1/"],
                naves: [ "https://swapi.dev/api/starships/12/",],
                url:  "https://swapi.dev/api/people/1/",
                vehiculos: [ "https://swapi.dev/api/vehicles/14/"],
            }
        ];

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