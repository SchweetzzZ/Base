import { createUsers, login } from "../auth/auth";

export const registerUser = async ({ body, set }: { body: any; set: any }) => {
  console.log("🔹 registerUser chamado");
  console.log("Request body:", body);

  const { nome, email, senha, nascimento } = body;
  if (!nome || !email || !senha || !nascimento) {
    set.status = 400;
    return { mensagem: "Todos os campos são obrigatórios" };
  }

  try {
    const newUser = await createUsers(nome, email, senha, nascimento);
    if (!newUser) {
      set.status = 400;
      return { mensagem: "Erro ao criar o usuário" };
    }

    set.status = 201;
    return { mensagem: "Usuário criado com sucesso", user: { id: newUser.id, nome: newUser.nome, email: newUser.email } };
  } catch (err: any) {
    console.error("❌ Erro em registerUser:", err.message);
    
    if (err.message.includes("duplicate key")) {
      set.status = 409;
      return { mensagem: "Email já cadastrado" };
    }
    
    set.status = 500;
    return { mensagem: "Erro interno no servidor" };
  }
};

export const loginUser = async ({ body, set }: { body: any; set: any }) => {
  console.log("🔹 loginUser chamado");
  console.log("Request body:", body);

  const { email, senha } = body;
  if (!email || !senha) {
    set.status = 400;
    return { mensagem: "Todos os campos são obrigatórios" };
  }

  try {
    const response = await login(email, senha);

    if ("mensagem" in response) {
      set.status = 401;
      return response;
    }

    set.status = 200;
    return response;
  } catch (err: any) {
    console.error("❌ Erro em loginUser:", err.message);
    set.status = 500;
    return { mensagem: "Erro interno no servidor" };
  }
};