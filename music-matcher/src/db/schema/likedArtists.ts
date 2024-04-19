import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { artists } from './artists';
import { users } from './users';
import { relations } from 'drizzle-orm';

export const likedArtists = sqliteTable('liked_artists', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  idArtist: integer('id_artist')
    .notNull()
    .references(() => artists.id),
  idUser: integer('id_user')
    .notNull()
    .references(() => users.id),
});

export type LikedArtist = typeof likedArtists.$inferSelect;
export type InsertLikedArtist = typeof likedArtists.$inferInsert;

export const likedArtistsRelations = relations(likedArtists, ({ one }) => ({
  artist: one(artists, {
    fields: [likedArtists.idArtist],
    references: [artists.id],
  }),
  user: one(users, {
    fields: [likedArtists.idUser],
    references: [users.id],
  }),
}));
