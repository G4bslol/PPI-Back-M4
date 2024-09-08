import Event from "./Model/event.js";

const event = new Event("Party Night", "Festa fantasia organizada pela equipe de gestão da atual prefeitura", "R. Floriano Peixoto", "31 de Outubro de 2023", 11.99)


event.incluir().then(() => {
    console.log("Evento alterado com sucesso!")
}).catch((error) => {
    console.log(`Erro ao alterar: ${error}`)
})

// event.consultar().then((listaEventos) => {
//     for (const evento of listaEventos) {
//         console.log(evento.toSring());
//     }
// }).catch((error) => {
//     console.log(`Erro ao consultar: ${error}`)
// })