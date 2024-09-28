import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {PeopleSpanish} from "../infrastructure/translated-objects/PeopleSpanish";
import {PeopleAdapter} from "../adapters/PeopleAdapter";
import {DynamoDBPeopleRepository} from "../infrastructure/repositories/DynamoDBPeopleRepository";
import { v4 as uuidv4 } from "uuid";
import {PeopleModel} from "../infrastructure/models/PeopleModel";
import {TranslateService} from "../services/TranslateService";

export class CreatePeopleHandler {
    private peopleAdapter: PeopleAdapter;
    private peopleRepository: DynamoDBPeopleRepository;
    constructor(
        peopleAdapter: PeopleAdapter,
        peopleRepository: DynamoDBPeopleRepository
    ) {
        this.peopleAdapter = peopleAdapter;
        this.peopleRepository = peopleRepository;
    }
    public async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        const body = JSON.parse(event.body || '{}') as PeopleSpanish;
        let errorMessage = this.validate(body)
        if(errorMessage != ""){
            return {
                statusCode: 400,
                body: JSON.stringify({ mensaje: errorMessage })
            };
        }
        const people = this.peopleAdapter.fromSpanishToEnglish(body);
        const uuid = uuidv4();
        const peopleModel = new PeopleModel(
            uuid,
            people.id,
            people.birth_year,
            people.eye_color,
            people.gender,
            people.hair_color,
            people.height,
            people.homeworld,
            people.mass,
            people.name,
            people.skin_color,
            people.url,
            people.species,
            people.starships,
            people.vehicles,
            people.films
        );
        await this.peopleRepository.save(peopleModel);
        return {
            statusCode: 201,
            body: JSON.stringify({ mensaje: 'Personaje creado exitosamente' })
        };
    }

    public validate(data: PeopleSpanish): string {
        if (!data.id) {
            return "El campo id es requerido.";
        }
        if (!data.nombre) {
            return "El campo nombre es requerido.";
        }
        if (!data.año_de_nacimiento) {
            return "El campo año_de_nacimiento es requerido.";
        }
        if (!data.color_de_ojos) {
            return "El campo color_de_ojos es requerido.";
        }
        if (!data.genero) {
            return "El campo genero es requerido.";
        }
        if (!data.color_de_pelo) {
            return "El campo color_de_pelo es requerido.";
        }
        if (!data.peso) {
            return "El campo peso es requerido.";
        }
        if (!data.masa) {
            return "El campo masa es requerido.";
        }
        if (!data.color_de_piel) {
            return "El campo color_de_piel es requerido.";
        }
        if (!data.mundo_natal) {
            return "El campo mundo_natal es requerido.";
        }
        if (!data.peliculas) {
            return "El campo peliculas es requerido.";
        }
        if (!data.especies) {
            return "El campo especies es requerido.";
        }
        if (!data.naves) {
            return "El campo naves es requerido.";
        }
        if (!data.vehiculos) {
            return "El campo vehiculos es requerido.";
        }
        if (!data.url) {
            return "El campo url es requerido.";
        }

        return "";
    }
}
const translateService = new TranslateService<PeopleModel, PeopleSpanish>();
const peopleAdapter = new PeopleAdapter(translateService);
const peopleRepository = new DynamoDBPeopleRepository();

const controller = new CreatePeopleHandler(peopleAdapter, peopleRepository);
export const createPeople = (event: APIGatewayProxyEvent) => controller.handle(event);