import type { Context } from "elysia";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const SECRET = process.env.JWT_SECRET!;

export const authMiddleware = async (context: Context) => {
  try {
    const authHeader = context.request.headers.get("authorization");
    if (!authHeader) {
      context.set.status = 401;
      return { mensagem: "Token não fornecido" };
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      context.set.status = 401;
      return { mensagem: "Token inválido" };
    }

    const decoded = jwt.verify(token, SECRET) as { id: number; email: string };
    
    // Adicionar usuário ao contexto
    (context as any).user = decoded;

    return null; // Continua a execução
  } catch (error) {
    context.set.status = 401;
    return { mensagem: "Token inválido ou expirado" };
  }
};