import { Request, Response, NextFunction } from 'express';
import dislikedArtistsService from '../../services/dislikedArtists/dislikedArtists';
import { throwError } from '../../errors/errorCreator';

const getAllDislikedArtists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.userRole !== 'admin') {
      throwError(403, 'Access forbidden');
    }
    const dislikes = await dislikedArtistsService.getAllDislikes();
    res.status(200).json(dislikes);
  } catch (error) {
    next(error);
  }
};

const getDislikeById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const dislike = await dislikedArtistsService.getDislikeById(
      parseInt(req.params.id),
    );
    if (req.userId !== dislike?.idUser && req.userRole !== 'admin') {
      throwError(403, 'Access forbidden');
    }

    if (!dislike) {
      throwError(404, "Ressource doesn't exists");
    }

    res.status(200).json(dislike);
  } catch (error) {
    next(error);
  }
};

const addDislikedArtist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.userId) {
    try {
      const createdDislike = await dislikedArtistsService.addDislike({
        idArtist: req.body.id_artist,
        idUser: req.userId,
      });

      res.status(201).json(createdDislike);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(401).json({ message: 'You need to be identified' });
  }
};

const deleteDislike = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const dislike = await dislikedArtistsService.getDislikeById(
      parseInt(req.params.id),
    );

    if (req.userId !== dislike?.idUser && req.userRole !== 'admin') {
      throwError(403, 'Access forbidden');
    }
    const deletedLike = await dislikedArtistsService.deleteDislike(
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

const getDislikesByArtistId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.userRole !== 'admin') {
      throwError(403, 'Access forbidden');
    }
    const dislikes = await dislikedArtistsService.getDislikesByArtist(
      parseInt(req.params.id),
    );

    if (!dislikes) {
      throwError(404, "Ressource doesn't exists");
    }

    res.status(200).json(dislikes);
  } catch (error) {
    next(error);
  }
};

const getDislikesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.userId !== parseInt(req.params.id) && req.userRole !== 'admin') {
      throwError(403, 'Access forbidden');
    }

    const dislikes = await dislikedArtistsService.getDislikesByUser(
      parseInt(req.params.id),
    );

    if (!dislikes) {
      throwError(404, "Ressource doesn't exists");
    }

    res.status(200).json(dislikes);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllDislikedArtists,
  addDislikedArtist,
  getDislikeById,
  deleteDislike,
  getDislikesByArtistId,
  getDislikesByUserId,
};
