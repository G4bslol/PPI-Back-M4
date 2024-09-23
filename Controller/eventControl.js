import Event from "../Model/event.js";

export default class EventControl {

    gravar(req, res) {
        if (req.method == "POST" && req.is("application/json")) {
            const data = req.body;
            const title = data.title
            const description = data.description
            const local = data.local
            const date = data.date
            const ticketValue = data.ticketValue

            if (title && description && local && date && ticketValue) {
                const evento = new Event(title, description, local, date, ticketValue);

                evento.incluir().then(() => {
                    res.status(201).json({
                        "status": true,
                        "message": "Evento incluído com sucesso!"
                    })
                }).catch((error) => {
                    res.status(500).json({
                        "status": false,
                        "message": "Erro ao incluir o evento: " + error.message
                    })
                })
            }
            else {
                res.status(400).json({
                    "status": false,
                    "message": "Informe todos os dados do evento!"
                })
            }
        }
        else {
            res.status(405).json({
                "status": false,
                "message": "Requisição invalida!"
            })
        }

    }

    alterar(req, res) {
        if ((req.method == "PUT" || req.method == "PATCH") && req.is("application/json")) {

            const data = req.body;
            const title = data.title
            const description = data.description
            const local = data.local
            const date = data.date
            const ticketValue = data.ticketValue

            if (title && description && local && date && ticketValue) {
                const event = new Event(title, description, local, date, ticketValue)
                event.alterar().then(() => {
                    res.status(200).json({
                        "status": true,
                        "message": "Cliente alterado com sucesso!"
                    })
                }).catch((error) => {
                    res.status(500).json({
                        "status": false,
                        "message": "Erro ao alterar o cliente: " + error.message
                    })
                })
            }
            else {
                res.status(400).json({
                    "status": false,
                    "message": "Requisição inválida! Informe todos os dados do cliente."
                })
            }
        } else {
            res.status(405).json({
                "status": false,
                "message": "Requisição inválida!"
            })
        }
    }

    excluir(req, res) {
        if (req.method == "DELETE" && req.is("application/json")) {
            const dados = req.body;
            const title = dados.title;

            if (title) {
                const event = new Event(title);
                event.excluir().then(() => {
                    res.status(200).json({
                        "status": true,
                        "message": "Evento excluído com sucesso!"
                    })
                }).catch((error) => {
                    res.status(500).json({
                        "status": false,
                        "message": "Erro ao excluir o evento: " + error.message
                    })
                })
            }
            else {
                res.status(400).json({
                    "status": false,
                    "message": "Requisição inválida, informe o título do evento!"
                });
            }
        } else {
            res.status(400).json({
                "status": false,
                "message": "Requisição inválida! Consulte a documentação."
            })
        }
    }

    consultar(req, res) {

        let search = req.params.search;

        if (!search) {
            search = ""
        }

        if (req.method == "GET") {
            const event = new Event()
            event.consultar(search).then((events) => {
                return res.status(200).json({
                    "status": true,
                    "listaEventos": events

                })
            }).catch((error) => {
                res.status(500).json({
                    "status": false,
                    "message": "Erro ao consultar os eventos: " + error.message
                })
            })
        } else {
            res.status(405).json({
                "status": false,
                "message": "Requisição inválida! Consulte a documentação."
            });
        }
    }

}