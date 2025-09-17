import { betterAuth } from 'better-auth';
import { db } from '../db/index';
import { users } from '../db/schema';
import bcrypt from 'bcryptjs';

export const auth = betterAuth({
  secret: 'minha_chave_secreta',

  findUserByEmail: async (email: string) => {
    const result = await db.select().from(users).where(users.email.eq(email));
    return result[0] ?? null;
  },

  createUser: async ({ email, senha, nome, nascimento }: { email: string; senha: string; nome: string; nascimento: string }) => {
    const hash = await bcrypt.hash(senha, 10); // <-- hash gerado aqui
    const insertedUsers = await db.insert(users).values({ email, senha: hash, nome, nascimento }).returning();
    const user = Array.isArray(insertedUsers) ? insertedUsers[0] : null;
    return user;
  },

  verifyPassword: async (user: any, password: string) => {
    return await bcrypt.compare(password, user.senha);
  },
});