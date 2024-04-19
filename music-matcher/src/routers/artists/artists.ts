import express from 'express';
import artistsController from '../../controllers/artists/artists';
import authenticationMiddleware from '../../middlewares/authentication/authenticationMiddleware';

export const router = express.Router();

router.get('/', authenticationMiddleware, artistsController.getAllArtists);
router.post('/', authenticationMiddleware, artistsController.addArtist);
router.get('/:id', authenticationMiddleware, artistsController.getArtistById);
router.patch('/:id', authenticationMiddleware, artistsController.updateArtist);
router.delete('/:id', authenticationMiddleware, artistsController.deleteArtist);
