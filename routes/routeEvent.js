import { Router } from "express";

import EventControl from "../Controller/eventControl.js";

const rotaEvent = Router();
const ctrlEvent = new EventControl();

rotaEvent.get("/", ctrlEvent.consultar)
.get("/:search", ctrlEvent.consultar)
.post("/", ctrlEvent.gravar)
.put("/", ctrlEvent.alterar)
.patch("/", ctrlEvent.alterar)
.delete("/", ctrlEvent.excluir)

export default rotaEvent;