import { Request, Response, NextFunction } from 'express';
import artistsService from './../../services/artists/artists';
import { throwError } from '../../errors/errorCreator';

const getAllArtists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await artistsService.getAllArtists();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const addArtist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdUser = await artistsService.addArtist(req.body.deezer_id);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
};

const getArtistById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await artistsService.getArtistById(parseInt(req.params.id));

    if (!user) {
      throwError(404, "Ressource doesn't exists");
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateArtist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.userRole !== 'admin') {
      throwError(403, 'Access forbidden');
    }

    const updatedUser = await artistsService.updateArtist(
      parseInt(req.params.id),
      req.body,
    );

    if (!updatedUser) {
      throwError(404, "Ressource doesn't exists");
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteArtist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.userRole !== 'admin') {
      throwError(403, 'Access forbidden');
    }

    const deletedUser = await artistsService.deleteArtist(
      parseInt(req.params.id),
    );

    if (!deletedUser) {
      throwError(404, "Ressource doesn't exists");
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllArtists,
  addArtist,
  getArtistById,
  updateArtist,
  deleteArtist,
};
