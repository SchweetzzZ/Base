import { Elysia } from "elysia";
import { db } from "./db";

//cria a instancia do elysia
const app = new Elysia()

///chama/importa as rotas
//userROutes(app)

app.listen(3000), () => console.log("Server running on port 3000")
