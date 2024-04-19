import { CustomError } from '../../errors/errorCreator';
import { Request, Response, NextFunction } from 'express';

export const errorManager = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(error.status || 500).json({
    message: error.message,
  });
  next();
};
