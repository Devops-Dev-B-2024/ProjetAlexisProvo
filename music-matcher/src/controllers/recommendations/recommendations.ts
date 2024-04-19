import { Request, Response, NextFunction } from 'express';
import recommendationsService from '../../services/recommendations/recommendations';
import { throwError } from '../../errors/errorCreator';
import usersService from '../../services/users/users';

const getUserRecommendation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.userId !== parseInt(req.params.id) && req.userRole !== 'admin') {
      throwError(403, 'Access forbidden');
    }

    const user = await usersService.getUserById(parseInt(req.params.id));
    if (!user) {
      throwError(404, "Ressource doesn't exists");
    }
    const likes = await recommendationsService.getRecommendation(
      parseInt(req.params.id),
    );
    res.status(200).json(likes);
  } catch (error) {
    next(error);
  }
};

export default {
  getUserRecommendation,
};
