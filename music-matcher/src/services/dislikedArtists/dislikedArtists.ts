import {
  InsertDislikedArtist,
  dislikedArtists,
} from '../../db/schema/dislikedArtists';
import { db } from '../../db';
import { and, eq } from 'drizzle-orm';
import artists from '../artists/artists';
import { throwError } from '../../errors/errorCreator';
import users from '../users/users';
import { likedArtists as likedArtistsSchema } from '../../db/schema/likedArtists';
import likedArtistsService from '../likedArtists/likedArtists';
import thisModule from './dislikedArtists';

const getAllDislikes = async () => {
  const result = await db.query.dislikedArtists.findMany();

  return result;
};

const isDislikeExisting = async (newDislike: InsertDislikedArtist) => {
  const result = await db.query.dislikedArtists.findFirst({
    where: and(
      eq(dislikedArtists.idUser, newDislike.idUser),
      eq(dislikedArtists.idArtist, newDislike.idArtist),
    ),
  });

  return result;
};

const isLikeExisting = async (newDislike: InsertDislikedArtist) => {
  const result = await db.query.likedArtists.findFirst({
    where: and(
      eq(likedArtistsSchema.idUser, newDislike.idUser),
      eq(likedArtistsSchema.idArtist, newDislike.idArtist),
    ),
  });

  return result;
};

const addDislikeQuery = async (newDislike: InsertDislikedArtist) => {
  const result = await db
    .insert(dislikedArtists)
    .values({ idArtist: newDislike.idArtist, idUser: newDislike.idUser })
    .returning();

  return result[0];
};

const addDislike = async (newDislike: InsertDislikedArtist) => {
  const artist = await artists.getArtistById(newDislike.idArtist);
  if (!artist) {
    throwError(400, "Artist doesn't exists in database");
  }

  const existingDislike = await thisModule.isDislikeExisting(newDislike);

  if (existingDislike) {
    throwError(400, 'Dislike already existing');
  }

  const existingLike = await thisModule.isLikeExisting(newDislike);

  if (existingLike) {
    await likedArtistsService.deleteLike(existingLike.id);
  }

  const addedDislike = await thisModule.addDislikeQuery(newDislike);
  return addedDislike;
};

const getDislikeById = async (dislikeId: number) => {
  const result = await db.query.likedArtists.findFirst({
    where: eq(dislikedArtists.id, dislikeId),
  });

  return result;
};

const deleteDislike = async (dislikeId: number) => {
  const result = await db
    .delete(dislikedArtists)
    .where(eq(dislikedArtists.id, dislikeId))
    .returning();
  return result[0];
};

const getDislikesByArtistQuery = async (artistId: number) => {
  const result = await db.query.dislikedArtists.findMany({
    where: eq(dislikedArtists.idArtist, artistId),
  });

  return result;
};

const getDislikesByArtist = async (artistId: number) => {
  const artist = await artists.getArtistById(artistId);
  if (!artist) {
    throwError(404, "Ressource doesn't exists");
  }

  const dislikes = thisModule.getDislikesByArtistQuery(artistId);
  return dislikes;
};

const getDislikesByUserQuery = async (userId: number) => {
  const result = await db.query.dislikedArtists.findMany({
    where: eq(dislikedArtists.idUser, userId),
  });

  return result;
};

const getDislikesByUser = async (userId: number) => {
  const user = await users.getUserById(userId);
  if (!user) {
    throwError(404, "Ressource doesn't exists");
  }

  const dislikes = thisModule.getDislikesByUserQuery(userId);
  return dislikes;
};

export default {
  getAllDislikes,
  addDislike,
  getDislikeById,
  deleteDislike,
  getDislikesByArtist,
  getDislikesByUser,
  isDislikeExisting,
  isLikeExisting,
  addDislikeQuery,
  getDislikesByArtistQuery,
  getDislikesByUserQuery,
};
