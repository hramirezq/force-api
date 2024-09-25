export class GetPeopleInput {

    static validate(id: string | undefined) : String {
        if (id == undefined) {
            return "El identificador es requerido."
        }
        let numberId = Number(id)
        if (numberId == null) {
            return "El identificador es requerido."
        }
        if (numberId < 0) {
            return "El identificador no puede ser menor que cero."
        }
        return "";
    }
}