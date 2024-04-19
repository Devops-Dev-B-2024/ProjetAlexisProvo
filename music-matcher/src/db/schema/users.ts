import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { likedArtists } from './likedArtists';
import { dislikedArtists } from './dislikedArtists';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role', { enum: ['user', 'admin'] })
    .notNull()
    .default('user'),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type UpdateUser = {
  name?: string;
  email?: string;
  role?: 'user' | 'admin';
};

export const usersRelations = relations(users, ({ many }) => ({
  usersLikes: many(likedArtists),
  usersDislikes: many(dislikedArtists),
}));
