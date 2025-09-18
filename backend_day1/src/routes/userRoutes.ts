import { registerUser, loginUser } from "../controllers/userControler";
import { Elysia } from "elysia";
import type { AuthMiddleware } from "better-auth/api";

export const userRoutes = (app:Elysia) => {
    app.post("/register", registerUser)
    app.post("/login", loginUser)
}
/*Exemplo de rota protegida
app.get("/me", { preHandler: authMiddleware }, (context) => {
    // @ts-ignore
    return { user: context.user }; // middleware adiciona context.user
  });
*/