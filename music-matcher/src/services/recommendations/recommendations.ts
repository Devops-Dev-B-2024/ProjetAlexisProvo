import { LikedArtist, likedArtists } from '../../db/schema/likedArtists';
import { db } from '../../db';
import { and, eq, inArray, ne } from 'drizzle-orm';
import { dislikedArtists } from '../../db/schema/dislikedArtists';
import thisService from './recommendations';

const getUserLikedArtists = async (userId: number) => {
  const userLikedArtists = await db.query.likedArtists.findMany({
    where: eq(likedArtists.idUser, userId),
  });
  return userLikedArtists;
};

const getUserDislikedArtists = async (userId: number) => {
  const userDislikedArtists = await db.query.dislikedArtists.findMany({
    where: eq(dislikedArtists.idUser, userId),
  });
  return userDislikedArtists;
};

const getSimilarUsers = async (
  userLikedArtists: LikedArtist[],
  userId: number,
) => {
  const similarUser = await db.query.likedArtists.findMany({
    columns: {
      idUser: true,
    },
    where: and(
      inArray(
        likedArtists.idArtist,
        userLikedArtists.map((like) => like.idArtist),
      ),
      ne(likedArtists.idUser, userId),
    ),
    with: {
      user: {
        with: {
          usersLikes: {
            with: {
              artist: true,
            },
          },
        },
      },
    },
  });

  return similarUser;
};

const getMostOccuring = (array: any[]) => {
  let count = 1,
    max = 0,
    mostOccuring;

  if (array.length === 1) {
    return array[0];
  }

  for (let i = 1; i < array.length; ++i) {
    if (array[i] === array[i - 1]) {
      count++;
    } else {
      count = 1;
    }
    if (count > max) {
      max = count;
      mostOccuring = array[i];
    }
  }

  return mostOccuring;
};

const getRecommendation = async (userId: number) => {
  const userLikedArtists = await thisService.getUserLikedArtists(userId);
  const userDislikedArtists = await thisService.getUserDislikedArtists(userId);

  if (userLikedArtists.length === 0) {
    return {};
  }

  const similarUsers = await thisService.getSimilarUsers(
    userLikedArtists,
    userId,
  );

  const similarUsersLikedArtists = similarUsers
    .map((user) =>
      user.user.usersLikes.map((likedArtist) => likedArtist.artist),
    )
    .flat();

  const filteredArtists = similarUsersLikedArtists.filter(
    (recommendedArtist) =>
      !userLikedArtists.some(
        (likedArtist) => likedArtist.idArtist === recommendedArtist.id,
      ),
  );

  const filteredArtistsWithoutDislikes = filteredArtists.filter(
    (recommendedArtist) =>
      !userDislikedArtists.some(
        (dislikedArtist) => dislikedArtist.idArtist === recommendedArtist.id,
      ),
  );

  const recommendation = thisService.getMostOccuring(
    filteredArtistsWithoutDislikes,
  );

  return recommendation || {};
};

export default {
  getRecommendation,
  getUserLikedArtists,
  getUserDislikedArtists,
  getSimilarUsers,
  getMostOccuring,
};
