import {People} from "./PeopleCommandInterface";

export class CreatePeopleCommand {
    private people: People;
    private vehicles = new Set<string>();

    constructor(people: People) {
        this.people = people;
    }

    public addVehicle(vehicle: string) {
        this.vehicles.add(vehicle);
    }

    public getVehicles(): string[] {
        return Array.from(this.vehicles);
    }

}