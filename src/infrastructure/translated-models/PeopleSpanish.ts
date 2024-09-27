import {FilmSpanish} from "./FilmSpanish";
import {SpecieSpanish} from "./SpecieSpanish";
import {StarshipSpanish} from "./StarshipSpanish";
import {VehicleSpanish} from "./VehicleSpanish";

export class PeopleSpanish {
    readonly #id: number;
    readonly #nombre: string;
    readonly #año_de_nacimiento: string;
    readonly #color_de_ojos: string;
    readonly #genero: string;
    readonly #color_de_pelo: string;
    readonly #masa: string;
    readonly #peso: string;
    readonly #color_de_piel: string;
    readonly #mundo_natal: string;
    readonly #peliculas: FilmSpanish[];
    readonly #especies: SpecieSpanish[];
    readonly #naves: StarshipSpanish[];
    readonly #vehiculos: VehicleSpanish[];
    readonly #url: string;

    constructor(
        id: number,
        nombre: string,
        año_de_nacimiento: string,
        color_de_ojos: string,
        genero: string,
        color_de_pelo: string,
        masa: string,
        peso: string,
        color_de_piel: string,
        mundo_natal: string,
        url: string,
        peliculas: FilmSpanish[],
        especies: SpecieSpanish[],
        naves: StarshipSpanish[],
        vehiculos: VehicleSpanish[]
    ) {
        this.#id = id;
        this.#nombre = nombre;
        this.#año_de_nacimiento = año_de_nacimiento;
        this.#color_de_ojos = color_de_ojos;
        this.#genero = genero;
        this.#color_de_pelo = color_de_pelo;
        this.#peso = peso;
        this.#masa = masa;
        this.#color_de_piel = color_de_piel;
        this.#mundo_natal = mundo_natal;
        this.#peliculas = peliculas;
        this.#especies = especies;
        this.#naves = naves;
        this.#vehiculos = vehiculos;
        this.#url = url;
    }

    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            año_de_nacimiento: this.año_de_nacimiento,
            color_de_ojos: this.color_de_ojos,
            genero: this.genero,
            color_de_pelo: this.color_de_pelo,
            peso: this.peso,
            masa: this.masa,
            color_de_piel: this.color_de_piel,
            mundo_natal: this.mundo_natal,
            peliculas: this.peliculas,
            especies: this.especies,
            naves: this.naves,
            vehiculos: this.vehiculos,
            url: this.url
        };
    }


    get id(): number {
        return this.#id;
    }

    get nombre(): string {
        return this.#nombre;
    }

    get año_de_nacimiento(): string {
        return this.#año_de_nacimiento;
    }

    get color_de_ojos(): string {
        return this.#color_de_ojos;
    }

    get genero(): string {
        return this.#genero;
    }

    get color_de_pelo(): string {
        return this.#color_de_pelo;
    }

    get masa(): string {
        return this.#masa;
    }

    get peso(): string {
        return this.#peso;
    }

    get color_de_piel(): string {
        return this.#color_de_piel;
    }

    get mundo_natal(): string {
        return this.#mundo_natal;
    }

    get peliculas(): FilmSpanish[] {
        return this.#peliculas;
    }

    get especies(): SpecieSpanish[] {
        return this.#especies;
    }

    get naves(): StarshipSpanish[] {
        return this.#naves;
    }

    get vehiculos(): VehicleSpanish[] {
        return this.#vehiculos;
    }

    get url(): string {
        return this.#url;
    }
}