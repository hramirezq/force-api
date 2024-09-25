export class CreatePeopleInput {
    id: number;
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
        id: number,
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
        this.id = id;
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

    static validate(data: CreatePeopleInput) : String{
        if (data.nombre == null || data.nombre == "") {
            return "El campo nombre es requerido."
        }
        if (data.año_de_nacimiento == null || data.año_de_nacimiento == "") {
            return "El campo año_de_nacimiento es requerido.";
        }
        if (data.color_de_ojos == null || data.color_de_ojos == "") {
            return "El campo color_de_ojos es requerido.";
        }
        if (data.genero == null || data.genero == "") {
            return "El campo genero es requerido."
        }
        if (data.color_de_pelo == null || data.color_de_pelo == "") {
            return "El campo color_de_pelo es requerido."
        }
        if (data.peso == null || data.peso == "") {
            return "El campo peso es requerido."
        }
        if (data.masa == null || data.masa == "") {
            return "El campo masa es requerido."
        }
        if (data.color_de_piel == null || data.color_de_piel == "") {
            return "El campo color_de_piel es requerido."
        }
        if (data.mundo_natal == null || data.mundo_natal == "") {
            return "El campo mundo_natal es requerido."
        }
        if (data.peliculas == undefined) {
            return "El campo peliculas es requerido."
        }
        if (data.especies == undefined) {
            return "El campo especies es requerido."
        }
        if (data.naves == undefined) {
            return "El campo naves es requerido."
        }
        if (data.vehiculos == undefined) {
            return "El campo vehiculos es requerido."
        }
        if (data.url == undefined) {
            return "El campo url es requerido."
        }

        return "";
    }
}