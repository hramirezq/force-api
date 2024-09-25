export interface TranslateService<T> {
    translateFromEnglishToSpanish(englishObject: any): T;
    translateFromSpanishToEnglish(spanishObject: any): T;
}
