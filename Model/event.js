import EventDAO from "../DAO/eventDAO.js"

export default class Event {
    //Atributos privados
    #title
    #description
    #local
    #date
    #ticketValue

    constructor(title, description, local, date, ticketValue) {
        this.#title = title
        this.#description = description
        this.#local = local
        this.#date = date
        this.#ticketValue = ticketValue
    }

    get title() {
        return this.#title
    }

    set title(novoTitle) {
        this.#title = novoTitle
    }

    get description() {
        return this.#description
    }

    set description(newDescription) {
        this.#description = newDescription
    }

    get local() {
        return this.#local
    }

    set local(newLocal) {
        this.#local = newLocal
    }

    get date() {
        return this.#date
    }

    set date(newDate) {
        this.#date = newDate
    }

    get ticketValue() {
        return this.#ticketValue
    }

    set ticketValue(newTicketValue) {
        this.#ticketValue = newTicketValue
    }

    toSring() {
        return `Titulo: ${this.#title}\n
        Descrição: ${this.#description}\n
        Local: ${this.#local}\n
        Data: ${this.#date}\n
        Valor do Ingresso: ${this.#ticketValue}\n`
    }

    toJSON() {
        return {
            title: this.#title,
            description: this.#description,
            local: this.#local,
            date: this.#date,
            ticketValue: this.#ticketValue
        }
    }

    async incluir() {
        const evtDAO = new EventDAO();
        await evtDAO.gravar(this);
    }

    async alterar() {
        const evtDAO = new EventDAO();
        await evtDAO.alterar(this);
    }

    async excluir() {
        const evtDAO = new EventDAO();
        await evtDAO.excluir(this);
    }

    async consultar(param) {
        const evtDAO = new EventDAO();
        return await evtDAO.consultar(param);
    }
}