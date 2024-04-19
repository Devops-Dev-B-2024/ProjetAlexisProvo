import * as errors from '../../errors/errorCreator';
import deezerService from './deezer';
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import mockAxios from 'jest-mock-axios';

describe('Deezer service', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  describe('Get artist by ID', () => {
    it('should throw an error if artist doesnt exists', async () => {
      mockAxios.get.mockResolvedValue({
        data: { error: "Ressource doesn't exists" },
      });
      const throwErrorSpy = jest.spyOn(errors, 'throwError');
      await expect(async () => {
        await deezerService.getArtistById(0);
      }).rejects.toThrow("Ressource doesn't exists");
      expect(throwErrorSpy).toHaveBeenCalledWith(
        404,
        "Ressource doesn't exists",
      );
    });
  });
});
