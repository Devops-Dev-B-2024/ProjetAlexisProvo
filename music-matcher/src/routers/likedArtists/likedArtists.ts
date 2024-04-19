import express from 'express';
import likedArtistsController from '../../controllers/likedArtists/likedArtists';
import authenticationMiddleware from '../../middlewares/authentication/authenticationMiddleware';

export const router = express.Router();

router.get(
  '/',
  authenticationMiddleware,
  likedArtistsController.getAllLikedArtists,
);
router.post(
  '/',
  authenticationMiddleware,
  likedArtistsController.addLikedArtist,
);
router.get(
  '/:id',
  authenticationMiddleware,
  likedArtistsController.getLikeById,
);
router.delete(
  '/:id',
  authenticationMiddleware,
  likedArtistsController.deleteLike,
);
router.get(
  '/artists/:id',
  authenticationMiddleware,
  likedArtistsController.getLikesByArtistId,
);
router.get(
  '/users/:id',
  authenticationMiddleware,
  likedArtistsController.getLikesByUserId,
);
