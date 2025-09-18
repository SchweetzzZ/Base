import type { Context } from "elysia";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export const authMiddleware = async (context: Context, next: () => Promise<void>) => {
  try {
    // Pega o token do header Authorization
    const authHeader = context.request.headers.get("authorization");
    if (!authHeader) return { status: 401, body: { mensagem: "Token não fornecido" } };

    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    if (!token) return { status: 401, body: { mensagem: "Token inválido" } };

    // Verifica o token
    const decoded = jwt.verify(token, SECRET) as { id: number; email: string };

    // Adiciona user no context (force cast)
    (context as any).user = decoded;

    await next();
  } catch {
    return { status: 401, body: { mensagem: "Token inválido ou expirado" } };
  }
};