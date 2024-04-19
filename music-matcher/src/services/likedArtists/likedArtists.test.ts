import * as errors from '../../errors/errorCreator';
import artists from '../artists/artists';
import users from '../users/users';
import likedArtistsService from './likedArtists';
import { afterEach, describe, expect, it, jest } from '@jest/globals';

const throwErrorSpy = jest.spyOn(errors, 'throwError');

const artist1 = {
  id: 1,
  name: 'testLikedArtist',
  link: '',
  picture: '',
  picture_small: '',
  picture_medium: '',
  picture_big: '',
  picture_xl: '',
  nb_album: 12,
  nb_fan: 4205,
  radio: true,
  tracklist: '',
  type: 'artist',
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('Liked artists service', () => {
  const newLike = {
    idArtist: artist1.id,
    idUser: 1,
  };

  describe('Add like', () => {
    it('should throw an error when artist doesnt exists', async () => {
      const getArtistByIdSpy = jest
        .spyOn(artists, 'getArtistById')
        .mockResolvedValue(undefined);

      await expect(async () => {
        await likedArtistsService.addLike(newLike);
      }).rejects.toThrow("Artist doesn't exists in database");

      expect(throwErrorSpy).toHaveBeenCalledWith(
        400,
        "Artist doesn't exists in database",
      );
      expect(getArtistByIdSpy).toHaveBeenCalledWith(newLike.idArtist);
    });

    it('should throw an error when like already exists', async () => {
      const getArtistByIdSpy = jest
        .spyOn(artists, 'getArtistById')
        .mockResolvedValue(artist1);

      const isLikeExistingSpy = jest
        .spyOn(likedArtistsService, 'isLikeExisting')
        .mockResolvedValue({
          id: 1,
          idArtist: newLike.idArtist,
          idUser: newLike.idUser,
        });

      await expect(async () => {
        await likedArtistsService.addLike(newLike);
      }).rejects.toThrow('Like already existing');

      expect(throwErrorSpy).toHaveBeenCalledWith(400, 'Like already existing');
      expect(getArtistByIdSpy).toHaveBeenCalledWith(newLike.idArtist);
      expect(isLikeExistingSpy).toHaveBeenCalledWith(newLike);
    });

    it('should delete dislike', async () => {
      const getArtistByIdSpy = jest
        .spyOn(artists, 'getArtistById')
        .mockResolvedValue(artist1);

      const isLikeExistingSpy = jest
        .spyOn(likedArtistsService, 'isLikeExisting')
        .mockResolvedValue(undefined);

      const isDislikeExistingSpy = jest
        .spyOn(likedArtistsService, 'isDislikeExisting')
        .mockResolvedValue({
          id: 1,
          idArtist: newLike.idArtist,
          idUser: newLike.idUser,
        });

      const addLikeQuerySpy = jest
        .spyOn(likedArtistsService, 'addLikeQuery')
        .mockResolvedValue({
          id: 1,
          idArtist: newLike.idArtist,
          idUser: newLike.idUser,
        });

      const addedLike = await likedArtistsService.addLike(newLike);

      expect(getArtistByIdSpy).toHaveBeenCalledWith(newLike.idArtist);
      expect(isLikeExistingSpy).toHaveBeenCalledWith(newLike);
      expect(isDislikeExistingSpy).toHaveBeenCalledWith(newLike);
      expect(addLikeQuerySpy).toHaveBeenCalledWith(newLike);
      expect(addedLike).toStrictEqual({
        id: 1,
        idArtist: newLike.idArtist,
        idUser: newLike.idUser,
      });
    });

    it('should return the new like', async () => {
      const getArtistByIdSpy = jest
        .spyOn(artists, 'getArtistById')
        .mockResolvedValue(artist1);

      const isLikeExistingSpy = jest
        .spyOn(likedArtistsService, 'isLikeExisting')
        .mockResolvedValue(undefined);

      const isDislikeExistingSpy = jest
        .spyOn(likedArtistsService, 'isDislikeExisting')
        .mockResolvedValue(undefined);

      const addLikeQuerySpy = jest
        .spyOn(likedArtistsService, 'addLikeQuery')
        .mockResolvedValue({
          id: 1,
          idArtist: newLike.idArtist,
          idUser: newLike.idUser,
        });

      const addedLike = await likedArtistsService.addLike(newLike);

      expect(getArtistByIdSpy).toHaveBeenCalledWith(newLike.idArtist);
      expect(isLikeExistingSpy).toHaveBeenCalledWith(newLike);
      expect(isDislikeExistingSpy).toHaveBeenCalledWith(newLike);
      expect(addLikeQuerySpy).toHaveBeenCalledWith(newLike);
      expect(addedLike).toStrictEqual({
        id: 1,
        idArtist: newLike.idArtist,
        idUser: newLike.idUser,
      });
    });
  });

  describe('Get likes by artist', () => {
    const idArtist = artist1.id;

    it('should throw an error when artist doesnt exists', async () => {
      const getArtistByIdSpy = jest
        .spyOn(artists, 'getArtistById')
        .mockResolvedValue(undefined);

      await expect(async () => {
        await likedArtistsService.getLikesByArtist(idArtist);
      }).rejects.toThrow("Ressource doesn't exists");

      expect(throwErrorSpy).toHaveBeenCalledWith(
        404,
        "Ressource doesn't exists",
      );
      expect(getArtistByIdSpy).toHaveBeenCalledWith(idArtist);
    });

    it('should return likes', async () => {
      const likesResult = [{ id: 1, idArtist, idUser: 0 }];
      const getArtistByIdSpy = jest
        .spyOn(artists, 'getArtistById')
        .mockResolvedValue(artist1);

      const getLikesByArtistQuerySpy = jest
        .spyOn(likedArtistsService, 'getLikesByArtistQuery')
        .mockResolvedValue(likesResult);

      const result = await likedArtistsService.getLikesByArtist(idArtist);
      expect(result).toStrictEqual(likesResult);
      expect(getArtistByIdSpy).toHaveBeenCalledWith(idArtist);
      expect(getLikesByArtistQuerySpy).toHaveBeenCalledWith(idArtist);
    });
  });

  describe('Get likes by user', () => {
    const user: {
      id: number;
      name: string;
      email: string;
      role: 'user' | 'admin';
    } = { id: 0, name: '', email: '', role: 'user' };

    it('should throw an error when user doesnt exists', async () => {
      const getUserById = jest
        .spyOn(users, 'getUserById')
        .mockResolvedValue(undefined);

      await expect(async () => {
        await likedArtistsService.getLikesByUser(user.id);
      }).rejects.toThrow("Ressource doesn't exists");

      expect(throwErrorSpy).toHaveBeenCalledWith(
        404,
        "Ressource doesn't exists",
      );
      expect(getUserById).toHaveBeenCalledWith(user.id);
    });

    it('should return likes', async () => {
      const likesResult = [{ id: 1, idArtist: 1, idUser: user.id }];
      const getUserById = jest
        .spyOn(users, 'getUserById')
        .mockResolvedValue(user);

      const getLikesByUserQuery = jest
        .spyOn(likedArtistsService, 'getLikesByUserQuery')
        .mockResolvedValue(likesResult);

      const result = await likedArtistsService.getLikesByUser(user.id);
      expect(result).toStrictEqual(likesResult);
      expect(getUserById).toHaveBeenCalledWith(user.id);
      expect(getLikesByUserQuery).toHaveBeenCalledWith(user.id);
    });
  });
});
