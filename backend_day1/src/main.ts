import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors';
import 'dotenv/config';
import { userRoutes } from "./routes/userRoutes";

console.log("🔹 Iniciando servidor Elysia");

const app = new Elysia()
  .use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }))
  .get("/health", () => ({ status: "OK", message: "Server is running" }));

// Registrar rotas
userRoutes(app);

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});

export default app;