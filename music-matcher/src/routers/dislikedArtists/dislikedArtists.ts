import express from 'express';
import dislikedArtistsController from '../../controllers/dislikedArtists/dislikedArtists';
import authenticationMiddleware from '../../middlewares/authentication/authenticationMiddleware';

export const router = express.Router();

router.get(
  '/',
  authenticationMiddleware,
  dislikedArtistsController.getAllDislikedArtists,
);
router.post(
  '/',
  authenticationMiddleware,
  dislikedArtistsController.addDislikedArtist,
);
router.get(
  '/:id',
  authenticationMiddleware,
  dislikedArtistsController.getDislikeById,
);
router.delete(
  '/:id',
  authenticationMiddleware,
  dislikedArtistsController.deleteDislike,
);
router.get(
  '/artists/:id',
  authenticationMiddleware,
  dislikedArtistsController.getDislikesByArtistId,
);
router.get(
  '/users/:id',
  authenticationMiddleware,
  dislikedArtistsController.getDislikesByUserId,
);
