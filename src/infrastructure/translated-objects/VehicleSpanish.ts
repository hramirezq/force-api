export class VehicleSpanish {
    readonly #url: string;

    constructor(url: string) {
        this.#url = url;
    }

    get url(): string {
        return this.#url;
    }
}