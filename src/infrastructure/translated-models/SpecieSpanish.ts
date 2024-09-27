export class SpecieSpanish {
    readonly #url: string;

    constructor(url: string) {
        this.#url = url;
    }

    get url(): string {
        return this.#url;
    }
}