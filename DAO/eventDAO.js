import connect from "./connection.js"
import Event from "../Model/event.js"

export default class EventDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await connect();
            const sql = `CREATE TABLE IF NOT EXISTS evento (
                        title VARCHAR(20) NOT NULL PRIMARY KEY,
                        description VARCHAR(100) NOT NULL,
                        local VARCHAR(80) NOT NULL,
                        date VARCHAR(30) NOT NULL,
                        ticketValue FLOAT NOT NULL)`

            await conexao.execute(sql);
            await global.poolConnections.releaseConnection(conexao)
        }
        catch (error) {
            console.log(`Banco não iniciado: ${error}`)
        }

    }

    async gravar(evento) {
        console.log('Inserir\n')
        if (evento instanceof Event) {
            const conexao = await connect();
            const sql = `INSERT INTO evento(title, description, local, date, ticketValue) VALUES (?, ?, ?, ?, ?)`
            const parametros = [
                evento.title,
                evento.description,
                evento.local,
                evento.date,
                evento.ticketValue
            ];
            await conexao.execute(sql, parametros);
            await global.poolConnections.releaseConnection(conexao)
        }
    }

    async alterar(evento) {
        console.log('Alterar\n')
        if (evento instanceof Event) {
            const conexao = await connect();
            const sql = `UPDATE evento SET description = ?,
                        local = ?,
                        date = ?,
                        ticketValue = ?
                        WHERE (title = ?);`
            const parametros = [
                evento.description,
                evento.local,
                evento.date,
                evento.ticketValue,
                evento.title,
            ];
            await conexao.execute(sql, parametros);
            await global.poolConnections.releaseConnection(conexao)
        }
    }

    async excluir(evento) {
        console.log('Excluir\n')
        if (evento instanceof Event) {
            const conexao = await connect();
            const sql = `DELETE FROM evento WHERE title = ?`;
            const parametros = [
                evento.title
            ]
            await conexao.execute(sql, parametros);
            await global.poolConnections.releaseConnection(conexao)
        }
    }

    async consultar(param) {
        console.log('Consultar\n')
        let sql = "";
        const parametros = [];
        if (param) {
            sql = `SELECT * FROM evento WHERE title = ? order by title;`;
            parametros.push(param)
        } else {
            sql = `SELECT * FROM evento order by title;`;
        }

        const conexao = await connect();
        const [registros] = await conexao.execute(sql, parametros);

        let eventList = [];
        for (const registro of registros) {
            const event = new Event(
                registro.title,
                registro.description,
                registro.local,
                registro.date,
                registro.ticketValue,
            );
            eventList.push(event)
        }
        await global.poolConnections.releaseConnection(conexao);
        return eventList;
    }
}