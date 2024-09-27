import {SpecieModel} from "./SpecieModel";
import {StarshipModel} from "./StarshipModel";
import {VehicleModel} from "./VehicleModel";
import {FilmModel} from "./FilmModel";

export class PeopleModel {
    readonly #uuid: string;
    readonly #id: number;
    readonly #birth_year: string;
    readonly #eye_color: string;
    readonly #gender: string;
    readonly #hair_color: string;
    readonly #height: string;
    readonly #homeworld: string;
    readonly #mass: string;
    readonly #name: string;
    readonly #skin_color: string;
    readonly #url: string;
    readonly #species: SpecieModel[];
    readonly #starships: StarshipModel[];
    readonly #vehicles: VehicleModel[];
    readonly #films: FilmModel[];

    constructor(
        uuid: string,
        id: number,
        birth_year: string,
        eye_color: string,
        gender: string,
        hair_color: string,
        height: string,
        homeworld: string,
        mass: string,
        name: string,
        skin_color: string,
        url: string,
        species: SpecieModel[],
        starships: StarshipModel[],
        vehicles: VehicleModel[],
        films: FilmModel[],
    ){
        this.#uuid = uuid;
        this.#id = id;
        this.#birth_year = birth_year;
        this.#eye_color = eye_color;
        this.#gender = gender;
        this.#hair_color = hair_color;
        this.#height = height;
        this.#homeworld = homeworld;
        this.#mass = mass;
        this.#name = name;
        this.#skin_color = skin_color;
        this.#url = url;
        this.#species = species;
        this.#starships = starships;
        this.#vehicles = vehicles;
        this.#films = films;
    }

    toJSON() {
        return {
            uuid: this.uuid,
            id: this.id,
            birth_year: this.birth_year,
            eye_color: this.eye_color,
            gender: this.gender,
            hair_color: this.hair_color,
            height: this.height,
            homeworld: this.homeworld,
            mass: this.mass,
            name: this.name,
            skin_color: this.skin_color,
            url: this.url,
            species: this.species,
            starships: this.starships,
            vehicles: this.vehicles,
            films: this.films
        };
    }

    get uuid(): string {
        return this.#uuid;
    }

    get id(): number {
        return this.#id;
    }

    get birth_year(): string {
        return this.#birth_year;
    }

    get eye_color(): string {
        return this.#eye_color;
    }

    get gender(): string {
        return this.#gender;
    }

    get hair_color(): string {
        return this.#hair_color;
    }

    get height(): string {
        return this.#height;
    }

    get homeworld(): string {
        return this.#homeworld;
    }

    get mass(): string {
        return this.#mass;
    }

    get name(): string {
        return this.#name;
    }

    get skin_color(): string {
        return this.#skin_color;
    }

    get url(): string {
        return this.#url;
    }

    get species(): SpecieModel[] {
        return this.#species;
    }

    get starships(): StarshipModel[] {
        return this.#starships;
    }

    get vehicles(): VehicleModel[] {
        return this.#vehicles;
    }

    get films(): FilmModel[] {
        return this.#films;
    }
}