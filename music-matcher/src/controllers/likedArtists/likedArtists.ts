import { Request, Response, NextFunction } from 'express';
import likedArtistsService from '../../services/likedArtists/likedArtists';
import { throwError } from '../../errors/errorCreator';

const getAllLikedArtists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.userRole !== 'admin') {
      throwError(403, 'Access forbidden');
    }
    const likes = await likedArtistsService.getAllLikes();
    res.status(200).json(likes);
  } catch (error) {
    next(error);
  }
};

const getLikeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const like = await likedArtistsService.getLikeById(parseInt(req.params.id));
    if (req.userId !== like?.idUser && req.userRole !== 'admin') {
      throwError(403, 'Access forbidden');
    }

    if (!like) {
      throwError(404, "Ressource doesn't exists");
    }

    res.status(200).json(like);
  } catch (error) {
    next(error);
  }
};

const addLikedArtist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.userId) {
    try {
      const createdLike = await likedArtistsService.addLike({
        idArtist: req.body.id_artist,
        idUser: req.userId,
      });

      res.status(201).json(createdLike);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(401).json({ message: 'You need to be identified' });
  }
};

const deleteLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const like = await likedArtistsService.getLikeById(parseInt(req.params.id));
    if (req.userId !== like?.idUser && req.userRole !== 'admin') {
      throwError(403, 'Access forbidden');
    }
    const deletedLike = await likedArtistsService.deleteLike(
      parseInt(req.params.id),
    );

    if (!deletedLike) {
      throwError(404, "Ressource doesn't exists");
    }

    res.status(200).json(deletedLike);
  } catch (error) {
    next(error);
  }
};

const getLikesByArtistId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.userRole !== 'admin') {
      throwError(403, 'Access forbidden');
    }
    const likes = await likedArtistsService.getLikesByArtist(
      parseInt(req.params.id),
    );

    if (!likes) {
      throwError(404, "Ressource doesn't exists");
    }

    res.status(200).json(likes);
  } catch (error) {
    next(error);
  }
};

const getLikesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.userId !== parseInt(req.params.id) && req.userRole !== 'admin') {
      throwError(403, 'Access forbidden');
    }

    const likes = await likedArtistsService.getLikesByUser(
      parseInt(req.params.id),
    );

    if (!likes) {
      throwError(404, "Ressource doesn't exists");
    }

    res.status(200).json(likes);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllLikedArtists,
  addLikedArtist,
  getLikeById,
  deleteLike,
  getLikesByArtistId,
  getLikesByUserId,
};
