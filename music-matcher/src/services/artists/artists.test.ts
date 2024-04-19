import * as errors from '../../errors/errorCreator';
import artistsService from './artists';
import { afterEach, describe, expect, it, jest } from '@jest/globals';

describe('Artists service', () => {
  const throwErrorSpy = jest.spyOn(errors, 'throwError');

  afterEach(() => {
    jest.clearAllMocks();
  });

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

  describe('Add artist', () => {
    it('should throw an error if artist is already in database', async () => {
      jest.spyOn(artistsService, 'getArtistById').mockResolvedValue(artist1);

      await expect(async () => {
        await artistsService.addArtist(0);
      }).rejects.toThrow('This artist is already in the database');
      expect(throwErrorSpy).toHaveBeenCalledWith(
        400,
        'This artist is already in the database',
      );
    });
  });

  describe('Update artist', () => {
    it('should throw an error if newData is empty', async () => {
      await expect(async () => {
        await artistsService.updateArtist(0, {});
      }).rejects.toThrow('Invalid fields');
      expect(throwErrorSpy).toHaveBeenCalledWith(400, 'Invalid fields');
    });
  });
});
