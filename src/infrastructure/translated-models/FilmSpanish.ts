import * as url from "node:url";

export class FilmSpanish {
    readonly #url: string;

    constructor(url: string) {
        this.#url = url;
    }

    get url(): string {
        return this.#url;
    }
}