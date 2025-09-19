import Jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import 'dotenv/config';

// criar o usuario
export const createUsers = async (nome: string, email: string, senha: string, nascimento: string) => {
    try {
        console.log("🔹 createUsers chamado", { nome, email, nascimento });

        const hashSenha = await bcrypt.hash(senha, 10);
        console.log("🔹 hashSenha gerado:", hashSenha);

        const insertUser = await db.insert(users).values({
            nome,
            email,
            senha: hashSenha,
            nascimento
        }).returning();

        console.log("🔹 insertUser resultado:", insertUser);
        return Array.isArray(insertUser) ? insertUser[0] : null;

    } catch (err: any) {
        console.error(" Erro ao inserir usuário:", err.message);
        throw err;
    }
}

// login do usuario
export const login = async (email: string, senha: string) => {
    try {
        console.log("🔹 login chamado", { email });

        const result = await db.select().from(users).where(eq(users.email, email));
        console.log("🔹 Result do DB:", result);

        const user: any | undefined = result[0];
        if (!user) return { mensagem: "usuario nao encontrado" };

        const isValid = await bcrypt.compare(senha, user.senha);
        console.log("🔹 Senha válida:", isValid);
        if (!isValid) return { mensagem: "Senha invalida" };

        const token = Jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "1h" });
        console.log("🔹 Token gerado:", token);
        return { token };

    } catch (err: any) {
        console.error(" Erro no login:", err.message);
        throw err;
    }
}
