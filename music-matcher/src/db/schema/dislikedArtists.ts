import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { artists } from './artists';
import { users } from './users';
import { relations } from 'drizzle-orm';

export const dislikedArtists = sqliteTable('disliked_artists', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  idArtist: integer('id_artist')
    .notNull()
    .references(() => artists.id),
  idUser: integer('id_user')
    .notNull()
    .references(() => users.id),
});

export type DislikedArtist = typeof dislikedArtists.$inferSelect;
export type InsertDislikedArtist = typeof dislikedArtists.$inferInsert;

export const dislikedArtistsRelations = relations(
  dislikedArtists,
  ({ one }) => ({
    artist: one(artists, {
      fields: [dislikedArtists.idArtist],
      references: [artists.id],
    }),
    user: one(users, {
      fields: [dislikedArtists.idUser],
      references: [users.id],
    }),
  }),
);
