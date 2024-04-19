import {
  dislikedArtists,
  dislikedArtistsRelations,
} from './schema/dislikedArtists';
import { likedArtists, likedArtistsRelations } from './schema/likedArtists';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { users, usersRelations } from './schema/users';
import { artists, artistsRelations } from './schema/artists';

const sqlite = new Database('./database.db');
export const db = drizzle(sqlite, {
  schema: {
    users,
    usersRelations,
    artists,
    artistsRelations,
    likedArtists,
    likedArtistsRelations,
    dislikedArtists,
    dislikedArtistsRelations,
  },
});
