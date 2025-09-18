import { createUsers, login } from "../auth/auth";

//rota de registro
export const registerUser = async (context: any) => {
    const {nome,email,senha,nascimento} = context.body
    //tratar
    if (!nome || !email || !senha || !nascimento) 
        return { status: (400), body: {mensagem: "Todos os campos são obrigatorios"}
    }
    //criar o usuario
    const user = await createUsers(nome,email,senha,nascimento)
    //trato
    if (!user){
        return {status: (400), body: {mensagem: "Erro ao criar o usuario"}}
    }
    return {status: (201), body: {mensagem: "Usuario criado com sucesso"}}
}
    
//rota de login
export const loginUser = async (context: any) => {
    const {email,senha} = context.body
    if (!email || !senha){
        return {status: (400), body: {mensagem: "Todos os campos são obrigatorios"}}
    }
    const response = await login(email,senha)
    if ("mensagem" in response) {
        return { status: 400, body: response };
      }
    
      return { body: response };
    };
