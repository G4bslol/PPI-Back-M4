import express from "express";

import rotaEvent from "./routes/routeEvent.js";

import cors from 'cors';

const app = express();
const host = "0.0.0.0"
const port = 4000;

app.use(cors({
    origin: "http://localhost:3333",
}))

app.use(express.json())

app.use('/events', rotaEvent)

app.listen(port, host, ()=>{
    console.log(`Servidor rodando em: http://${host}:${port}`)
})


// event.excluir().then(() => {
//     console.log("Evento excluido com sucesso!")
// }).catch((error) => {
//     console.log(`Erro ao excluir: ${error}`)
// })

// event.consultar("Full House").then((listaEventos) => {
//     for (const evento of listaEventos) {
//         console.log(evento.toSring());
//     }
// }).catch((error) => {
//     console.log(`Erro ao consultar: ${error}`)
// })