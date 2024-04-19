import { describe, expect, it, jest, afterEach } from '@jest/globals';
import recommendationsService from '../../services/recommendations/recommendations';

describe('Get recommendation', () => {
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

  const artist2 = {
    id: 2,
    name: 'testLikedArtist2',
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

  const artist3 = {
    id: 3,
    name: 'testLikedArtist3',
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

  const idUser = 0;

  it('should return an empty object if liked users is empty', async () => {
    const getUserLikedArtistsSpy = jest
      .spyOn(recommendationsService, 'getUserLikedArtists')
      .mockResolvedValue([]);

    const getUserDislikedArtistsSpy = jest
      .spyOn(recommendationsService, 'getUserDislikedArtists')
      .mockResolvedValue([]);

    const recommendation =
      await recommendationsService.getRecommendation(idUser);

    expect(getUserLikedArtistsSpy).toHaveBeenCalledWith(idUser);
    expect(getUserDislikedArtistsSpy).toHaveBeenCalledWith(idUser);
    expect(recommendation).toStrictEqual({});
  });

  it('should not recommand liked users', async () => {
    const getUserLikedArtistsSpy = jest
      .spyOn(recommendationsService, 'getUserLikedArtists')
      .mockResolvedValue([{ id: 1, idArtist: artist1.id, idUser }]);

    const getUserDislikedArtistsSpy = jest
      .spyOn(recommendationsService, 'getUserDislikedArtists')
      .mockResolvedValue([]);

    const getSimilarUsersSpy = jest
      .spyOn(recommendationsService, 'getSimilarUsers')
      .mockResolvedValue([
        {
          idUser: 3,
          user: {
            id: 3,
            name: 'test',
            email: 'test@gmail.com',
            password: 'test',
            role: 'user',
            usersLikes: [
              {
                id: 3,
                idArtist: 1,
                idUser: 3,
                artist: artist1,
              },
            ],
          },
        },
      ]);

    const recommendation =
      await recommendationsService.getRecommendation(idUser);

    expect(getUserLikedArtistsSpy).toHaveBeenCalledWith(idUser);
    expect(getUserDislikedArtistsSpy).toHaveBeenCalledWith(idUser);
    expect(getSimilarUsersSpy).toHaveBeenCalledWith(
      [{ id: 1, idArtist: artist1.id, idUser }],
      idUser,
    );
    expect(recommendation).toStrictEqual({});
  });

  it('should not recommand disliked users', async () => {
    const getUserLikedArtistsSpy = jest
      .spyOn(recommendationsService, 'getUserLikedArtists')
      .mockResolvedValue([{ id: 1, idArtist: artist1.id, idUser }]);

    const getUserDislikedArtistsSpy = jest
      .spyOn(recommendationsService, 'getUserDislikedArtists')
      .mockResolvedValue([{ id: 1, idArtist: artist2.id, idUser }]);

    const getSimilarUsersSpy = jest
      .spyOn(recommendationsService, 'getSimilarUsers')
      .mockResolvedValue([
        {
          idUser: 3,
          user: {
            id: 3,
            name: 'test',
            email: 'test@gmail.com',
            password: 'test',
            role: 'user',
            usersLikes: [
              {
                id: 3,
                idArtist: 1,
                idUser: 3,
                artist: artist1,
              },
              {
                id: 4,
                idArtist: 2,
                idUser: 3,
                artist: artist2,
              },
            ],
          },
        },
      ]);

    const recommendation =
      await recommendationsService.getRecommendation(idUser);

    expect(getUserLikedArtistsSpy).toHaveBeenCalledWith(idUser);
    expect(getUserDislikedArtistsSpy).toHaveBeenCalledWith(idUser);
    expect(getSimilarUsersSpy).toHaveBeenCalledWith(
      [{ id: 1, idArtist: artist1.id, idUser }],
      idUser,
    );
    expect(recommendation).toStrictEqual({});
  });

  it('should recommand the most occuring artist', async () => {
    const getUserLikedArtistsSpy = jest
      .spyOn(recommendationsService, 'getUserLikedArtists')
      .mockResolvedValue([{ id: 1, idArtist: artist1.id, idUser }]);

    const getUserDislikedArtistsSpy = jest
      .spyOn(recommendationsService, 'getUserDislikedArtists')
      .mockResolvedValue([]);

    const getSimilarUsersSpy = jest
      .spyOn(recommendationsService, 'getSimilarUsers')
      .mockResolvedValue([
        {
          idUser: 3,
          user: {
            id: 3,
            name: 'test',
            email: 'test@gmail.com',
            password: 'test',
            role: 'user',
            usersLikes: [
              {
                id: 3,
                idArtist: 1,
                idUser: 3,
                artist: artist1,
              },
              {
                id: 4,
                idArtist: 2,
                idUser: 3,
                artist: artist2,
              },
            ],
          },
        },
        {
          idUser: 4,
          user: {
            id: 4,
            name: 'test',
            email: 'test@gmail.com',
            password: 'test',
            role: 'user',
            usersLikes: [
              {
                id: 5,
                idArtist: 1,
                idUser: 4,
                artist: artist1,
              },
              {
                id: 5,
                idArtist: 2,
                idUser: 4,
                artist: artist2,
              },
              {
                id: 6,
                idArtist: 3,
                idUser: 4,
                artist: artist3,
              },
            ],
          },
        },
      ]);

    const recommendation =
      await recommendationsService.getRecommendation(idUser);

    expect(getUserLikedArtistsSpy).toHaveBeenCalledWith(idUser);
    expect(getUserDislikedArtistsSpy).toHaveBeenCalledWith(idUser);
    expect(getSimilarUsersSpy).toHaveBeenCalledWith(
      [{ id: 1, idArtist: artist1.id, idUser }],
      idUser,
    );
    expect(recommendation).toStrictEqual(artist2);
  });
});
