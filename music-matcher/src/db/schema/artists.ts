import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { likedArtists } from './likedArtists';
import { dislikedArtists } from './dislikedArtists';

export const artists = sqliteTable('artists', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  link: text('link').notNull(),
  picture: text('picture').notNull(),
  picture_small: text('picture_small').notNull(),
  picture_medium: text('picture_medium').notNull(),
  picture_big: text('picture_big').notNull(),
  picture_xl: text('picture_xl').notNull(),
  nb_album: integer('nb_album').notNull(),
  nb_fan: integer('nb_fan').notNull(),
  radio: integer('radio', { mode: 'boolean' }).notNull(),
  tracklist: text('tracklist').notNull(),
  type: text('type').notNull(),
});

export type Artist = typeof artists.$inferSelect;
export type InsertArtist = typeof artists.$inferInsert;
export type UpdateArtist = {
  name?: string;
  link?: string;
  picture?: string;
  picture_small?: string;
  picture_medium?: string;
  picture_big?: string;
  picture_xl?: string;
  nb_album?: number;
  nb_fan?: number;
  radio?: boolean;
  tracklist?: string;
  type?: string;
};

export const artistsRelations = relations(artists, ({ many }) => ({
  likedBy: many(likedArtists),
  dislikedBy: many(dislikedArtists),
}));
