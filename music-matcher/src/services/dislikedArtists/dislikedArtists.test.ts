import * as errors from '../../errors/errorCreator';
import artists from '../artists/artists';
import users from '../users/users';
import dislikedArtistsService from './dislikedArtists';
import { afterEach, describe, expect, it, jest } from '@jest/globals';

const throwErrorSpy = jest.spyOn(errors, 'throwError');

const artist1 = {
  id: 1,
  name: 'testDislikedArtist',
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

describe('Disliked artists service', () => {
  const newDislike = {
    idArtist: artist1.id,
    idUser: 1,
  };

  describe('Add dislike', () => {
    it('should throw an error when artist doesnt exists', async () => {
      const getArtistByIdSpy = jest
        .spyOn(artists, 'getArtistById')
        .mockResolvedValue(undefined);

      await expect(async () => {
        await dislikedArtistsService.addDislike(newDislike);
      }).rejects.toThrow("Artist doesn't exists in database");

      expect(throwErrorSpy).toHaveBeenCalledWith(
        400,
        "Artist doesn't exists in database",
      );
      expect(getArtistByIdSpy).toHaveBeenCalledWith(newDislike.idArtist);
    });

    it('should throw an error when dislike already exists', async () => {
      const getArtistByIdSpy = jest
        .spyOn(artists, 'getArtistById')
        .mockResolvedValue(artist1);

      const isDislikeExistingSpy = jest
        .spyOn(dislikedArtistsService, 'isDislikeExisting')
        .mockResolvedValue({
          id: 1,
          idArtist: newDislike.idArtist,
          idUser: newDislike.idUser,
        });

      await expect(async () => {
        await dislikedArtistsService.addDislike(newDislike);
      }).rejects.toThrow('Dislike already existing');

      expect(throwErrorSpy).toHaveBeenCalledWith(
        400,
        'Dislike already existing',
      );
      expect(getArtistByIdSpy).toHaveBeenCalledWith(newDislike.idArtist);
      expect(isDislikeExistingSpy).toHaveBeenCalledWith(newDislike);
    });

    it('should delete like', async () => {
      const getArtistByIdSpy = jest
        .spyOn(artists, 'getArtistById')
        .mockResolvedValue(artist1);

      const isLikeExistingSpy = jest
        .spyOn(dislikedArtistsService, 'isLikeExisting')
        .mockResolvedValue({
          id: 1,
          idArtist: newDislike.idArtist,
          idUser: newDislike.idUser,
        });

      const isDislikeExistingSpy = jest
        .spyOn(dislikedArtistsService, 'isDislikeExisting')
        .mockResolvedValue(undefined);

      const addDislikeQuerySpy = jest
        .spyOn(dislikedArtistsService, 'addDislikeQuery')
        .mockResolvedValue({
          id: 1,
          idArtist: newDislike.idArtist,
          idUser: newDislike.idUser,
        });

      const addedLike = await dislikedArtistsService.addDislike(newDislike);

      expect(getArtistByIdSpy).toHaveBeenCalledWith(newDislike.idArtist);
      expect(isLikeExistingSpy).toHaveBeenCalledWith(newDislike);
      expect(isDislikeExistingSpy).toHaveBeenCalledWith(newDislike);
      expect(addDislikeQuerySpy).toHaveBeenCalledWith(newDislike);
      expect(addedLike).toStrictEqual({
        id: 1,
        idArtist: newDislike.idArtist,
        idUser: newDislike.idUser,
      });
    });

    it('should return the new dislike', async () => {
      const getArtistByIdSpy = jest
        .spyOn(artists, 'getArtistById')
        .mockResolvedValue(artist1);

      const isLikeExistingSpy = jest
        .spyOn(dislikedArtistsService, 'isLikeExisting')
        .mockResolvedValue(undefined);

      const isDislikeExistingSpy = jest
        .spyOn(dislikedArtistsService, 'isDislikeExisting')
        .mockResolvedValue(undefined);

      const addDislikeQuerySpy = jest
        .spyOn(dislikedArtistsService, 'addDislikeQuery')
        .mockResolvedValue({
          id: 1,
          idArtist: newDislike.idArtist,
          idUser: newDislike.idUser,
        });

      const addedDislike = await dislikedArtistsService.addDislike(newDislike);

      expect(getArtistByIdSpy).toHaveBeenCalledWith(newDislike.idArtist);
      expect(isLikeExistingSpy).toHaveBeenCalledWith(newDislike);
      expect(isDislikeExistingSpy).toHaveBeenCalledWith(newDislike);
      expect(addDislikeQuerySpy).toHaveBeenCalledWith(newDislike);
      expect(addedDislike).toStrictEqual({
        id: 1,
        idArtist: newDislike.idArtist,
        idUser: newDislike.idUser,
      });
    });
  });

  describe('Get dislikes by artist', () => {
    const idArtist = artist1.id;

    it('should throw an error when artist doesnt exists', async () => {
      const getArtistByIdSpy = jest
        .spyOn(artists, 'getArtistById')
        .mockResolvedValue(undefined);

      await expect(async () => {
        await dislikedArtistsService.getDislikesByArtist(idArtist);
      }).rejects.toThrow("Ressource doesn't exists");

      expect(throwErrorSpy).toHaveBeenCalledWith(
        404,
        "Ressource doesn't exists",
      );
      expect(getArtistByIdSpy).toHaveBeenCalledWith(idArtist);
    });

    it('should return dislikes', async () => {
      const dislikesResult = [{ id: 1, idArtist, idUser: 0 }];
      const getArtistByIdSpy = jest
        .spyOn(artists, 'getArtistById')
        .mockResolvedValue(artist1);

      const getLikesByArtistQuerySpy = jest
        .spyOn(dislikedArtistsService, 'getDislikesByArtistQuery')
        .mockResolvedValue(dislikesResult);

      const result = await dislikedArtistsService.getDislikesByArtist(idArtist);
      expect(result).toStrictEqual(dislikesResult);
      expect(getArtistByIdSpy).toHaveBeenCalledWith(idArtist);
      expect(getLikesByArtistQuerySpy).toHaveBeenCalledWith(idArtist);
    });
  });

  describe('Get dislikes by user', () => {
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
        await dislikedArtistsService.getDislikesByUser(user.id);
      }).rejects.toThrow("Ressource doesn't exists");

      expect(throwErrorSpy).toHaveBeenCalledWith(
        404,
        "Ressource doesn't exists",
      );
      expect(getUserById).toHaveBeenCalledWith(user.id);
    });

    it('should return dislikes', async () => {
      const dislikesResult = [{ id: 1, idArtist: 1, idUser: user.id }];
      const getUserById = jest
        .spyOn(users, 'getUserById')
        .mockResolvedValue(user);

      const getLikesByUserQuery = jest
        .spyOn(dislikedArtistsService, 'getDislikesByUserQuery')
        .mockResolvedValue(dislikesResult);

      const result = await dislikedArtistsService.getDislikesByUser(user.id);
      expect(result).toStrictEqual(dislikesResult);
      expect(getUserById).toHaveBeenCalledWith(user.id);
      expect(getLikesByUserQuery).toHaveBeenCalledWith(user.id);
    });
  });
});
