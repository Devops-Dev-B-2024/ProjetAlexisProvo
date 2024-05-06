import { UpdateArtist, artists } from './../../db/schema/artists';
import { db } from '../../db';
import { eq } from 'drizzle-orm';
import deezer from '../deezer/deezer';
import { throwError } from '../../errors/errorCreator';
import { likedArtists } from '../../db/schema/likedArtists';
import thisModule from './artists';

const getAllArtists = async () => {
  const result = await db.query.artists.findMany();

  return result;
};

const addArtist = async (deezerId: number) => {
  const existingArtist = await thisModule.getArtistById(deezerId);
  if (existingArtist) {
    throwError(400,
      'This artist is already in the database');
  }
  const artist = await deezer.getArtistById(deezerId);
  const addedArtist = await db.insert(artists).values(artist).returning();
  return addedArtist[0];
};

const searchArtist = async (query: string) => {
  const results = await deezer.searchArtist(query);
  return results;
};

const getArtistById = async (artistId: number) => {
  const result = await db.query.artists.findFirst({
    where: eq(artists.id, artistId),
  });

  return result;
};

const deleteArtist = async (artistId: number) => {
  await db.delete(likedArtists).where(eq(likedArtists.idArtist, artistId));
  const result = await db
    .delete(artists)
    .where(eq(artists.id, artistId))
    .returning();

  return result[0];
};

const updateArtist = async (artistId: number, newData: UpdateArtist) => {
  if (Object.keys(newData).length === 0) {
    throwError(400, 'Invalid fields');
  }
  const result = await db
    .update(artists)
    .set(newData)
    .where(eq(artists.id, artistId))
    .returning();
  return result[0];
};

export default {
  getAllArtists,
  addArtist,
  getArtistById,
  deleteArtist,
  updateArtist,
  searchArtist,
};
