import Jwt from 'jsonwebtoken';
import { db } from '../db/index';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

//criar o usuario
export const createUsers = async (nome: string, email: string, senha: string, nascimento: string) => {//: {nome: string, email:string, senha: string, nascimento:string} => {
  const hashSenha = await bcrypt.hash(senha, 10)
  const insertUser = await db.insert(users).values({nome,email,senha: hashSenha,nascimento})
  .returning()
  //se for array retorna os dados do user criado, se nao retorna true
  return Array.isArray(insertUser) ? insertUser[0] : null
}

//login do usuario
export const login = async (email: string, senha: string) => {// depois de criar o user, ele vai logar
  const result = await db.select().from(users).where(eq(users.email,email))
  const user: any | undefined = result[0]
  const isValid = await bcrypt.compare(senha, user.senha)
  if (!isValid) {
    return {mensagem: "Senha invalida"}
  }
  if (!user || typeof user.email !== "string") {
  return {mensagem: "Digite apenas letras"}
}
  if (!user) {
    return {mensagem: "usuario nao encontrado"}
  }
  //ver se a senha é valida
  const token = Jwt.sign(
    {id: user.id, email: user.email},//payload
    process.env.JWT_SECRET!,//chave secreta
    {expiresIn: "1h"}//opcoes
  );
  return {token}
}