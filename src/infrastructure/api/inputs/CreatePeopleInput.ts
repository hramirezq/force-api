export class CreatePeopleInput {
    nombre: string;
    año_de_nacimiento: string;
    color_de_ojos: string;
    genero: string;
    color_de_pelo: string;
    peso: string;
    masa: string;
    color_de_piel: string;
    mundo_natal: string;
    peliculas: string[];
    especies: string[];
    naves: string[];
    vehiculos: string[];
    url: string;

    constructor(
        nombre: string,
        año_de_nacimiento: string,
        color_de_ojos: string,
        genero: string,
        color_de_pelo: string,
        peso: string,
        masa: string,
        color_de_piel: string,
        mundo_natal: string,
        peliculas: string[],
        especies: string[],
        naves: string[],
        vehiculos: string[],
        url: string
    ) {
        this.nombre = nombre;
        this.año_de_nacimiento = año_de_nacimiento;
        this.color_de_ojos = color_de_ojos;
        this.genero = genero;
        this.color_de_pelo = color_de_pelo;
        this.peso = peso;
        this.masa = masa;
        this.color_de_piel = color_de_piel;
        this.mundo_natal = mundo_natal;
        this.peliculas = peliculas;
        this.especies = especies;
        this.naves = naves;
        this.vehiculos = vehiculos;
        this.url = url;

    }

}