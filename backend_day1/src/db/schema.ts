import {pgTable, serial, text, varchar, date} from 'drizzle-orm/pg-core'
import { nodeModuleNameResolver } from 'typescript'


//criar a contante que possue as tabelas(chamando o pg table)
export const users = pgTable("users",{
    id: serial("id").primaryKey().notNull(),
    nome: varchar("nome").notNull(),
    email: varchar("email").notNull(),
    senha: varchar("senha").notNull(),
    //tinha esquecido de importar o date
    nascimento: date("nascimento").notNull()
}
)