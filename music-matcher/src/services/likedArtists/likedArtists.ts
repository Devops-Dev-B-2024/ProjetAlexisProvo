import { InsertLikedArtist, likedArtists } from '../../db/schema/likedArtists';
import { db } from '../../db';
import { and, eq } from 'drizzle-orm';
import artists from '../artists/artists';
import { throwError } from '../../errors/errorCreator';
import users from '../users/users';
import dislikedArtistsService from '../dislikedArtists/dislikedArtists';
import { dislikedArtists } from '../../db/schema/dislikedArtists';
import thisModule from './likedArtists';

const getAllLikes = async () => {
  const result = await db.query.likedArtists.findMany();

  return result;
};

const isLikeExisting = async (newLike: InsertLikedArtist) => {
  const existingLike = await db.query.likedArtists.findFirst({
    where: and(
      eq(likedArtists.idUser, newLike.idUser),
      eq(likedArtists.idArtist, newLike.idArtist),
    ),
  });

  return existingLike;
};

const isDislikeExisting = async (newLike: InsertLikedArtist) => {
  const existingDislike = await db.query.dislikedArtists.findFirst({
    where: and(
      eq(dislikedArtists.idUser, newLike.idUser),
      eq(dislikedArtists.idArtist, newLike.idArtist),
    ),
  });

  return existingDislike;
};

const addLikeQuery = async (newLike: InsertLikedArtist) => {
  const result = await db
    .insert(likedArtists)
    .values({ idArtist: newLike.idArtist, idUser: newLike.idUser })
    .returning();

  return result[0];
};

const addLike = async (newLike: InsertLikedArtist) => {
  const artist = await artists.getArtistById(newLike.idArtist);
  if (!artist) {
    throwError(400, "Artist doesn't exists in database");
  }

  const existingLike = await thisModule.isLikeExisting(newLike);

  if (existingLike) {
    throwError(400, 'Like already existing');
  }

  const existingDislike = await thisModule.isDislikeExisting(newLike);

  if (existingDislike) {
    await dislikedArtistsService.deleteDislike(existingDislike.id);
  }

  const addedLike = await thisModule.addLikeQuery(newLike);
  return addedLike;
};

const getLikeById = async (likeId: number) => {
  const result = await db.query.likedArtists.findFirst({
    where: eq(likedArtists.id, likeId),
  });

  return result;
};

const deleteLike = async (likeId: number) => {
  const result = await db
    .delete(likedArtists)
    .where(eq(likedArtists.id, likeId))
    .returning();
  return result[0];
};

const getLikesByArtistQuery = async (artistId: number) => {
  const result = await db.query.likedArtists.findMany({
    where: eq(likedArtists.idArtist, artistId),
  });

  return result;
};

const getLikesByArtist = async (artistId: number) => {
  const artist = await artists.getArtistById(artistId);
  if (!artist) {
    throwError(404, "Ressource doesn't exists");
  }
  const likes = thisModule.getLikesByArtistQuery(artistId);

  return likes;
};

const getLikesByUserQuery = async (userId: number) => {
  const result = await db.query.likedArtists.findMany({
    where: eq(likedArtists.idUser, userId),
  });

  return result;
};

const getLikesByUser = async (userId: number) => {
  const user = await users.getUserById(userId);
  if (!user) {
    throwError(404, "Ressource doesn't exists");
  }
  const likes = await thisModule.getLikesByUserQuery(userId);

  return likes;
};

export default {
  getAllLikes,
  addLike,
  getLikeById,
  deleteLike,
  getLikesByArtist,
  getLikesByUser,
  isLikeExisting,
  isDislikeExisting,
  addLikeQuery,
  getLikesByArtistQuery,
  getLikesByUserQuery,
};
