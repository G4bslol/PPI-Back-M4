import Event from "./Model/event.js";

const event = new Event("Party Night", "Almoço em familia é sempre melhor", "", "", 0)


// event.excluir().then(() => {
//     console.log("Evento excluido com sucesso!")
// }).catch((error) => {
//     console.log(`Erro ao excluir: ${error}`)
// })

event.consultar("Full House").then((listaEventos) => {
    for (const evento of listaEventos) {
        console.log(evento.toSring());
    }
}).catch((error) => {
    console.log(`Erro ao consultar: ${error}`)
})