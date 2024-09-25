export class PeopleEntity {
    id: string;
    birth_year: string;
    eye_color: string;
    films: string[];
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    mass: string;
    name: string;
    skin_color: string;
    species: string[];
    starships: string[];
    url: string;
    vehicles: string[];
    constructor(
        id:string,
        birth_year:string,
        eye_color:string,
        films: string[],
        gender: string,
        hair_color: string,
        height: string,
        homeworld: string,
        mass: string,
        name: string,
        skin_color: string,
        species: string[],
        starships: string[],
        url: string,
        vehicles: string[],
    ) {
        this.id = id;
        this.birth_year = birth_year;
        this.eye_color = eye_color;
        this.films = films;
        this.gender = gender;
        this.hair_color = hair_color;
        this.height = height;
        this.homeworld = homeworld;
        this.mass = mass;
        this.name = name;
        this.skin_color = skin_color;
        this.species = species;
        this.starships = starships;
        this.url = url;
        this.vehicles = vehicles;
    }
  }