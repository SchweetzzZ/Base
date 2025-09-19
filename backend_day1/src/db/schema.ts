import { pgTable, serial, varchar, date } from 'drizzle-orm/pg-core';

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  senha: varchar("senha", { length: 255 }).notNull(),
  nascimento: date("nascimento").notNull()
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;