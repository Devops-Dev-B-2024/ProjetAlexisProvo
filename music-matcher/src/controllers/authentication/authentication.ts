import { Request, Response, NextFunction } from 'express';
import authenticationService from '../../services/authentication/authentication';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const jwtSecret = process.env.JWT_SECRET as string;

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const createdUser = await authenticationService.registerUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authenticationService.loginUser(
      req.body.email,
      req.body.password,
    );
    if (user) {
      const token = jwt.sign(
        { userId: user.id, userRole: user.role },
        jwtSecret,
        {
          expiresIn: '1h',
        },
      );
      res.status(200).json({ user, token });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  registerUser,
  loginUser,
};
