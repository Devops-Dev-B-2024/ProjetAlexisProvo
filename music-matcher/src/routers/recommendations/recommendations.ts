import express from 'express';
import recommendationsController from '../../controllers/recommendations/recommendations';
import authenticationMiddleware from '../../middlewares/authentication/authenticationMiddleware';

export const router = express.Router();

router.get(
  '/users/:id',
  authenticationMiddleware,
  recommendationsController.getUserRecommendation,
);
