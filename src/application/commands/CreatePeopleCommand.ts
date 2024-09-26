import {PeopleInterface} from "../../domain/interfaces/PeopleInterface";
import {SpecieInterface} from "../../domain/interfaces/SpecieInterface";
import {StarshipInterface} from "../../domain/interfaces/StarshipInterface";
import {VehicleInterface} from "../../domain/interfaces/VehicleInterface";
import {FilmInterface} from "../../domain/interfaces/FilmInterface";

export class CreatePeopleCommand {
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
    readonly #species: SpecieInterface[];
    readonly #starships: StarshipInterface[];
    readonly #vehicles: VehicleInterface[];
    readonly #films: FilmInterface[];

    constructor(
        people: PeopleInterface,
        species: SpecieInterface[],
        starships: StarshipInterface[],
        vehicles: VehicleInterface[],
        films: FilmInterface[],
    ){
        this.#uuid = people.uuid;
        this.#id = people.id;
        this.#birth_year = people.birth_year;
        this.#eye_color = people.eye_color;
        this.#gender = people.gender;
        this.#hair_color = people.hair_color;
        this.#height = people.height;
        this.#homeworld = people.homeworld;
        this.#mass = people.mass;
        this.#name = people.name;
        this.#skin_color = people.skin_color;
        this.#url = people.url;
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

    get species(): SpecieInterface[] {
        return this.#species;
    }

    get starships(): StarshipInterface[] {
        return this.#starships;
    }

    get vehicles(): VehicleInterface[] {
        return this.#vehicles;
    }
    get films(): FilmInterface[] {
        return this.#films;
    }
}