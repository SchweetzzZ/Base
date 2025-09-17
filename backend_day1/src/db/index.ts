import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from "pg";


//cria conexão com o banco de dados
const pool = new Pool({
    connectionString: "postgres://postgres:postgres@localhost:5432/postgres"
})

//cria a instancia do drizzle
export const db = drizzle(pool)




