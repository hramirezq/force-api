import {PeliculaInterfaz} from "../interfaces/PeliculaInterfaz";
import {EspecieInterfaz} from "../interfaces/EspecieInterfaz";
import {NaveInterfaz} from "../interfaces/NaveInterfaz";
import {VehiculoInterfaz} from "../interfaces/VehiculoInterfaz";
import {PeopleInputInterfaz} from "../interfaces/PeopleInputInterfaz";

export class GetPeopleOutput {
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
    readonly #peliculas: PeliculaInterfaz[];
    readonly #especies: EspecieInterfaz[];
    readonly #naves: NaveInterfaz[];
    readonly #vehiculos: VehiculoInterfaz[];
    readonly #url: string;

    constructor(
        data: PeopleInputInterfaz,
        peliculas: PeliculaInterfaz[],
        especies: EspecieInterfaz[],
        naves: NaveInterfaz[],
        vehiculos: VehiculoInterfaz[]
    ) {
        this.#id = data.id;
        this.#nombre = data.nombre;
        this.#año_de_nacimiento = data.año_de_nacimiento;
        this.#color_de_ojos = data.color_de_ojos;
        this.#genero = data.genero;
        this.#color_de_pelo = data.color_de_pelo;
        this.#peso = data.peso;
        this.#masa = data.masa;
        this.#color_de_piel = data.color_de_piel;
        this.#mundo_natal = data.mundo_natal;
        this.#peliculas = peliculas;
        this.#especies = especies;
        this.#naves = naves;
        this.#vehiculos = vehiculos;
        this.#url = data.url;
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

    get peliculas(): PeliculaInterfaz[] {
        return this.#peliculas;
    }

    get especies(): EspecieInterfaz[] {
        return this.#especies;
    }

    get naves(): NaveInterfaz[] {
        return this.#naves;
    }

    get vehiculos(): VehiculoInterfaz[] {
        return this.#vehiculos;
    }

    get url(): string {
        return this.#url;
    }

}